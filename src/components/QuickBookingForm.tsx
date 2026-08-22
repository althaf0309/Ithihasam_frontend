import { useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, createBookingSubmission } from "@/lib/api";
import { trackBookingSubmitted } from "@/lib/analytics";
import { getLocalizedText, serviceCatalog } from "@/lib/service-catalog";
import { useLang } from "@/contexts/LangContext";

interface Props {
  compact?: boolean;
  preselectedService?: string;
  showMessageField?: boolean;
}

// Indian mobile numbers, optionally with +91 / 0 prefix and spacing.
const PHONE_PATTERN = /^(?:\+?91[-\s]?|0)?[6-9]\d{4}[-\s]?\d{5}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A bot that fills every field trips this; a human never sees it.
const HONEYPOT_FIELD = "company_website";
// Anything submitted faster than this is not a person reading the form.
const MIN_FILL_MS = 3000;

type FormState = ReturnType<typeof createInitialFormState>;
type FieldErrors = Partial<Record<keyof FormState, string>>;

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

function todayIso() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function validate(form: FormState, lang: "en" | "ml"): FieldErrors {
  const ml = lang === "ml";
  const errors: FieldErrors = {};

  if (form.name.trim().length < 2) {
    errors.name = ml ? "പൂർണ്ണ പേര് നൽകുക." : "Please enter your full name.";
  }
  if (!PHONE_PATTERN.test(form.phone.trim())) {
    errors.phone = ml ? "10 അക്ക മൊബൈൽ നമ്പർ നൽകുക." : "Enter a 10-digit mobile number.";
  }
  if (form.whatsapp.trim() && !PHONE_PATTERN.test(form.whatsapp.trim())) {
    errors.whatsapp = ml ? "വാട്ട്സ്ആപ്പ് നമ്പർ ശരിയല്ല." : "That WhatsApp number doesn't look right.";
  }
  if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = ml ? "ഇമെയിൽ വിലാസം ശരിയല്ല." : "That email address doesn't look right.";
  }
  if (!form.service) {
    errors.service = ml ? "സേവനം തിരഞ്ഞെടുക്കുക." : "Choose the service you need.";
  }
  if (form.city.trim().length < 2) {
    errors.city = ml ? "നഗരം / പ്രദേശം നൽകുക." : "Tell us your city or area.";
  }
  if (form.preferredDate && form.preferredDate < todayIso()) {
    errors.preferredDate = ml ? "കഴിഞ്ഞ തീയതി തിരഞ്ഞെടുക്കാനാവില്ല." : "Pick today or a later date.";
  }

  return errors;
}

export function QuickBookingForm({ compact = false, preselectedService, showMessageField = !compact }: Props) {
  const { lang, t } = useLang();
  const fieldId = useId();
  const [form, setForm] = useState(createInitialFormState(preselectedService));
  const [errors, setErrors] = useState<FieldErrors>({});
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    setForm((current) => ({ ...current, service: preselectedService || "" }));
  }, [preselectedService]);

  const bookingMutation = useMutation({
    mutationFn: createBookingSubmission,
    onSuccess: (_data, variables) => {
      trackBookingSubmitted({
        service: variables.service,
        city: variables.city,
        source: typeof window !== "undefined" ? window.location.pathname : "/",
      });
      toast.success(t("booking.success"));
      setForm(createInitialFormState(preselectedService));
      setErrors({});
      mountedAt.current = Date.now();
    },
    onError: (error) => {
      // The API already writes messages for humans (throttling, outage). Show
      // them instead of a generic failure the customer can't act on.
      toast.error(error instanceof ApiError ? error.message : t("booking.error"));
    },
  });

  const update = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Drop bot submissions silently: showing an error teaches the bot to adapt.
    if (honeypotRef.current?.value || Date.now() - mountedAt.current < MIN_FILL_MS) {
      toast.success(t("booking.success"));
      setForm(createInitialFormState(preselectedService));
      return;
    }

    const nextErrors = validate(form, lang);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`${fieldId}-${firstInvalid}`)?.focus();
      return;
    }

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

  function field(key: keyof FormState, label: string, node: (props: FieldProps) => React.ReactNode) {
    const id = `${fieldId}-${key}`;
    const errorId = `${id}-error`;
    const error = errors[key];

    return (
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        {node({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined })}
        {error && (
          <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-xl border bg-card p-6 shadow-[var(--card-shadow)]">
      <h3 className="mb-4 text-lg font-bold text-foreground">
        {compact ? t("booking.quickEnquiry") : t("booking.bookService")}
      </h3>

      {/* Honeypot. Hidden from people, offered to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={`${fieldId}-hp`}>Do not fill this in</label>
        <input
          ref={honeypotRef}
          id={`${fieldId}-hp`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={`grid gap-3 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {field("name", t("booking.fullName"), (props) => (
          <Input {...props} autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
        ))}
        {field("email", t("booking.email"), (props) => (
          <Input {...props} type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
        ))}
        {field("phone", t("booking.phone"), (props) => (
          <Input {...props} type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        ))}
        {field("whatsapp", t("booking.whatsapp"), (props) => (
          <Input {...props} type="tel" inputMode="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
        ))}
        {field("service", t("booking.service"), (props) => (
          <select
            {...props}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">{t("booking.service")}</option>
            {serviceCatalog.map((service) => (
              <option key={service.slug} value={service.title.en}>
                {getLocalizedText(service.title, lang)}
              </option>
            ))}
          </select>
        ))}
        {field("city", t("booking.city"), (props) => (
          <Input {...props} autoComplete="address-level2" value={form.city} onChange={(e) => update("city", e.target.value)} />
        ))}
        {field("preferredDate", t("booking.date"), (props) => (
          <Input {...props} type="date" min={todayIso()} value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
        ))}
        {showMessageField && (
          <div className={compact ? "" : "sm:col-span-2"}>
            {field("message", t("booking.message"), (props) => (
              <Textarea {...props} value={form.message} onChange={(e) => update("message", e.target.value)} />
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="mt-4 w-full" size="lg" disabled={bookingMutation.isPending}>
        {bookingMutation.isPending ? t("booking.submitting") : t("booking.submit")}
      </Button>
    </form>
  );
}

interface FieldProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
}
