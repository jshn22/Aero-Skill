import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  ShieldCheck,
  Clock3,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mail,
  MessageSquareHeart,
} from "lucide-react";
import FeedbackModal from "../components/FeedbackModal";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// VITE_APPS_SCRIPT_URL is the single URL that handles BOTH forms.
// The script routes on the `type` POST parameter (contact | feedback).
// Set this in your .env file after deploying Code.gs as a Web App.
const CONTACT_FORM_CONFIG = {
  actionUrl:
    import.meta.env.VITE_APPS_SCRIPT_URL ||
    import.meta.env.VITE_GOOGLE_FORM_ACTION_URL ||
    "https://script.google.com/macros/s/REPLACE_WITH_YOUR_SCRIPT_ID/exec",
  fields: {
    // Only used in legacy Google Form mode (when URL contains docs.google.com)
    fullName: import.meta.env.VITE_GFORM_FULL_NAME_ENTRY || "entry.REPLACE_NAME",
    email:    import.meta.env.VITE_GFORM_EMAIL_ENTRY     || "entry.REPLACE_EMAIL",
    goal:     import.meta.env.VITE_GFORM_GOAL_ENTRY      || "entry.REPLACE_GOAL",
    message:  import.meta.env.VITE_GFORM_MESSAGE_ENTRY   || "entry.REPLACE_MESSAGE",
  },
};
// ─────────────────────────────────────────────────────────────────────────────

const initialForm = { fullName: "", email: "", goal: "", message: "" };

