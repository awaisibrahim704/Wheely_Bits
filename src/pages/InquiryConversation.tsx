import { useEffect, useState, type FormEvent } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import {
  getInquiryConversation,
  replyToInquiryAsCustomer,
  type InquiryMessage,
  type SellerInquiry,
} from "../lib/sellerApi";

function getSavedConversationToken(inquiryId: string) {
  try {
    return window.localStorage.getItem(
      `wheelybits:inquiry-token:${inquiryId}`,
    );
  } catch {
    return null;
  }
}

export default function InquiryConversation() {
  const { id = "" } = useParams();
  const location = useLocation();
  const navigationState = location.state as
    | { conversationToken?: unknown; tokenStorageFailed?: boolean }
    | null;
  const [inquiry, setInquiry] = useState<SellerInquiry | null>(null);
  const storedToken = getSavedConversationToken(id);
  const token =
    storedToken ||
    (typeof navigationState?.conversationToken === "string"
      ? navigationState.conversationToken
      : null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !token) {
      setLoading(false);
      return;
    }
    let active = true;
    const refresh = () =>
      getInquiryConversation(id, token)
        .then(({ inquiry: latest }) => {
          if (active) {
            setInquiry(latest);
            setError("");
          }
        })
        .catch((requestError: unknown) => {
          if (active) {
            setError(
              requestError instanceof Error
                ? requestError.message
                : "Conversation could not be loaded.",
            );
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    void refresh();
    const pollId = window.setInterval(() => void refresh(), 7000);
    return () => {
      active = false;
      window.clearInterval(pollId);
    };
  }, [id, token]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id || !token || !message.trim()) return;
    setSending(true);
    setError("");
    try {
      await replyToInquiryAsCustomer(id, token, message.trim());
      setMessage("");
      const refreshed = await getInquiryConversation(id, token);
      setInquiry(refreshed.inquiry);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Your reply could not be sent.",
      );
    } finally {
      setSending(false);
    }
  };

  const messages: InquiryMessage[] =
    inquiry?.messages?.length
      ? inquiry.messages
      : inquiry
        ? [
            {
              sender: "customer",
              content: inquiry.message,
              createdAt: inquiry.createdAt || new Date().toISOString(),
            },
          ]
        : [];

  return (
    <main className="min-h-[70vh] px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-surface-high/60 p-5 sm:p-8">
        <Link
          to="/vendors"
          className="mb-6 inline-flex items-center gap-2 text-sm text-on-surface-muted hover:text-on-surface"
        >
          <ArrowLeft size={16} /> Vendors
        </Link>
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-brand/15 text-primary-brand">
            <MessageCircle size={20} />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-on-surface">
              Seller conversation
            </h1>
            <p className="text-sm text-on-surface-muted">
              {inquiry?.productName || "Marketplace inquiry"}
            </p>
          </div>
        </div>
        {navigationState?.tokenStorageFailed && (
          <p className="mb-4 rounded-lg bg-amber-400/10 p-3 text-sm text-amber-200">
            This browser could not save the private conversation key. Keep this
            tab open; the thread may not be available after closing it.
          </p>
        )}

        {loading ? (
          <p className="py-12 text-center text-sm text-on-surface-muted">
            Loading conversation...
          </p>
        ) : !token ? (
          <div className="rounded-xl border border-white/10 p-5 text-sm text-on-surface-muted">
            This conversation can only be opened in the browser where you sent
            the original message. The private conversation key is not available
            here.
          </div>
        ) : !inquiry ? (
          <div
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-400/5 p-5 text-sm text-red-200"
          >
            {error || "This conversation could not be found."}
          </div>
        ) : (
          <>
            <div
              className="mb-5 max-h-[55vh] space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-black/10 p-4"
              aria-live="polite"
            >
              {messages.map((entry, index) => (
                <article
                  key={`${entry.createdAt}-${index}`}
                  className={`max-w-[88%] rounded-xl p-3 ${
                    entry.sender === "customer"
                      ? "ml-auto bg-primary-brand/15 text-on-surface"
                      : "mr-auto bg-white/8 text-on-surface"
                  }`}
                >
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-on-surface-muted">
                    {entry.sender === "customer" ? "You" : "Seller"}
                  </p>
                  <p className="whitespace-pre-wrap break-words text-sm">
                    {entry.content}
                  </p>
                  <time className="mt-2 block text-right text-[10px] text-on-surface-muted">
                    {new Date(entry.createdAt).toLocaleString()}
                  </time>
                </article>
              ))}
            </div>
            <form onSubmit={sendMessage} className="space-y-3">
              <label
                htmlFor="inquiry-reply"
                className="block text-sm font-medium text-on-surface"
              >
                Reply to {inquiry.senderName}
              </label>
              <textarea
                id="inquiry-reply"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={1000}
                required
                rows={4}
                placeholder="Write a message..."
                className="w-full resize-y rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-on-surface outline-none focus:border-primary-brand"
              />
              {error && (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={sending || !message.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-brand px-4 py-2.5 text-sm font-semibold text-on-primary disabled:opacity-50"
              >
                <Send size={15} />
                {sending ? "Sending..." : "Send reply"}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
