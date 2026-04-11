import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Clock, BadgeIndianRupee, Home, MessageCircle, ChevronDown, Users, Award, Target, Heart } from "lucide-react";
import { Zap, Paintbrush, Settings, Hammer, Factory, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { useState } from "react";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerAppliance from "@/assets/banner-appliance.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerFabrication from "@/assets/banner-fabrication.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";

const services = [
  { title: "Electrical & Plumbing", description: "Expert electricians and plumbers for all your home needs — wiring, fixtures, pipe repairs, and more.", icon: Zap, slug: "electrical-plumbing", image: bannerElectrical },
  { title: "Painting Services", description: "Transform your space with professional interior and exterior painting by skilled painters.", icon: Paintbrush, slug: "painting", image: bannerPainting },
  { title: "Appliance Servicing", description: "AC, washing machine, refrigerator repairs and servicing by trained technicians.", icon: Settings, slug: "appliance-servicing", image: bannerAppliance },
  { title: "Carpentry & Woodwork", description: "Custom furniture, repairs, modular kitchen installation, and all woodwork solutions.", icon: Hammer, slug: "carpentry", image: bannerCarpentry },
  { title: "Metal Fabrication & Roofing", description: "Gates, grills, roofing sheets, and structural metalwork by experienced fabricators.", icon: Factory, slug: "roofing-fabrication", image: bannerFabrication },
  { title: "Deep Cleaning Services", description: "Comprehensive home and office deep cleaning — bathrooms, kitchens, floors, and more.", icon: Sparkles, slug: "deep-cleaning", image: bannerCleaning },
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

const faqs = [
  { q: "How do I book a service?", a: "You can book through our website form, call us directly, or message us on WhatsApp. We'll confirm your booking within 15 minutes." },
  { q: "Are your professionals verified?", a: "Yes, all our professionals undergo thorough background checks, skill assessments, and are fully trained before joining our network." },
  { q: "What cities do you operate in?", a: "We currently operate in 15+ cities including Mumbai, Pune, Delhi, Bangalore, Chennai, Hyderabad, and more. We're expanding rapidly!" },
  { q: "Do you offer warranties on services?", a: "Yes, all our services come with a 30-day warranty. For painting and carpentry, we offer extended warranties up to 1 year." },
  { q: "What are your working hours?", a: "We operate 7 days a week from 8 AM to 9 PM. Emergency electrical and plumbing services are available 24/7." },
  { q: "How is pricing determined?", a: "Our pricing is transparent and based on the scope of work. We provide a detailed estimate before starting any service — no hidden charges." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary"
        onClick={() => setOpen(!open)}
      >
        {q}
        <ChevronDown size={18} className={`shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              WHAT WE OFFER
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("services.title")}</h2>
            <p className="mx-auto max-w-lg text-muted-foreground">{t("services.subtitle")}</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
                ABOUT ITHIHASA
              </span>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Building Trust, One <span className="text-gradient">Service</span> at a Time
              </h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Ithihasa was founded with a simple mission — to make quality home services accessible, affordable, and reliable for every Indian homeowner. We connect you with verified, skilled professionals who treat your home like their own.
              </p>
              <p className="mb-8 text-muted-foreground leading-relaxed">
                With over 10,000 happy customers across 15+ cities, we've built a reputation for excellence, transparency, and unmatched customer support. Whether it's a leaking tap or a complete home makeover, Ithihasa is your trusted partner.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, value: "10,000+", label: "Happy Customers" },
                  { icon: Award, value: "500+", label: "Verified Pros" },
                  { icon: Target, value: "15+", label: "Cities Covered" },
                  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                    className="rounded-xl border border-border/50 bg-card p-4"
                  >
                    <stat.icon size={20} className="mb-2 text-primary" />
                    <div className="text-xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img src={bannerElectrical} alt="Electrical work" className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img src={bannerCleaning} alt="Cleaning service" className="h-32 w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img src={bannerPainting} alt="Painting service" className="h-32 w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img src={bannerCarpentry} alt="Carpentry work" className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110" loading="lazy" />
                  </motion.div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-40 w-40 rounded-full bg-primary/5 blur-[60px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              WHY ITHIHASA
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("why.title")}</h2>
            <p className="text-muted-foreground">{t("why.subtitle")}</p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 transition-all group-hover:from-primary/25 group-hover:to-secondary/25">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h4 className="mb-1 text-sm font-bold text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="mb-3 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
                FAQs
              </span>
              <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h2>
              <p className="mb-6 text-muted-foreground">
                Everything you need to know about our services. Can't find what you're looking for? Reach out on WhatsApp!
              </p>
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card px-6">
                {faqs.map((faq) => (
                  <FAQItem key={faq.q} {...faq} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <div className="sticky top-24">
                <QuickBookingForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              TESTIMONIALS
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{t("testimonials.title")}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <TestimonialCard {...item} />
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
