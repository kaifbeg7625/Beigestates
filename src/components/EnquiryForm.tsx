"use client";

import { useState, useEffect } from "react";
import { Button } from "./Button";

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
        <p className="font-extrabold text-lg font-semibold mb-1">Thank you!</p>
        <p className="text-sm text-ink-soft">
          Your requirement has been received. We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot field — hidden from real users via multiple CSS layers, present in DOM for bots */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
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

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" htmlFor="name">
          <input
            required
            id="name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input"
            placeholder="Your name"
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
      </div>

      <Field label="What are you looking for?" htmlFor="service">
        <select
          required
          id="service"
          name="service"
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          className="input"
        >
          <option value="" disabled>Choose an option</option>
          <option>Buy Property</option>
          <option>Sell Property</option>
          <option>Rent Property (Looking to Rent)</option>
          <option>List Property for Rent</option>
          <option>Buy Plot</option>
          <option>Interior Design</option>
          <option>Real Estate Consultation</option>
        </select>
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="City / locality" htmlFor="city">
          <input
            required
            id="city"
            name="city"
            autoComplete="address-level2"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="input"
            placeholder="Gomti Nagar, Hazratganj…"
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
            <option value="" disabled>Choose a range</option>
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
          <option value="" disabled>Choose a timeline</option>
          <option>Immediately</option>
          <option>Within 30 days</option>
          <option>Within 3 months</option>
          <option>Just exploring</option>
        </select>
      </Field>

      <Field label="Anything else? (optional)" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="input resize-none"
          placeholder="Floor preference, parking, possession date…"
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-danger">
          Something went wrong submitting your requirement. Please try again
          or reach out on WhatsApp directly.
        </p>
      )}

      <Button
        type="submit"
        variant="secondary"
        disabled={status === "submitting"}
        className="w-full mt-2"
        arrow={status !== "submitting"}
      >
        {status === "submitting" ? "Submitting…" : "Submit requirement"}
      </Button>

      {/* Bordered fields on a tinted fill, the same treatment as the hero
          search and the listings filters. A bottom rule on its own left the
          form looking like a different site to the one around it. */}
      <style jsx>{`
        .input {
          width: 100%;
          border: 1.5px solid color-mix(in srgb, var(--ink) 12%, transparent);
          border-radius: 0.75rem;
          background: color-mix(in srgb, var(--paper) 55%, transparent);
          font-size: 1.0625rem;
          font-family: inherit;
          color: var(--ink);
          padding: 14px 16px;
          outline: none;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .input::placeholder {
          color: color-mix(in srgb, var(--ink-soft) 50%, transparent);
        }
        .input:hover {
          border-color: color-mix(in srgb, var(--ink) 25%, transparent);
        }
        .input:focus {
          border-color: var(--brass);
          background: #fff;
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
      {/* Sentence case at body size. The mono uppercase micro-labels read as
          a technical form rather than a conversation. */}
      <label
        htmlFor={htmlFor}
        className="block text-sm font-bold text-ink mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
