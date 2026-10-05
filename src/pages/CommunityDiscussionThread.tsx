import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, Send, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getCommunityDisplayName,
  getCommunityGuestId,
  saveCommunityDisplayName,
} from "../lib/communityIdentity";
import {
  addDiscussionReply,
  getCommunityDiscussion,
  type CommunityDiscussion,
  updateCommunityDiscussionAuthor,
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

export default function CommunityDiscussionThread() {
  const { id } = useParams();
  const { user } = useAuth();
  const [guestId] = useState(getCommunityGuestId);
  const currentUserId = user?.uid || guestId;
  const [communityName, setCommunityName] = useState(() =>
    getCommunityDisplayName(currentUserId) ||
    getCommunityDisplayName(guestId),
  );
  const [discussion, setDiscussion] = useState<CommunityDiscussion | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState("");
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [error, setError] = useState("");
  const currentAuthor = user?.displayName || communityName.trim();

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
    let timer: ReturnType<typeof setTimeout> | undefined;
    setDiscussion(null);
    setLoading(true);
    const refreshDiscussion = async (initialLoad = false) => {
      if (!id) {
        setConnectionError("This discussion link is invalid.");
        setLoading(false);
        return;
      }
      try {
        const latest = await getCommunityDiscussion(id);
        if (active) {
          setDiscussion(latest);
          setConnectionError("");
        }
      } catch {
        if (active) {
          setConnectionError(
            "Could not reach the live discussion. Check that the seller API and MongoDB are running.",
          );
        }
      } finally {
        if (active && initialLoad) setLoading(false);
      }
      if (active) {
        timer = setTimeout(() => void refreshDiscussion(), 2000);
      }
    };
    void refreshDiscussion(true);
    return () => {
      active = false;
      if (timer) clearTimeout(timer);
    };
  }, [id]);

  const handleReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!discussion || !reply.trim()) return;
    if (!currentAuthor) {
      setError("Enter your name before posting a reply.");
      return;
    }
    setSending(true);
    setError("");
    try {
      if (!user?.displayName) {
        saveCommunityDisplayName(currentUserId, currentAuthor);
      }
      const updated = await addDiscussionReply(discussion.id, {
        userId: currentUserId,
        author: currentAuthor,
        content: reply.trim(),
      });
      setDiscussion(updated);
      setReply("");
    } catch {
      setError("Your reply could not be added. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleUseAccountName = async () => {
    const name = user?.displayName?.trim();
    if (!discussion || !name) return;
    setSavingName(true);
    setError("");
    try {
      const updated = await updateCommunityDiscussionAuthor(discussion.id, {
        userId: discussion.userId,
        author: name,
      });
      saveCommunityDisplayName(currentUserId, name);
      saveCommunityDisplayName(guestId, name);
      setDiscussion(updated);
    } catch {
      setError("Your name could not be updated. Please try again.");
    } finally {
      setSavingName(false);
    }
  };

  return (
    <main className="min-h-screen px-4 pb-20 pt-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-on-surface-muted transition hover:text-on-surface"
        >
          <ArrowLeft size={16} /> Back to Community
        </Link>

        {loading ? (
          <p className="py-16 text-center text-on-surface-muted">
            Loading conversation…
          </p>
        ) : !discussion ? (
          <div className="rounded-xl border border-white/10 bg-surface-high/50 p-8 text-center">
            <h1 className="text-xl font-semibold text-on-surface">
              Discussion unavailable
            </h1>
            <p className="mt-2 text-sm text-on-surface-muted">
              {connectionError ||
                "This conversation may have been removed or is not available."}
            </p>
          </div>
        ) : (
          <>
            {connectionError && (
              <p
                role="status"
                className="mb-4 rounded-lg border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200"
              >
                Live updates paused. Check that the seller API and MongoDB are
                running.
              </p>
            )}
            <article className="rounded-xl border border-white/10 bg-surface-high/50 p-5 sm:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-brand/10 px-3 py-1 text-xs font-semibold text-primary-brand">
                  {discussion.category}
                </span>
                <time className="text-xs text-on-surface-muted">
                  Started {relativeTime(discussion.createdAt)}
                </time>
              </div>
              <h1 className="text-2xl font-bold text-on-surface sm:text-3xl">
                {discussion.title}
              </h1>
              <div className="mt-5 flex items-center gap-3 border-b border-white/10 pb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-brand/15 text-primary-brand">
                  <User size={17} />
                </span>
                <span className="text-sm font-semibold text-on-surface">
                  {discussion.author}
                </span>
              </div>
              {(discussion.userId === currentUserId ||
                discussion.userId === guestId) &&
                discussion.author === "Enthusiast" && (
                  <div className="mt-4 rounded-lg border border-white/10 bg-background/50 p-3">
                    {user?.displayName ? (
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-on-surface-muted">
                          Use your account name:{" "}
                          <span className="font-semibold text-on-surface">
                            {user.displayName}
                          </span>
                        </p>
                        <button
                          type="button"
                          onClick={() => void handleUseAccountName()}
                          disabled={savingName}
                          className="rounded-lg bg-primary-brand px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-50"
                        >
                          {savingName ? "Saving…" : "Use account name"}
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-on-surface-muted">
                        Sign in with the account that created this topic to
                        show its Firebase profile name.
                        {" "}
                        <Link
                          to="/login"
                          className="font-semibold text-primary-brand hover:underline"
                        >
                          Sign in
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              <p className="whitespace-pre-wrap break-words pt-5 text-sm leading-relaxed text-on-surface-muted">
                {discussion.content}
              </p>
            </article>

            <section className="mt-8 space-y-4" aria-labelledby="replies-title">
              <h2
                id="replies-title"
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-on-surface-muted"
              >
                <MessageSquare size={16} /> Replies ({discussion.replies.length}
                )
              </h2>
              {discussion.replies.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-xl border border-white/10 bg-surface-high/40 p-4 sm:p-5"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
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
              {discussion.replies.length === 0 && (
                <p className="rounded-xl border border-dashed border-white/10 p-5 text-sm text-on-surface-muted">
                  No replies yet. Be the first to contribute.
                </p>
              )}

              <form
                onSubmit={(event) => void handleReply(event)}
                className="space-y-3 rounded-xl border border-white/10 bg-surface-high/50 p-4 sm:p-5"
              >
                <label
                  htmlFor="discussion-reply"
                  className="block text-sm font-semibold text-on-surface"
                >
                  Add your reply
                </label>
                <textarea
                  id="discussion-reply"
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  maxLength={2000}
                  required
                  placeholder="Share your experience or help answer the question…"
                  className="min-h-28 w-full resize-y rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                />
                {!user?.displayName && (
                  <label
                    htmlFor="community-display-name"
                    className="block text-xs font-semibold text-on-surface-muted"
                  >
                    Your name
                    <input
                      id="community-display-name"
                      value={communityName}
                      onChange={(event) => setCommunityName(event.target.value)}
                      maxLength={80}
                      required
                      placeholder="How should your name appear?"
                      className="mt-1 w-full rounded-lg border border-white/10 bg-background px-3 py-2.5 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary-brand focus:outline-none"
                    />
                  </label>
                )}
                {error && (
                  <p role="alert" className="text-sm text-red-300">
                    {error}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={sending || !reply.trim() || !currentAuthor}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary-brand px-4 py-2.5 text-sm font-semibold text-on-primary disabled:opacity-50"
                  >
                    <Send size={15} /> {sending ? "Posting…" : "Post reply"}
                  </button>
                </div>
              </form>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
