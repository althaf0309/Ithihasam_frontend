import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Clock, BadgeIndianRupee, Home, MessageCircle } from "lucide-react";
import { Zap, Paintbrush, Settings, Hammer, Factory, Sparkles } from "lucide-react";

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
  { name: "Rajesh Kumar", location: "Pune", text: "Got my entire house painted through HomeServ. The quality of work was excellent and they finished on time.", rating: 5 },
  { name: "Anita Desai", location: "Bangalore", text: "The deep cleaning service was thorough. My kitchen and bathrooms look brand new. Will definitely book again.", rating: 4 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />
      <CategoryIconStrip />

      {/* Services */}
      <section id="services" className="py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Our Services</h2>
            <p className="text-muted-foreground">Professional home services tailored to your needs</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="bg-surface-warm py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Why Choose Us</h2>
            <p className="text-muted-foreground">What makes HomeServ different</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyUs.map((item) => (
              <div key={item.title} className="flex flex-col items-center rounded-xl bg-card p-6 text-center shadow-[var(--card-shadow)]">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon size={22} className="text-primary" />
                </div>
                <h4 className="mb-1 text-sm font-bold text-foreground">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-16">
        <div className="container max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Book a Service</h2>
            <p className="text-muted-foreground">Fill in the form below and we'll get back to you</p>
          </div>
          <QuickBookingForm />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">What Our Customers Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
