"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const initialState = {
  name: "",
  mobile: "",
  service: "",
  city: "",
  budget: "",
  timeline: "",
  notes: "",
};

export default function EnquiryForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  useEffect(() => {
    const preselected = sessionStorage.getItem("beig_intent_service");
    if (preselected) {
      setForm((f) => ({ ...f, service: preselected }));
    }
  }, []);

  function update<K extends keyof typeof initialState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const supabase = createClient();
    const { error } = await supabase.from("leads").insert({
      name: form.name,
      mobile: form.mobile,
      service: form.service,
      city: form.city,
      budget: form.budget,
      timeline: form.timeline,
      notes: form.notes || null,
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("done");
    setForm(initialState);
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Full name">
        <input
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="input"
        />
      </Field>

      <Field label="Mobile number">
        <input
          required
          type="tel"
          pattern="[0-9]{10}"
          maxLength={10}
          value={form.mobile}
          onChange={(e) => update("mobile", e.target.value)}
          className="input"
          placeholder="10-digit number"
        />
      </Field>

      <Field label="What are you looking for?">
        <select
          required
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
        <Field label="City / locality">
          <input
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Budget range">
          <select
            required
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

      <Field label="When do you plan to proceed?">
        <select
          required
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

      <Field label="Additional requirements (optional)">
        <textarea
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
