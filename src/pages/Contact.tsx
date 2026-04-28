import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { useLang } from "@/contexts/LangContext";
import {
  BUSINESS_EMAIL,
  BUSINESS_LOCATION,
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  BUSINESS_WHATSAPP,
} from "@/lib/site";

const contactHighlights = [
  {
    icon: Phone,
    title: "Call Us",
    body: "Talk directly with the team for urgent service coordination or booking support.",
    valueLabel: "Phone",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    body: "Share your service need quickly on WhatsApp for faster follow-up and scheduling.",
    valueLabel: "WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    body: "Send project details, photos, or service questions if you prefer written communication.",
    valueLabel: "Email",
  },
  {
    icon: MapPin,
    title: "Office Address",
    body: "Visit or reference our listed office location for business and support communication.",
    valueLabel: "Address",
  },
];

export default function Contact() {
  const { lang } = useLang();
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_LOCATION)}`;

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Contact Ithihasam | Call, WhatsApp, Address and Booking"
        description="Contact Ithihasam for home maintenance bookings, WhatsApp support, phone assistance, office address details, and service enquiries in Kannur and Thrissur."
        keywords={[
          "contact Ithihasam",
          "Ithihasam phone number",
          "Ithihasam WhatsApp",
          "Thalassery office address",
          "home service booking contact Kerala",
        ]}
        canonicalPath="/contact"
      />
      <Header />

      <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/10" />
        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contact Ithihasam
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Reach us for bookings, support, and service enquiries
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Call, WhatsApp, email, or submit the booking form and our team will help coordinate the right home service for your requirement.
            </p>
            <div className="mt-8">
              <ContactCTAButtons size="lg" showLabels />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon size={22} />
              </div>
              <h2 className="text-lg font-bold text-foreground">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
              <div className="mt-4 text-sm font-semibold text-foreground">
                {item.valueLabel === "Phone" && BUSINESS_PHONE_DISPLAY}
                {item.valueLabel === "WhatsApp" && BUSINESS_PHONE_DISPLAY}
                {item.valueLabel === "Email" && BUSINESS_EMAIL}
                {item.valueLabel === "Address" && BUSINESS_LOCATION}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="booking" className="scroll-mt-24 pb-16">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)] md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Send a Booking Request</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">Tell us what service you need</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Share the service type, area, preferred date, and any useful job notes. We will follow up to confirm availability and scheduling.
            </p>
            <div className="mt-8">
              <QuickBookingForm />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]">
              <h3 className="text-xl font-bold text-foreground">Direct Contact</h3>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Phone:</span>{" "}
                  <a href={`tel:${BUSINESS_PHONE}`} className="hover:text-primary">
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">WhatsApp:</span>{" "}
                  <a
                    href={`https://wa.me/${BUSINESS_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-whatsapp"
                  >
                    {BUSINESS_PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Email:</span> {BUSINESS_EMAIL}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Address:</span> {BUSINESS_LOCATION}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-[var(--card-shadow)]">
              <div className="flex items-center gap-3">
                <Clock3 size={18} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground">Working Support Window</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                We respond throughout the week, and urgent home-service requests are prioritized as quickly as possible based on technician availability.
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Open Address in Maps
              </a>
            </div>

            <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-secondary/10 p-6 shadow-[var(--card-shadow)]">
              <h3 className="text-xl font-bold text-foreground">Service Coverage</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                We are actively focused on service demand in Kannur and Thrissur districts, while continuing to support broader home-maintenance expansion.
              </p>
              <p className="mt-3 text-sm font-semibold text-foreground">{lang === "ml" ? "Kannur and Thrissur Focus" : "Kannur and Thrissur Focus"}</p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