const Contact = () => {
  const [formData,       setFormData]       = useState(initialForm);
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [submitState,    setSubmitState]    = useState("idle"); // idle | success | error
  const [serverMsg,      setServerMsg]      = useState("");
  const [feedbackOpen,   setFeedbackOpen]   = useState(false); // controls FeedbackModal

  // ── Detect which backend mode we are in ─────────────────────────────────
  const { mode, isConfigured } = useMemo(() => {
    const url = CONTACT_FORM_CONFIG.actionUrl;
    const isAppsScript = url.includes("script.google.com");
    const isGoogleForm = url.includes("docs.google.com/forms");
    const notPlaceholder = !url.includes("REPLACE");

    if (isAppsScript) return { mode: "apps-script", isConfigured: notPlaceholder };
    if (isGoogleForm) {
      const hasFieldIds = Object.values(CONTACT_FORM_CONFIG.fields).every(
        (v) => !v.includes("REPLACE")
      );
      return { mode: "google-form", isConfigured: notPlaceholder && hasFieldIds };
    }
    return { mode: "unknown", isConfigured: false };
  }, []);

  const updateField = (field) => (event) =>
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));

  // ── Form Submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting || !isConfigured) return;

    setIsSubmitting(true);
    setSubmitState("idle");
    setServerMsg("");

    try {
      const payload = new URLSearchParams();

      if (mode === "apps-script") {
        // Apps Script mode — add `type` so Code.gs routes to the Contact sheet
        payload.append("type",     "contact");
        payload.append("fullName", formData.fullName);
        payload.append("email",    formData.email);
        payload.append("goal",     formData.goal);
        payload.append("message",  formData.message);
      } else {
        // Legacy Google Form mode — use the entry.XXXXXXXXXX field IDs
        payload.append(CONTACT_FORM_CONFIG.fields.fullName, formData.fullName);
        payload.append(CONTACT_FORM_CONFIG.fields.email,    formData.email);
        payload.append(CONTACT_FORM_CONFIG.fields.goal,     formData.goal);
        payload.append(CONTACT_FORM_CONFIG.fields.message,  formData.message);
      }

      const response = await fetch(CONTACT_FORM_CONFIG.actionUrl, {
        method: "POST",
        // No `mode: "no-cors"` — we need to READ the JSON response.
        // Google Apps Script Web Apps (deployed as "Anyone") support CORS
        // for simple POST requests with application/x-www-form-urlencoded bodies.
        body: payload,
      });

      if (mode === "google-form") {
        // Google Forms doesn't return a usable JSON body — treat any response as success
        setSubmitState("success");
        setFormData(initialForm);
        return;
      }

      if (!response.ok) throw new Error(`Network error: HTTP ${response.status}`);

      const data = await response.json();

      if (data.success) {
        setServerMsg(data.message);
        setSubmitState("success");
        setFormData(initialForm);
      } else {
        throw new Error(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setServerMsg(err.message || "Something went wrong. Please try again.");
      setSubmitState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Feedback Modal (rendered in portal-style above the page) ── */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />

      <section className="relative w-full py-24 px-6 bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] right-[-10%] w-[40%] h-[40%] bg-[#6DACE7]/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-yellow-500/4 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Page header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[1px] w-8 bg-[#6DACE7]" />
                <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                  Connect
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-[#171710] dark:text-white">
                Get Guidance,
                <br />
                Stay{" "}
                <span className="italic font-serif text-[#6DACE7]">
                  Connected.
                </span>
              </h1>
            </div>
            <p className="max-w-sm text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed border-l border-slate-200 dark:border-slate-800 pl-6">
              Ask about collaboration, learning paths, curriculum, or what you
              will learn next. We are here to help.
            </p>
          </div>

          {/* ── Feedback Bar ─────────────────────────────────────────────────
               Changed from <a href="mailto:..."> to a button that opens
               the FeedbackModal — UI appearance is identical.
          ─────────────────────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-5 mb-12">
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Your feedback matters. It helps us improve and grow — tell us what&apos;s
              working and what isn&apos;t.
            </p>
            <button
              id="open-feedback-modal-btn"
              onClick={() => setFeedbackOpen(true)}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                         bg-[#171710] dark:bg-white text-white dark:text-black
                         font-black text-xs tracking-wide uppercase
                         hover:bg-[#6DACE7] transition-colors"
            >
              <MessageSquareHeart size={14} />
              Feedback Form →
            </button>
          </div>

          {/* Contact layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left dark panel */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 rounded-[2.5rem] bg-[#171710] dark:bg-white text-white dark:text-[#171710] p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-[1px] w-8 bg-[#6DACE7]" />
                  <span className="text-[#6DACE7] font-bold tracking-[0.2em] text-xs uppercase">
                    Contact Us
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]">
                  You are closer
                  <br />
                  than you think.
                </h2>
                <p className="mt-6 text-slate-300 dark:text-slate-600 leading-relaxed max-w-sm">
                  Most students underestimate themselves. Share where you are stuck
                  and we will help you map the next clear step.
                </p>
              </div>

              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Clock3 size={16} className="text-[#6DACE7]" />
                  <span className="text-slate-300 dark:text-slate-600">
                    Average response: within 24 hours
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#6DACE7]" />
                  <span className="text-slate-300 dark:text-slate-600">
                    Your details stay private and secure
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-[#6DACE7]" />
                  <span className="text-slate-300 dark:text-slate-600">
                    Clear guidance, no judgment
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 dark:border-black/10 space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6DACE7]">
                  Support Channels
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="mailto:aeroskill@aerodip.com"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 dark:bg-black/10 text-xs font-bold hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  >
                    <Mail size={14} />
                    aeroskill@aerodip.com
                  </a>
                </div>
              </div>
            </motion.aside>

            {/* Right form panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="lg:col-span-7 rounded-[2.5rem] bg-slate-50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 p-8 md:p-10"
            >
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#171710] dark:text-white">
                Reach out. We will help.
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                Tell us your goal and the challenge you are facing. The more
                specific you are, the better we can support you.
              </p>

              {/* Not-configured warning */}
              {!isConfigured && (
                <div className="mt-5 rounded-xl border border-amber-300/60 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-900/10 px-4 py-3 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
                  <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                    {mode === "apps-script"
                      ? "Apps Script URL is missing. Set VITE_APPS_SCRIPT_URL in your .env file."
                      : "Google Form is not configured yet. Add VITE_APPS_SCRIPT_URL in your .env file."}
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Full Name */}
                <label className="md:col-span-1">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    Full Name
                  </span>
                  <input
                    id="contact-full-name"
                    value={formData.fullName}
                    onChange={updateField("fullName")}
                    required
                    type="text"
                    placeholder="Your full name"
                    className="mt-2 w-full h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 text-sm outline-none focus:border-[#6DACE7] transition-colors text-[#171710] dark:text-white"
                  />
                </label>

                {/* Email */}
                <label className="md:col-span-1">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    Email
                  </span>
                  <input
                    id="contact-email"
                    value={formData.email}
                    onChange={updateField("email")}
                    required
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 text-sm outline-none focus:border-[#6DACE7] transition-colors text-[#171710] dark:text-white"
                  />
                </label>

                {/* Primary Goal */}
                <label className="md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    Primary Goal
                  </span>
                  <select
                    id="contact-goal"
                    value={formData.goal}
                    onChange={updateField("goal")}
                    required
                    className="mt-2 w-full h-12 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 text-sm outline-none focus:border-[#6DACE7] transition-colors text-[#171710] dark:text-white"
                  >
                    <option value="">Select your goal</option>
                    <option value="Learn technology skills">Learn technology skills</option>
                    <option value="Explore careers">Explore careers</option>
                  </select>
                </label>

                {/* Message */}
                <label className="md:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    Message
                  </span>
                  <textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={updateField("message")}
                    required
                    rows={5}
                    placeholder="Briefly describe where you are stuck and what outcome you want."
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/20 px-4 py-3 text-sm outline-none focus:border-[#6DACE7] transition-colors resize-none text-[#171710] dark:text-white"
                  />
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={!isConfigured || isSubmitting}
                  className="md:col-span-2 group mt-4 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-[#171710] dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.15em] hover:bg-[#6DACE7] dark:hover:bg-[#6DACE7] dark:hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending…</span>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* ── Success Message ── */}
              {submitState === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  {serverMsg || "Message sent. We will reach out soon."}
                </motion.p>
              )}

              {/* ── Error Message ── */}
              {submitState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-xl border border-rose-300/60 dark:border-rose-500/30 bg-rose-50/70 dark:bg-rose-900/10 px-4 py-3 flex items-start gap-3"
                >
                  <AlertTriangle size={14} className="text-rose-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    {serverMsg || "Something went wrong. Please try again."}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
