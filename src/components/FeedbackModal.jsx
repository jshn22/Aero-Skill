import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Send, CheckCircle2, AlertTriangle } from "lucide-react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Reads from your .env file. Falls back to a placeholder so the form
// renders in dev without crashing — replace with your real Web App URL.
const APPS_SCRIPT_URL =
  import.meta.env.VITE_APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/REPLACE_WITH_YOUR_SCRIPT_ID/exec";
// ─────────────────────────────────────────────────────────────────────────────

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];

const initialForm = { name: "", email: "", rating: 0, feedback: "" };

/**
 * FeedbackModal
 * @param {boolean} isOpen    - Controls visibility
 * @param {function} onClose  - Called when the modal should close
 */
const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData,     setFormData]     = useState(initialForm);
  const [hoveredStar,  setHoveredStar]  = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState,  setSubmitState]  = useState("idle"); // idle | success | error
  const [serverMsg,    setServerMsg]    = useState("");

  // Generic field updater
  const updateField = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  // Close only if user clicks the backdrop (not the modal card)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Reset state on close so the form is fresh next time
  const handleClose = () => {
    setFormData(initialForm);
    setHoveredStar(0);
    setSubmitState("idle");
    setServerMsg("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || formData.rating === 0) return;

    setIsSubmitting(true);
    setSubmitState("idle");
    setServerMsg("");

    try {
      // URLSearchParams gives Content-Type: application/x-www-form-urlencoded
      // which is a "simple" CORS request — Google's servers allow it without preflight.
      const payload = new URLSearchParams({
        type:     "feedback",          // Routes to Feedback sheet in Code.gs
        name:     formData.name.trim(),
        email:    formData.email.trim(),
        rating:   String(formData.rating),
        feedback: formData.feedback.trim(),
      });

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body:   payload,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.success) {
        setServerMsg(data.message);
        setSubmitState("success");
        setFormData(initialForm);
        // Auto-close after 3 s so the user sees the thank-you message
        setTimeout(handleClose, 3000);
      } else {
        throw new Error(data.message || "Submission failed.");
      }
    } catch (err) {
      setServerMsg(err.message || "Something went wrong. Please try again.");
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine the active fill for each star (hover takes priority over selection)
  const activeStar = hoveredStar || formData.rating;

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ── */
        <motion.div
          key="feedback-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4
                     bg-black/60 backdrop-blur-sm"
        >
          {/* ── Modal Card ── */}
          <motion.div
            key="feedback-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-[2rem]
                       bg-white dark:bg-[#0D0D0D]
                       border border-slate-200 dark:border-white/10
                       p-8 shadow-2xl"
          >
            {/* ── Close Button ── */}
            <button
              onClick={handleClose}
              aria-label="Close feedback form"
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center
                         justify-center bg-slate-100 dark:bg-white/10
                         hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
            >
              <X size={14} className="text-slate-600 dark:text-slate-300" />
            </button>

            {/* ── Header ── */}
            <div className="flex items-center gap-2 mb-1">
              <div className="h-[1px] w-6 bg-[#6DACE7]" />
              <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                Share Your Thoughts
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#171710] dark:text-white">
              Leave us Feedback
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your honest thoughts help us build something better.
            </p>

            {/* ── Success State ── */}
            {submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex flex-col items-center gap-3 py-8 text-center"
              >
                <CheckCircle2 size={44} className="text-emerald-500" />
                <p className="font-black text-xl text-[#171710] dark:text-white">
                  Thank you!
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                  {serverMsg || "Your feedback has been saved. Closing shortly…"}
                </p>
              </motion.div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.15em]
                                     text-slate-500 dark:text-slate-400">
                      Name
                    </span>
                    <input
                      id="feedback-name"
                      value={formData.name}
                      onChange={updateField("name")}
                      required
                      type="text"
                      placeholder="Your name"
                      className="mt-2 w-full h-11 rounded-xl
                                 border border-slate-200 dark:border-white/10
                                 bg-slate-50 dark:bg-black/20
                                 px-4 text-sm outline-none
                                 focus:border-[#6DACE7] transition-colors
                                 text-[#171710] dark:text-white"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-[0.15em]
                                     text-slate-500 dark:text-slate-400">
                      Email
                    </span>
                    <input
                      id="feedback-email"
                      value={formData.email}
                      onChange={updateField("email")}
                      required
                      type="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full h-11 rounded-xl
                                 border border-slate-200 dark:border-white/10
                                 bg-slate-50 dark:bg-black/20
                                 px-4 text-sm outline-none
                                 focus:border-[#6DACE7] transition-colors
                                 text-[#171710] dark:text-white"
                    />
                  </label>
                </div>

                {/* Star Rating */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em]
                                   text-slate-500 dark:text-slate-400">
                    Rating
                  </span>
                  <div className="mt-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} out of 5`}
                        onClick={() => setFormData((p) => ({ ...p, rating: star }))}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="transition-transform hover:scale-110 active:scale-95 p-0.5"
                      >
                        <Star
                          size={30}
                          className="transition-colors duration-100"
                          fill={star <= activeStar ? "#6DACE7" : "transparent"}
                          stroke={star <= activeStar ? "#6DACE7" : "#94a3b8"}
                        />
                      </button>
                    ))}
                    {formData.rating > 0 && (
                      <span className="ml-2 text-sm font-bold text-[#6DACE7]">
                        {RATING_LABELS[formData.rating]}
                      </span>
                    )}
                  </div>
                  {formData.rating === 0 && (
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
                      Select a star rating to continue
                    </p>
                  )}
                </div>

                {/* Feedback Textarea */}
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.15em]
                                   text-slate-500 dark:text-slate-400">
                    Your Feedback
                  </span>
                  <textarea
                    id="feedback-message"
                    value={formData.feedback}
                    onChange={updateField("feedback")}
                    required
                    rows={4}
                    placeholder="What's working? What could be better? Be as honest as you like."
                    className="mt-2 w-full rounded-xl
                               border border-slate-200 dark:border-white/10
                               bg-slate-50 dark:bg-black/20
                               px-4 py-3 text-sm outline-none
                               focus:border-[#6DACE7] transition-colors
                               resize-none text-[#171710] dark:text-white"
                  />
                </label>

                {/* Error Banner */}
                {submitState === "error" && (
                  <div className="flex items-start gap-2 rounded-xl
                                  border border-rose-300/60 dark:border-rose-500/30
                                  bg-rose-50/70 dark:bg-rose-900/10 px-4 py-3">
                    <AlertTriangle size={14} className="text-rose-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-rose-600 dark:text-rose-400">
                      {serverMsg || "Something went wrong. Please try again."}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  id="feedback-submit-btn"
                  disabled={isSubmitting || formData.rating === 0}
                  className="group w-full inline-flex items-center justify-center gap-2
                             h-12 rounded-xl
                             bg-[#171710] dark:bg-white
                             text-white dark:text-black
                             font-black text-xs uppercase tracking-[0.15em]
                             hover:bg-[#6DACE7] dark:hover:bg-[#6DACE7] dark:hover:text-white
                             transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Sending…</span>
                    </>
                  ) : (
                    <>
                      Submit Feedback
                      <Send
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </>
                  )}
                </button>

              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
