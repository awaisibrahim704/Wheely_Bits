import FallbackImage from "../components/FallbackImage";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Camera,
  Heart,
  MessageSquare,
  Plus,
  Send,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getCommunityDisplayName,
  getCommunityGuestId,
  saveCommunityDisplayName,
} from "../lib/communityIdentity";
import {
  addCommunityComment,
  createCommunityDiscussion,
  createCommunityPost,
  deleteCommunityPost,
  getCommunityDiscussions,
  getCommunityPosts,
  toggleCommunityReaction,
  type CommunityDiscussion,
  type CommunityPost,
} from "../lib/sellerApi";

async function encodeCommunityImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  if (file.size > 20 * 1024 * 1024)
    throw new Error("Images must be smaller than 20 MB.");

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("This image could not be processed.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

function formatPostTime(value: string) {
  const minutes = Math.max(
    1,
    Math.floor((Date.now() - new Date(value).getTime()) / 60000),
  );
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const DISCUSSION_CATEGORIES = [
  "General / Anything",
  "Wheels & Suspension",
  "Exterior Styling",
  "Maintenance & Repair",
  "General Automotive",
];

export default function Community() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [guestId] = useState(getCommunityGuestId);
  const currentUserId = user?.uid || guestId;
  const [communityName, setCommunityName] = useState(() =>
    getCommunityDisplayName(currentUserId) ||
    getCommunityDisplayName(guestId),
  );
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [processingImages, setProcessingImages] = useState(false);
  const [imageError, setImageError] = useState("");
  const [postError, setPostError] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>(
    {},
  );
  const [commentingOn, setCommentingOn] = useState("");
  const [deletingPost, setDeletingPost] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [discussions, setDiscussions] = useState<CommunityDiscussion[]>([]);
  const [discussionsLoading, setDiscussionsLoading] = useState(true);
  const [discussionFeedError, setDiscussionFeedError] = useState("");
  const [topicFormOpen, setTopicFormOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");
  const [topicCategory, setTopicCategory] = useState(DISCUSSION_CATEGORIES[0]);
  const [topicContent, setTopicContent] = useState("");
  const [creatingTopic, setCreatingTopic] = useState(false);
  const [discussionError, setDiscussionError] = useState("");
  const currentAuthor =
    user?.displayName || user?.email?.split("@")[0] || "Enthusiast";
  const discussionAuthor = user?.displayName || communityName.trim();

  useEffect(() => {
    if (!user?.displayName && !communityName) {
      setCommunityName(
        getCommunityDisplayName(currentUserId) ||
          getCommunityDisplayName(guestId),
      );
    }
  }, [communityName, currentUserId, guestId, user?.displayName]);

  useEffect(() => {
    let active = true;
    getCommunityPosts()
      .then((loadedPosts) => {
        if (active) setPosts(loadedPosts);
      })
      .finally(() => {
        if (active) setPostsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const refreshDiscussions = async (initialLoad = false) => {
      try {
        const loadedDiscussions = await getCommunityDiscussions();
        if (active) {
          setDiscussions(loadedDiscussions);
          setDiscussionFeedError("");
        }
      } catch {
        if (active) {
          setDiscussionFeedError(
            "Live discussions are unavailable. Check that the seller API and MongoDB are running.",
          );
        }
      } finally {
        if (active && initialLoad) setDiscussionsLoading(false);
      }
      if (active) {
        timer = setTimeout(() => void refreshDiscussions(), 2500);
      }
    };
    void refreshDiscussions(true);
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const replacePost = (updated: CommunityPost | null) => {
    if (updated) {
      setPosts((current) =>
        current.map((post) => (post.id === updated.id ? updated : post)),
      );
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.currentTarget.files || []);
    event.currentTarget.value = "";
    if (files.length === 0) return;
    if (images.length + files.length > 5) {
      setImageError("Choose up to five photos per post.");
      return;
    }
    setImageError("");
    setProcessingImages(true);
    try {
      const encodedImages: string[] = [];
      const failedFiles: string[] = [];
      for (const file of files) {
        try {
          encodedImages.push(await encodeCommunityImage(file));
        } catch {
          failedFiles.push(file.name);
        }
      }
      if (encodedImages.length === 0) {
        throw new Error("None of the selected photos could be processed.");
      }
      if (
        [...images, ...encodedImages].reduce(
          (total, item) => total + item.length,
          0,
        ) > 11_000_000
      ) {
        throw new Error(
          "Choose smaller photos; the combined upload is too large. Your current photos are still selected.",
        );
      }
      setImages((current) => [...current, ...encodedImages]);
      if (failedFiles.length > 0) {
        setImageError(
          `${failedFiles.length} photo${failedFiles.length === 1 ? " was" : "s were"} skipped because they could not be processed.`,
        );
      }
    } catch (error) {
      setImageError(
        error instanceof Error ? error.message : "Could not load this image.",
      );
    } finally {
      setProcessingImages(false);
    }
  };

  const handlePublish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description.trim() || images.length === 0) {
      setPostError("Add a photo and a description to share a post.");
      return;
    }
    setPublishing(true);
    setPostError("");
    try {
      const post = await createCommunityPost({
        userId: currentUserId,
        author: currentAuthor,
        description: description.trim(),
        images,
      });
      setPosts((current) => [post, ...current]);
      setDescription("");
      setImages([]);
    } catch {
      setPostError("Your post could not be published. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const handleReact = async (postId: string) => {
    replacePost(await toggleCommunityReaction(postId, currentUserId));
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("Delete this community post? This cannot be undone.")) {
      return;
    }
    setDeletingPost(postId);
    setDeleteError("");
    const deleted = await deleteCommunityPost(postId, currentUserId);
    if (deleted) {
      setPosts((current) => current.filter((post) => post.id !== postId));
    } else {
      setDeleteError("Only the post author can delete this post.");
    }
    setDeletingPost("");
  };

  const handleCreateDiscussion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!topicTitle.trim() || !topicContent.trim()) return;
    if (!discussionAuthor) {
      setDiscussionError("Enter your name so others know who started the topic.");
      return;
    }
    setCreatingTopic(true);
    setDiscussionError("");
    try {
      if (!user?.displayName) {
        saveCommunityDisplayName(currentUserId, discussionAuthor);
      }
      const discussion = await createCommunityDiscussion({
        userId: currentUserId,
        author: discussionAuthor,
        title: topicTitle.trim(),
        category: topicCategory,
        content: topicContent.trim(),
      });
      setDiscussions((current) => [discussion, ...current]);
      setTopicTitle("");
      setTopicContent("");
      setTopicFormOpen(false);
      navigate(`/community/discussion/${encodeURIComponent(discussion.id)}`);
    } catch {
      setDiscussionError("Your topic could not be created. Please try again.");
    } finally {
      setCreatingTopic(false);
    }
  };

  const handleComment = async (
    event: FormEvent<HTMLFormElement>,
    postId: string,
  ) => {
    event.preventDefault();
    const content = commentDrafts[postId]?.trim();
    if (!content) return;
    setCommentingOn(postId);
    const updated = await addCommunityComment(postId, {
      userId: currentUserId,
      author: currentAuthor,
      content,
    });
    replacePost(updated);
    if (updated) {
      setCommentDrafts((current) => ({ ...current, [postId]: "" }));
    }
    setCommentingOn("");
  };

  return (
    <div className="w-full relative min-h-screen">
      {/* Ambient Background Graphic */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-20 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% -20%, #8fb397 0%, transparent 70%)",
        }}
      ></div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12 flex flex-col gap-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          <span className="text-[12px] font-semibold text-primary-brand uppercase tracking-widest bg-primary-brand/10 px-4 py-1 rounded-full border border-primary-brand/20">
            The Enthusiast Collective
          </span>
          <h1 className="text-4xl md:text-5xl font-medium text-on-surface max-w-3xl">
            Connect, share, and find inspiration for your next build.
          </h1>
          <p className="text-lg text-on-surface-muted max-w-2xl">
            Join a community of dedicated automotive artists. From subtle
            aesthetic tweaks to full performance rebuilds, explore the garage of
            ideas.
          </p>
        </section>

        <section
          className="space-y-6"
          aria-labelledby="community-posts-heading"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary-brand">
                From the community
              </span>
              <h2
                id="community-posts-heading"
                className="mt-1 text-2xl font-medium text-on-surface"
              >
                Share a moment
              </h2>
            </div>
            <span className="text-sm text-on-surface-muted">
              Builds, ideas, questions, and everything automotive
            </span>
          </div>

          <form
            onSubmit={handlePublish}
            className="grid gap-4 rounded-xl border border-white/10 bg-surface-high/70 p-4 sm:p-5 md:grid-cols-[minmax(0,1fr)_240px]"
          >
            <div className="flex min-w-0 flex-col gap-3">
              <label className="sr-only" htmlFor="community-post-description">
                Your description
              </label>
              <textarea
                id="community-post-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={2000}
                placeholder="What would you like to share?"
                className="min-h-32 w-full resize-y rounded-lg border border-white/10 bg-background/70 p-3 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-on-surface-muted transition hover:border-primary-brand/50 hover:text-on-surface">
                  <Camera size={16} />{" "}
                  {processingImages ? "Adding photos…" : "Add photos"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={processingImages || images.length >= 5}
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <span className="text-xs text-on-surface-muted">
                  {description.length}/2000
                </span>
              </div>
              {(imageError || postError) && (
                <p role="alert" className="text-sm text-red-300">
                  {imageError || postError}
                </p>
              )}
            </div>
            <div className="flex min-h-40 flex-col">
              {images.length > 0 ? (
                <div className="min-h-40 flex-1 space-y-2">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-white/10 bg-background">
                    <FallbackImage
                      src={images[0]}
                      alt="First photo, shown on the post card"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-1 text-xs text-on-surface">
                      Card cover
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((photo, index) => (
                      <div
                        key={index}
                        className="relative h-12 w-12 shrink-0 overflow-hidden rounded border border-white/10"
                      >
                        <FallbackImage
                          src={photo}
                          alt={`Selected photo ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setImages((current) =>
                              current.filter(
                                (_, photoIndex) => photoIndex !== index,
                              ),
                            )
                          }
                          aria-label={`Remove photo ${index + 1}`}
                          className="absolute right-0 top-0 rounded-bl bg-background/85 p-0.5 text-on-surface hover:text-red-300"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex min-h-40 flex-1 items-center justify-center rounded-lg border border-dashed border-white/15 bg-background/40 text-center text-sm text-on-surface-muted">
                  <span>Photo not uploaded</span>
                </div>
              )}
              <button
                type="submit"
                disabled={
                  publishing || !description.trim() || images.length === 0
                }
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-brand px-4 py-3 text-sm font-semibold text-on-primary transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} /> {publishing ? "Sharing…" : "Share post"}
              </button>
            </div>
          </form>

          {postsLoading ? (
            <p className="py-8 text-center text-sm text-on-surface-muted">
              Loading community posts…
            </p>
          ) : posts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-on-surface-muted">
              No community posts yet. Share the first photo.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {posts.map((post) => {
                const liked = post.likedBy.includes(currentUserId);
                const commentsOpen = expandedComments.includes(post.id);
                return (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-xl border border-white/10 bg-surface-high/60"
                  >
                    <Link
                      to={`/community/thread/${encodeURIComponent(post.id)}`}
                      className="group relative block aspect-[4/3] bg-background"
                    >
                      <FallbackImage
                        src={post.images[0]}
                        alt={`Photo shared by ${post.author}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      {post.images.length > 1 && (
                        <span className="absolute bottom-3 right-3 rounded bg-background/85 px-2 py-1 text-xs text-on-surface">
                          +{post.images.length - 1} photos
                        </span>
                      )}
                    </Link>
                    <div className="space-y-4 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-brand/15 text-primary-brand">
                            <User size={17} />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-on-surface">
                              {post.author}
                            </p>
                            <time className="text-xs text-on-surface-muted">
                              {formatPostTime(post.createdAt)}
                            </time>
                          </div>
                        </div>
                        {post.userId === currentUserId && (
                          <button
                            type="button"
                            onClick={() => void handleDelete(post.id)}
                            disabled={deletingPost === post.id}
                            aria-label="Delete your post"
                            title="Delete post"
                            className="rounded-lg p-2 text-on-surface-muted transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      {deleteError && post.userId === currentUserId && (
                        <p role="alert" className="text-xs text-red-300">
                          {deleteError}
                        </p>
                      )}
                      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-on-surface-muted">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => void handleReact(post.id)}
                          aria-pressed={liked}
                          className={`inline-flex items-center gap-2 text-sm transition ${liked ? "text-primary-brand" : "text-on-surface-muted hover:text-primary-brand"}`}
                        >
                          <Heart
                            size={17}
                            fill={liked ? "currentColor" : "none"}
                          />{" "}
                          {post.likedBy.length} Like
                          {post.likedBy.length === 1 ? "" : "s"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedComments((current) =>
                              commentsOpen
                                ? current.filter((id) => id !== post.id)
                                : [...current, post.id],
                            )
                          }
                          aria-expanded={commentsOpen}
                          className="inline-flex items-center gap-2 text-sm text-on-surface-muted transition hover:text-on-surface"
                        >
                          <MessageSquare size={17} /> {post.comments.length}{" "}
                          Comments
                        </button>
                      </div>
                      {commentsOpen && (
                        <div className="space-y-3 border-t border-white/10 pt-3">
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              className="rounded-lg bg-background/50 p-3"
                            >
                              <div className="mb-1 flex items-center justify-between gap-3">
                                <span className="text-xs font-semibold text-on-surface">
                                  {comment.author}
                                </span>
                                <time className="text-[11px] text-on-surface-muted">
                                  {formatPostTime(comment.createdAt)}
                                </time>
                              </div>
                              <p className="whitespace-pre-wrap break-words text-sm text-on-surface-muted">
                                {comment.content}
                              </p>
                            </div>
                          ))}
                          <form
                            onSubmit={(event) =>
                              void handleComment(event, post.id)
                            }
                            className="flex gap-2"
                          >
                            <label
                              className="sr-only"
                              htmlFor={`comment-${post.id}`}
                            >
                              Write a comment
                            </label>
                            <input
                              id={`comment-${post.id}`}
                              value={commentDrafts[post.id] || ""}
                              onChange={(event) =>
                                setCommentDrafts((current) => ({
                                  ...current,
                                  [post.id]: event.target.value,
                                }))
                              }
                              maxLength={1000}
                              placeholder="Write a comment…"
                              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-background px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                            />
                            <button
                              type="submit"
                              disabled={
                                commentingOn === post.id ||
                                !commentDrafts[post.id]?.trim()
                              }
                              aria-label="Post comment"
                              className="rounded-lg bg-primary-brand px-3 text-on-primary disabled:opacity-50"
                            >
                              <Send size={16} />
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <div className="mx-auto w-full max-w-4xl">
          <div className="flex flex-col">
            {/* Discussions Hub */}
            <section>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-medium text-on-surface">
                  Latest Discussions
                </h2>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium ${discussionFeedError ? "text-amber-300" : "text-primary-brand"}`}
                    aria-live="polite"
                  >
                    {discussionFeedError ? "Offline" : "Live"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTopicFormOpen((open) => !open)}
                    className="bg-primary-brand text-on-primary hover:brightness-110 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 h-10 shadow-lg hover:shadow-primary-brand/20"
                  >
                    <Plus className="w-4 h-4" /> New Topic
                  </button>
                </div>
              </div>

              {topicFormOpen && (
                <form
                  onSubmit={handleCreateDiscussion}
                  className="mb-5 space-y-3 rounded-xl border border-white/10 bg-surface-high/60 p-4 sm:p-5"
                >
                  <label
                    className="block text-xs font-semibold text-on-surface-muted"
                    htmlFor="discussion-title"
                  >
                    Topic title
                  </label>
                  <input
                    id="discussion-title"
                    value={topicTitle}
                    onChange={(event) => setTopicTitle(event.target.value)}
                    maxLength={140}
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                  />
                  {!user?.displayName && (
                    <label
                      className="block text-xs font-semibold text-on-surface-muted"
                      htmlFor="discussion-author"
                    >
                      Your name
                      <input
                        id="discussion-author"
                        value={communityName}
                        onChange={(event) => setCommunityName(event.target.value)}
                        maxLength={80}
                        required
                        placeholder="How should your name appear?"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                      />
                    </label>
                  )}
                  <div className="grid gap-3 sm:grid-cols-[220px_1fr]">
                    <label className="text-xs font-semibold text-on-surface-muted">
                      Category
                      <select
                        value={topicCategory}
                        onChange={(event) =>
                          setTopicCategory(event.target.value)
                        }
                        className="mt-1 block w-full rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-on-surface focus:border-primary-brand focus:outline-none"
                      >
                        {DISCUSSION_CATEGORIES.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </label>
                    <label
                      className="text-xs font-semibold text-on-surface-muted"
                      htmlFor="discussion-content"
                    >
                      Start the conversation
                    </label>
                  </div>
                  <textarea
                    id="discussion-content"
                    value={topicContent}
                    onChange={(event) => setTopicContent(event.target.value)}
                    maxLength={4000}
                    required
                    placeholder="Share details, context, or a question…"
                    className="min-h-28 w-full resize-y rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                  />
                  {discussionError && (
                    <p role="alert" className="text-sm text-red-300">
                      {discussionError}
                    </p>
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setTopicFormOpen(false)}
                      className="rounded-lg border border-white/10 px-4 py-2 text-sm text-on-surface-muted hover:text-on-surface"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={
                        creatingTopic ||
                        !topicTitle.trim() ||
                        !topicContent.trim()
                      }
                      className="rounded-lg bg-primary-brand px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-50"
                    >
                      {creatingTopic ? "Creating…" : "Create topic"}
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-surface-high/60 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden flex flex-col">
                {discussionsLoading ? (
                  <p className="p-5 text-sm text-on-surface-muted">
                    Loading discussions…
                  </p>
                ) : discussionFeedError ? (
                  <p role="alert" className="p-5 text-sm text-amber-200">
                    {discussionFeedError}
                  </p>
                ) : discussions.length === 0 ? (
                  <p className="p-5 text-sm text-on-surface-muted">
                    No discussions yet. Start a real conversation with the
                    community.
                  </p>
                ) : (
                  discussions.map((disc, idx) => (
                    <Link
                      to={`/community/discussion/${encodeURIComponent(disc.id)}`}
                      key={disc.id}
                      className={`p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-4 items-start ${idx !== discussions.length - 1 ? "border-b border-outline-subtle/30" : ""}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-surface-highest border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 text-on-surface-muted">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-on-surface mb-1">
                          {disc.title}
                        </h3>
                        <div className="text-[12px] font-medium text-on-surface-muted">
                          Started by {disc.author} · {disc.category} ·{" "}
                          {formatPostTime(disc.lastActivityAt || disc.createdAt)}
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-sm font-bold text-primary-brand">
                          {disc.replies.length}
                        </span>
                        <span className="text-[12px] font-medium text-on-surface-muted">
                          replies
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
