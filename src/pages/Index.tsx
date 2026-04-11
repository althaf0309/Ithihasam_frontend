import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Clock, BadgeIndianRupee, Home, MessageCircle } from "lucide-react";
import { Zap, Paintbrush, Settings, Hammer, Factory, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const services = [
  { title: "Electrical & Plumbing", description: "Expert electricians and plumbers for all your home needs — wiring, fixtures, pipe repairs, and more.", icon: Zap, slug: "electrical-plumbing" },
  { title: "Painting Services", description: "Transform your space with professional interior and exterior painting by skilled painters.", icon: Paintbrush, slug: "painting" },
  { title: "Appliance Servicing", description: "AC, washing machine, refrigerator repairs and servicing by trained technicians.", icon: Settings, slug: "appliance-servicing" },
  { title: "Carpentry & Woodwork", description: "Custom furniture, repairs, modular kitchen installation, and all woodwork solutions.", icon: Hammer, slug: "carpentry" },
  { title: "Metal Fabrication & Roofing", description: "Gates, grills, roofing sheets, and structural metalwork by experienced fabricators.", icon: Factory, slug: "roofing-fabrication" },
  { title: "Deep Cleaning Services", description: "Comprehensive home and office deep cleaning — bathrooms, kitchens, floors, and more.", icon: Sparkles, slug: "deep-cleaning" },
];

const whyUs = [
  { icon: ShieldCheck, title: "Verified Professionals", desc: "Background-checked and trained experts" },
  { icon: Clock, title: "Fast Response", desc: "Service within 2 hours of booking" },
  { icon: BadgeIndianRupee, title: "Affordable Pricing", desc: "Transparent rates, no hidden charges" },
  { icon: Home, title: "Doorstep Service", desc: "We come to you, hassle-free" },
  { icon: MessageCircle, title: "WhatsApp Support", desc: "Chat with us anytime for quick help" },
];

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai", text: "Booked an electrician and he arrived within an hour. Very professional and the pricing was fair. Highly recommend!", rating: 5 },
  { name: "Rajesh Kumar", location: "Pune", text: "Got my entire house painted through Ithihasa. The quality of work was excellent and they finished on time.", rating: 5 },
  { name: "Anita Desai", location: "Bangalore", text: "The deep cleaning service was thorough. My kitchen and bathrooms look brand new. Will definitely book again.", rating: 4 },
];

const Index = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryIconStrip />

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              {t("services.title")}
            </span>
            <h2 className="mb-2 text-3xl font-bold text-foreground">{t("services.title")}</h2>
            <p className="text-muted-foreground">{t("services.subtitle")}</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-2 text-3xl font-bold text-foreground">{t("why.title")}</h2>
            <p className="text-muted-foreground">{t("why.subtitle")}</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col items-center rounded-xl border border-border/50 bg-card p-6 text-center shadow-[var(--card-shadow)] transition-all hover:border-primary/30 hover:glow-primary"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h4 className="mb-1 text-sm font-bold text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="mb-2 text-3xl font-bold text-foreground">{t("booking.title")}</h2>
            <p className="text-muted-foreground">{t("booking.subtitle")}</p>
          </motion.div>
          <QuickBookingForm />
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-2 text-3xl font-bold text-foreground">{t("testimonials.title")}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
