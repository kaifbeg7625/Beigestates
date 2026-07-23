"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Property } from "@/lib/types";

const emptyForm = {
  title: "",
  location: "",
  price: "",
  property_type: "Flat",
  area: "",
  bedrooms: "",
  bathrooms: "",
  status: "Ready to Move",
  image_url: "",
  description: "",
};

export default function PropertiesManager({
  initialProperties,
}: {
  initialProperties: Property[];
}) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const supabase = createClient();

  function update<K extends keyof typeof emptyForm>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startEdit(p: Property) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      location: p.location,
      price: p.price,
      property_type: p.property_type,
      area: p.area ?? "",
      bedrooms: p.bedrooms ?? "",
      bathrooms: p.bathrooms ?? "",
      status: p.status,
      image_url: p.image_url ?? "",
      description: p.description ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      location: form.location,
      price: form.price,
      property_type: form.property_type,
      area: form.area || null,
      bedrooms: form.bedrooms || null,
      bathrooms: form.bathrooms || null,
      status: form.status,
      image_url: form.image_url || null,
      description: form.description || null,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("properties")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();

      if (!error && data) {
        setProperties((prev) =>
          prev.map((p) => (p.id === editingId ? (data as Property) : p))
        );
        cancelEdit();
      }
    } else {
      const { data, error } = await supabase
        .from("properties")
        .insert(payload)
        .select()
        .single();

      if (!error && data) {
        setProperties((prev) => [data as Property, ...prev]);
        setForm(emptyForm);
      }
    }

    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this property listing?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="space-y-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 border border-ink/10 space-y-4"
      >
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink-soft">
          {editingId ? "Edit Property" : "Add New Property"}
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput label="Title" value={form.title} onChange={(v) => update("title", v)} required />
          <LabeledInput label="Location" value={form.location} onChange={(v) => update("location", v)} required />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <LabeledInput label="Price (e.g. ₹42,00,000)" value={form.price} onChange={(v) => update("price", v)} required />
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1.5">
              Type
            </label>
            <select
              value={form.property_type}
              onChange={(e) => update("property_type", e.target.value)}
              className="w-full border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 outline-none focus:border-brass"
            >
              <option>Flat</option>
              <option>Villa</option>
              <option>Plot</option>
              <option>Interior</option>
            </select>
          </div>
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1.5">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 outline-none focus:border-brass"
            >
              <option>Ready to Move</option>
              <option>Under Construction</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <LabeledInput label="Area (e.g. 1050 sq.ft)" value={form.area} onChange={(v) => update("area", v)} />
          <LabeledInput label="Bedrooms" value={form.bedrooms} onChange={(v) => update("bedrooms", v)} />
          <LabeledInput label="Bathrooms" value={form.bathrooms} onChange={(v) => update("bathrooms", v)} />
        </div>

        <LabeledInput
          label="Image URL (upload to imgur.com and paste the direct link)"
          value={form.image_url}
          onChange={(v) => update("image_url", v)}
        />

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1.5">
            Description (optional)
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 outline-none focus:border-brass min-h-[70px]"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded bg-ink text-paper font-mono text-[13px] uppercase tracking-wide hover:bg-blueprint-deep transition-colors disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Update Property" : "Add Property"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-3 rounded border border-ink/25 font-mono text-[13px] uppercase tracking-wide"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="font-mono text-xs uppercase tracking-wide text-ink-soft mb-4">
          All Listings ({properties.length})
        </h2>
        <div className="space-y-3">
          {properties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded border border-ink/10 p-4 flex items-center gap-4"
            >
              <div
                className="w-20 h-16 rounded bg-cover bg-center bg-[#e8e2d4] shrink-0"
                style={{
                  backgroundImage: p.image_url ? `url('${p.image_url}')` : undefined,
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {p.title} — {p.location}
                </p>
                <p className="text-xs text-ink-soft">
                  {p.price} · {p.property_type} · {p.status}
                </p>
              </div>
              <button
                onClick={() => startEdit(p)}
                className="font-mono text-xs uppercase text-brass shrink-0"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="font-mono text-xs uppercase text-[#B5533C] shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
          {properties.length === 0 && (
            <p className="text-sm text-ink-soft">No properties yet. Add your first one above.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-1.5">
        {label}
      </label>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 outline-none focus:border-brass"
      />
    </div>
  );
}
