"use client";

import { useState, useEffect } from "react";

const initialState = {
  name: "",
  mobile: "",
  service: "",
  city: "",
  budget: "",
  timeline: "",
  notes: "",
  company: "", // honeypot — real users never fill this; bots often do
};

export default function EnquiryForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  useEffect(() => {
    const preselected = sessionStorage.getItem("beig_intent_service");
    const preNotes = sessionStorage.getItem("beig_intent_notes");
    if (preselected || preNotes) {
      setForm((f) => ({
        ...f,
        service: preselected || f.service,
        notes: preNotes || f.notes,
      }));
      sessionStorage.removeItem("beig_intent_notes");
    }
  }, []);

  function update<K extends keyof typeof initialState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot check — if this hidden field is filled, silently pretend
    // success without hitting the API (it's very likely a bot).
    if (form.company) {
      setStatus("done");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("done");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded border border-brass/40 bg-brass/5 p-6 text-center">
        <p className="font-serif text-lg font-semibold mb-1">Thank you!</p>
        <p className="text-sm text-ink-soft">
          Your requirement has been received. We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot field — hidden from real users via CSS, visible to bots */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <Field label="Full name" htmlFor="name">
        <input
          required
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Mobile number" htmlFor="mobile">
        <input
          required
          id="mobile"
          name="mobile"
          type="tel"
          autoComplete="tel"
          pattern="[0-9]{10}"
          maxLength={10}
          value={form.mobile}
          onChange={(e) => update("mobile", e.target.value)}
          className="input"
          placeholder="10-digit number"
        />
      </Field>

      <Field label="What are you looking for?" htmlFor="service">
        <select
          required
          id="service"
          name="service"
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className="input"
        >
          <option value="" disabled>Select one</option>
          <option>Buy Property</option>
          <option>Sell Property</option>
          <option>Rent Property (Looking to Rent)</option>
          <option>List Property for Rent</option>
          <option>Buy Plot</option>
          <option>Interior Design</option>
          <option>Real Estate Consultation</option>
        </select>
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="City / locality" htmlFor="city">
          <input
            required
            id="city"
            name="city"
            autoComplete="address-level2"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Budget range" htmlFor="budget">
          <select
            required
            id="budget"
            name="budget"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="input"
          >
            <option value="" disabled>Select</option>
            <option>Below ₹25L</option>
            <option>₹25L – ₹75L</option>
            <option>₹75L – ₹1.5Cr</option>
            <option>Above ₹1.5Cr</option>
            <option>Below ₹3L (interior)</option>
            <option>₹3L – ₹8L (interior)</option>
            <option>₹8L – ₹15L (interior)</option>
            <option>Above ₹15L (interior)</option>
          </select>
        </Field>
      </div>

      <Field label="When do you plan to proceed?" htmlFor="timeline">
        <select
          required
          id="timeline"
          name="timeline"
          value={form.timeline}
          onChange={(e) => update("timeline", e.target.value)}
          className="input"
        >
          <option value="" disabled>Select one</option>
          <option>Immediately</option>
          <option>Within 30 days</option>
          <option>Within 3 months</option>
          <option>Just exploring</option>
        </select>
      </Field>

      <Field label="Additional requirements (optional)" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="input min-h-[70px]"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-[#B5533C]">
          Something went wrong submitting your requirement. Please try again
          or reach out on WhatsApp directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full mt-2 py-4 rounded bg-ink text-paper font-mono text-[13px] tracking-wide uppercase hover:bg-blueprint-deep transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit requirement →"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid rgba(26, 39, 51, 0.25);
          background: transparent;
          font-size: 16px;
          padding: 8px 2px 10px;
          outline: none;
        }
        .input:focus {
          border-bottom-color: var(--brass);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
