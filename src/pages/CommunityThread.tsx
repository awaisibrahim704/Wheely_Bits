import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Send,
  Share2,
  Trash2,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  addCommunityComment,
  deleteCommunityPost,
  getCommunityPosts,
  toggleCommunityReaction,
  type CommunityPost,
} from "../lib/sellerApi";

function relativeTime(value: string) {
  const minutes = Math.max(
    1,
    Math.floor((Date.now() - new Date(value).getTime()) / 60000),
  );
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function CommunityThread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [guestId] = useState(() => {
    try {
      const key = "wheelybits:community-guest-id";
      let value = localStorage.getItem(key);
      if (!value) {
        value = `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem(key, value);
      }
      return value;
    } catch {
      return `guest-${Date.now()}`;
    }
  });
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const currentUserId = user?.uid || guestId;
  const currentAuthor =
    user?.displayName || user?.email?.split("@")[0] || "Enthusiast";

  useEffect(() => {
    let active = true;
    setLoading(true);
    getCommunityPosts()
      .then((posts) => {
        if (active) setPost(posts.find((entry) => entry.id === id) || null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const handleReaction = async () => {
    if (!post) return;
    const updated = await toggleCommunityReaction(post.id, currentUserId);
    if (updated) setPost(updated);
  };

  const handleComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!post || !comment.trim()) return;
    setCommenting(true);
    setError("");
    const updated = await addCommunityComment(post.id, {
      userId: currentUserId,
      author: currentAuthor,
      content: comment.trim(),
    });
    if (updated) {
      setPost(updated);
      setComment("");
    } else {
      setError("This post could not be updated. Please try again.");
    }
    setCommenting(false);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      setError("Could not copy the post link.");
    }
  };

  const handleDelete = async () => {
    if (
      !post ||
      !window.confirm("Delete this community post? This cannot be undone.")
    ) {
      return;
    }
    setDeleting(true);
    const deleted = await deleteCommunityPost(post.id, currentUserId);
    if (deleted) {
      navigate("/community");
    } else {
      setError("Only the post author can delete this post.");
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 pb-20 pt-8">
      <div className="mx-auto max-w-[800px]">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-muted transition hover:text-on-surface"
        >
          <ArrowLeft size={16} /> Back to Community
        </Link>

        {loading ? (
          <p className="py-16 text-center text-on-surface-muted">
            Loading post…
          </p>
        ) : !post ? (
          <div className="rounded-xl border border-white/10 bg-surface-high/50 p-8 text-center">
            <h1 className="text-xl font-semibold text-on-surface">
              Post not found
            </h1>
            <p className="mt-2 text-sm text-on-surface-muted">
              This post may have been removed or is not available on this
              device.
            </p>
          </div>
        ) : (
          <>
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-surface-high/50">
              <header className="flex items-center gap-3 p-5 sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-brand/15 text-primary-brand">
                  <User size={20} />
                </span>
                <div>
                  <h1 className="font-semibold text-on-surface">
                    {post.author}
                  </h1>
                  <time className="text-xs text-on-surface-muted">
                    {relativeTime(post.createdAt)}
                  </time>
                </div>
                {post.userId === currentUserId && (
                  <button
                    type="button"
                    onClick={() => void handleDelete()}
                    disabled={deleting}
                    title="Delete post"
                    aria-label="Delete your post"
                    className="ml-auto rounded-lg p-2 text-on-surface-muted transition hover:bg-red-500/10 hover:text-red-300 disabled:opacity-50"
                  >
                    <Trash2 size={17} />
                  </button>
                )}
              </header>

              <div className="space-y-4 px-5 pb-5 sm:px-7 sm:pb-7">
                <p className="whitespace-pre-wrap break-words text-base leading-relaxed text-on-surface">
                  {post.description}
                </p>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-on-surface-muted">
                  Photos · {post.images.length}
                </h2>
              </div>

              <div className="space-y-3 px-3 pb-4 sm:space-y-5 sm:px-7 sm:pb-7">
                {post.images.map((image, index) => (
                  <figure
                    key={`${post.id}-photo-${index}`}
                    className="overflow-hidden rounded-xl border border-white/10 bg-background/60"
                  >
                    <img
                      src={image}
                      alt={`Photo ${index + 1} shared by ${post.author}`}
                      className="max-h-[80vh] w-full object-contain"
                    />
                    <figcaption className="px-3 py-2 text-xs text-on-surface-muted">
                      {index + 1} of {post.images.length}
                    </figcaption>
                  </figure>
                ))}
              </div>

              <footer className="flex items-center gap-5 border-t border-white/10 px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={() => void handleReaction()}
                  aria-pressed={post.likedBy.includes(currentUserId)}
                  className={`inline-flex items-center gap-2 text-sm transition ${post.likedBy.includes(currentUserId) ? "text-primary-brand" : "text-on-surface-muted hover:text-primary-brand"}`}
                >
                  <Heart
                    size={18}
                    fill={
                      post.likedBy.includes(currentUserId)
                        ? "currentColor"
                        : "none"
                    }
                  />
                  {post.likedBy.length} Like
                  {post.likedBy.length === 1 ? "" : "s"}
                </button>
                <span className="inline-flex items-center gap-2 text-sm text-on-surface-muted">
                  <MessageSquare size={18} /> {post.comments.length} Comments
                </span>
                <button
                  type="button"
                  onClick={() => void handleShare()}
                  aria-label="Copy post link"
                  className="ml-auto rounded-lg p-2 text-on-surface-muted transition hover:bg-white/5 hover:text-on-surface"
                >
                  <Share2 size={18} />
                </button>
              </footer>
            </article>

            <section
              className="mt-8 space-y-5"
              aria-labelledby="comments-heading"
            >
              <h2
                id="comments-heading"
                className="text-sm font-bold uppercase tracking-wider text-on-surface-muted"
              >
                Comments ({post.comments.length})
              </h2>
              <form
                onSubmit={(event) => void handleComment(event)}
                className="flex gap-3"
              >
                <label className="sr-only" htmlFor="thread-comment">
                  Write a comment
                </label>
                <input
                  id="thread-comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  maxLength={1000}
                  placeholder="Add to the conversation…"
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-surface-high px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={commenting || !comment.trim()}
                  aria-label="Post comment"
                  className="rounded-lg bg-primary-brand px-4 text-on-primary disabled:opacity-50"
                >
                  <Send size={17} />
                </button>
              </form>
              {error && (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              )}
              <div className="space-y-3">
                {post.comments.map((entry) => (
                  <article
                    key={entry.id}
                    className="rounded-xl border border-white/10 bg-surface-high/40 p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-on-surface">
                        {entry.author}
                      </span>
                      <time className="text-xs text-on-surface-muted">
                        {relativeTime(entry.createdAt)}
                      </time>
                    </div>
                    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-on-surface-muted">
                      {entry.content}
                    </p>
                  </article>
                ))}
                {post.comments.length === 0 && (
                  <p className="py-3 text-sm text-on-surface-muted">
                    No comments yet. Start the conversation.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
