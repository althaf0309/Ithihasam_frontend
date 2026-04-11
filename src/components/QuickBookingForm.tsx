import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const services = [
  "Electrical & Plumbing",
  "Painting Services",
  "Appliance Servicing",
  "Carpentry & Woodwork",
  "Metal Fabrication & Roofing",
  "Deep Cleaning Services",
  "Pest Control",
  "Smart Home Setup",
];

interface Props {
  compact?: boolean;
  preselectedService?: string;
}

export function QuickBookingForm({ compact = false, preselectedService }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    service: preselectedService || "",
    city: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Enquiry submitted! We'll contact you shortly.");
    setForm({ name: "", phone: "", whatsapp: "", service: preselectedService || "", city: "", date: "", message: "" });
  };

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 shadow-[var(--card-shadow)]"
    >
      <h3 className="mb-4 text-lg font-bold text-foreground">
        {compact ? "Quick Enquiry" : "Book a Service"}
      </h3>
      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <Input placeholder="Full Name *" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        <Input placeholder="Phone Number *" required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        <Input placeholder="WhatsApp Number" type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          required
        >
          <option value="">Service Required *</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <Input placeholder="City / Area *" required value={form.city} onChange={(e) => update("city", e.target.value)} />
        <Input placeholder="Preferred Date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
        {!compact && (
          <Textarea
            placeholder="Message (optional)"
            className="sm:col-span-2"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        )}
      </div>
      <Button type="submit" className="mt-4 w-full" size="lg">
        Submit Enquiry
      </Button>
    </form>
  );
}
