import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBookingSubmission } from "@/lib/api";
import { getLocalizedText, serviceCatalog } from "@/lib/service-catalog";
import { useLang } from "@/contexts/LangContext";

interface Props {
  compact?: boolean;
  preselectedService?: string;
  showMessageField?: boolean;
}

function createInitialFormState(preselectedService?: string) {
  return {
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    service: preselectedService || "",
    city: "",
    preferredDate: "",
    message: "",
  };
}

export function QuickBookingForm({ compact = false, preselectedService, showMessageField = !compact }: Props) {
  const { lang, t } = useLang();
  const [form, setForm] = useState(createInitialFormState(preselectedService));

  useEffect(() => {
    setForm((current) => ({
      ...current,
      service: preselectedService || "",
    }));
  }, [preselectedService]);

  const bookingMutation = useMutation({
    mutationFn: createBookingSubmission,
    onSuccess: () => {
      toast.success(t("booking.success"));
      setForm(createInitialFormState(preselectedService));
    },
    onError: () => {
      toast.error(t("booking.error"));
    },
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    bookingMutation.mutate({
      name: form.name.trim(),
      email: form.email.trim() || undefined,
      phone: form.phone.trim(),
      whatsapp: form.whatsapp.trim() || undefined,
      service: form.service,
      city: form.city.trim(),
      preferred_date: form.preferredDate || undefined,
      message: form.message.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border bg-card p-6 shadow-[var(--card-shadow)]">
      <h3 className="mb-4 text-lg font-bold text-foreground">
        {compact ? t("booking.quickEnquiry") : t("booking.bookService")}
      </h3>
      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        <Input placeholder={t("booking.fullName")} required value={form.name} onChange={(event) => update("name", event.target.value)} />
        <Input placeholder={t("booking.email")} type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
        <Input placeholder={t("booking.phone")} required type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
        <Input placeholder={t("booking.whatsapp")} type="tel" value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} />
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={form.service}
          onChange={(event) => update("service", event.target.value)}
          required
        >
          <option value="">{t("booking.service")}</option>
          {serviceCatalog.map((service) => (
            <option key={service.slug} value={service.title.en}>
              {getLocalizedText(service.title, lang)}
            </option>
          ))}
        </select>
        <Input placeholder={t("booking.city")} required value={form.city} onChange={(event) => update("city", event.target.value)} />
        <Input placeholder={t("booking.date")} type="date" value={form.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} />
        {showMessageField && (
          <Textarea
            placeholder={t("booking.message")}
            className={compact ? "" : "sm:col-span-2"}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
          />
        )}
      </div>
      <Button type="submit" className="mt-4 w-full" size="lg" disabled={bookingMutation.isPending}>
        {bookingMutation.isPending ? t("booking.submitting") : t("booking.submit")}
      </Button>
    </form>
  );
}
