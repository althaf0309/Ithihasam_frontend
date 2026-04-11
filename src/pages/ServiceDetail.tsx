import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { Zap, Paintbrush, Settings, Hammer, Factory, Sparkles, Bug, Cpu, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";

const serviceData: Record<string, {
  title: string;
  description: string;
  icon: typeof Zap;
  includes: string[];
  faqs: { q: string; a: string }[];
}> = {
  "electrical-plumbing": {
    title: "Electrical & Plumbing",
    description: "Complete electrical and plumbing solutions for your home. From wiring to pipe repairs, our verified professionals handle it all.",
    icon: Zap,
    includes: ["Wiring & Rewiring", "Switch & Socket Installation", "MCB & DB Box Repair", "Pipe Fitting & Repair", "Tap & Faucet Installation", "Water Tank Installation", "Geyser Installation", "Drainage Solutions"],
    faqs: [
      { q: "How quickly can I get an electrician?", a: "We typically dispatch a professional within 2 hours of booking." },
      { q: "Do you provide warranty on repairs?", a: "Yes, all repairs come with a 30-day service warranty." },
      { q: "Are your electricians licensed?", a: "All our professionals are verified, trained, and certified." },
    ],
  },
  "painting": {
    title: "Painting Services",
    description: "Professional painting services for interior and exterior walls. We use premium paints and deliver flawless finishes.",
    icon: Paintbrush,
    includes: ["Interior Wall Painting", "Exterior Wall Painting", "Texture Painting", "Wood Polishing", "Waterproofing Coating", "Color Consultation"],
    faqs: [
      { q: "Do you provide paint or should I buy?", a: "We can provide premium quality paint or use your preferred brand." },
      { q: "How long does a 2BHK take?", a: "Typically 3-5 days depending on the scope." },
    ],
  },
  "appliance-servicing": {
    title: "Appliance Servicing",
    description: "Expert repair and maintenance for all home appliances including AC, washing machines, refrigerators, and more.",
    icon: Settings,
    includes: ["AC Service & Repair", "Washing Machine Repair", "Refrigerator Repair", "Microwave Repair", "Water Purifier Service", "Chimney Cleaning"],
    faqs: [
      { q: "Do you service all brands?", a: "Yes, our technicians are trained to service all major brands." },
    ],
  },
  "carpentry": {
    title: "Carpentry & Woodwork",
    description: "Custom furniture, repairs, and modular installations by experienced carpenters.",
    icon: Hammer,
    includes: ["Custom Furniture", "Modular Kitchen", "Wardrobe Installation", "Door & Window Repair", "Bed & Sofa Repair", "Wood Polishing"],
    faqs: [
      { q: "Can you build custom furniture?", a: "Absolutely! We create custom pieces based on your design and requirements." },
    ],
  },
  "roofing-fabrication": {
    title: "Metal Fabrication & Roofing",
    description: "Durable gates, grills, roofing sheets, and structural metalwork by experienced fabricators.",
    icon: Factory,
    includes: ["MS/SS Gates & Grills", "Roofing Sheet Installation", "Railing Fabrication", "Shed Construction", "Welding Repairs", "Structural Steelwork"],
    faqs: [
      { q: "What materials do you use?", a: "We work with mild steel, stainless steel, and aluminum depending on your needs." },
    ],
  },
  "deep-cleaning": {
    title: "Deep Cleaning Services",
    description: "Comprehensive deep cleaning for homes and offices. We make every corner spotless.",
    icon: Sparkles,
    includes: ["Full Home Deep Clean", "Kitchen Deep Clean", "Bathroom Deep Clean", "Sofa & Carpet Cleaning", "Office Cleaning", "Post-Construction Cleaning"],
    faqs: [
      { q: "How long does a full home cleaning take?", a: "A 2BHK typically takes 4-6 hours." },
    ],
  },
  "pest-control": {
    title: "Pest Control",
    description: "Safe and effective pest control treatments for homes and offices.",
    icon: Bug,
    includes: ["Cockroach Treatment", "Termite Treatment", "Bed Bug Treatment", "Mosquito Control", "Rodent Control", "General Pest Control"],
    faqs: [],
  },
  "smart-home": {
    title: "Smart Home Setup",
    description: "Transform your home with smart lighting, security cameras, and automated systems.",
    icon: Cpu,
    includes: ["Smart Lighting", "CCTV Installation", "Smart Lock Setup", "Home Automation", "Wi-Fi Setup", "Intercom Installation"],
    faqs: [],
  },
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground"
        onClick={() => setOpen(!open)}
      >
        {q}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-sm text-muted-foreground">{a}</p>}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceData[slug || ""];

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Service not found</h1>
          <Link to="/" className="mt-4 inline-block text-primary underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Banner */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
            <Icon size={32} className="text-primary-foreground" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl">{service.title}</h1>
          <p className="mx-auto max-w-xl text-primary-foreground/80">{service.description}</p>
          <div className="mt-6 flex justify-center">
            <ContactCTAButtons size="lg" showLabels />
          </div>
        </div>
      </section>

      <CategoryIconStrip />

      <div className="container grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Included Services */}
          <h2 className="mb-4 text-2xl font-bold text-foreground">What's Included</h2>
          <div className="mb-10 grid gap-3 sm:grid-cols-2">
            {service.includes.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border bg-card p-3">
                <CheckCircle2 size={18} className="shrink-0 text-whatsapp" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          {/* FAQ */}
          {service.faqs.length > 0 && (
            <>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="rounded-xl border bg-card p-6">
                {service.faqs.map((faq) => (
                  <FAQItem key={faq.q} {...faq} />
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <div className="sticky top-20">
            <QuickBookingForm compact preselectedService={service.title} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
