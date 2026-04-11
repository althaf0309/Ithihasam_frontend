import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryIconStrip } from "@/components/CategoryIconStrip";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { ContactCTAButtons } from "@/components/ContactCTAButtons";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Zap, Paintbrush, Settings, Hammer, Factory, Sparkles, Bug, Cpu, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerAppliance from "@/assets/banner-appliance.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerFabrication from "@/assets/banner-fabrication.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerPest from "@/assets/banner-pest.jpg";
import bannerSmarthome from "@/assets/banner-smarthome.jpg";

const serviceData: Record<string, {
  title: string;
  description: string;
  icon: typeof Zap;
  bannerImages: string[];
  includes: string[];
  faqs: { q: string; a: string }[];
  reviews: { name: string; location: string; text: string; rating: number }[];
}> = {
  "electrical-plumbing": {
    title: "Electrical & Plumbing",
    description: "Complete electrical and plumbing solutions for your home. From wiring to pipe repairs, our verified professionals handle it all.",
    icon: Zap,
    bannerImages: [bannerElectrical, bannerAppliance, bannerSmarthome],
    includes: ["Wiring & Rewiring", "Switch & Socket Installation", "MCB & DB Box Repair", "Pipe Fitting & Repair", "Tap & Faucet Installation", "Water Tank Installation", "Geyser Installation", "Drainage Solutions"],
    faqs: [
      { q: "How quickly can I get an electrician?", a: "We typically dispatch a professional within 2 hours of booking." },
      { q: "Do you provide warranty on repairs?", a: "Yes, all repairs come with a 30-day service warranty." },
      { q: "Are your electricians licensed?", a: "All our professionals are verified, trained, and certified." },
      { q: "What areas do you cover?", a: "We cover all major cities and surrounding areas. Check our service areas page for details." },
      { q: "Do you handle emergency repairs?", a: "Yes, we offer 24/7 emergency electrical and plumbing services at a nominal extra charge." },
      { q: "What payment methods do you accept?", a: "We accept cash, UPI, credit/debit cards, and net banking." },
    ],
    reviews: [
      { name: "Rahul Mehta", location: "Mumbai", text: "Fixed my entire home wiring in just one day. Very professional team from Ithihasa!", rating: 5 },
      { name: "Sunita Patil", location: "Pune", text: "Quick response for a plumbing emergency at midnight. Lifesavers!", rating: 5 },
      { name: "Vikram Singh", location: "Delhi", text: "Fair pricing and excellent workmanship. Will definitely use again.", rating: 4 },
    ],
  },
  "painting": {
    title: "Painting Services",
    description: "Professional painting services for interior and exterior walls. We use premium paints and deliver flawless finishes.",
    icon: Paintbrush,
    bannerImages: [bannerPainting, bannerCarpentry, bannerCleaning],
    includes: ["Interior Wall Painting", "Exterior Wall Painting", "Texture Painting", "Wood Polishing", "Waterproofing Coating", "Color Consultation"],
    faqs: [
      { q: "Do you provide paint or should I buy?", a: "We can provide premium quality paint or use your preferred brand." },
      { q: "How long does a 2BHK take?", a: "Typically 3-5 days depending on the scope." },
      { q: "Do you move furniture before painting?", a: "Yes, our team handles furniture moving and covering as part of the service." },
      { q: "What brands of paint do you use?", a: "We work with Asian Paints, Berger, Nerolac, and other premium brands." },
      { q: "Is there a warranty on painting work?", a: "Yes, we provide a 1-year warranty on all painting services." },
    ],
    reviews: [
      { name: "Neha Sharma", location: "Bangalore", text: "Beautiful texture painting done on our living room walls. The team was very neat.", rating: 5 },
      { name: "Amit Joshi", location: "Hyderabad", text: "Excellent color consultation. The house looks brand new!", rating: 5 },
    ],
  },
  "appliance-servicing": {
    title: "Appliance Servicing",
    description: "Expert repair and maintenance for all home appliances including AC, washing machines, refrigerators, and more.",
    icon: Settings,
    bannerImages: [bannerAppliance, bannerElectrical, bannerSmarthome],
    includes: ["AC Service & Repair", "Washing Machine Repair", "Refrigerator Repair", "Microwave Repair", "Water Purifier Service", "Chimney Cleaning"],
    faqs: [
      { q: "Do you service all brands?", a: "Yes, our technicians are trained to service all major brands." },
      { q: "How much does AC servicing cost?", a: "Basic AC servicing starts from ₹499. Deep cleaning and gas refill are additional." },
      { q: "Do you carry spare parts?", a: "Our technicians carry common spare parts. For specific parts, we order within 24 hours." },
      { q: "Is there a diagnosis charge?", a: "We charge a minimal visit fee of ₹99, which is adjusted against the service bill." },
    ],
    reviews: [
      { name: "Priya Reddy", location: "Chennai", text: "AC was cooling perfectly after the service. Very knowledgeable technician.", rating: 5 },
      { name: "Karan Malhotra", location: "Gurgaon", text: "Fixed my washing machine on the spot. Great service!", rating: 4 },
    ],
  },
  "carpentry": {
    title: "Carpentry & Woodwork",
    description: "Custom furniture, repairs, and modular installations by experienced carpenters.",
    icon: Hammer,
    bannerImages: [bannerCarpentry, bannerPainting, bannerFabrication],
    includes: ["Custom Furniture", "Modular Kitchen", "Wardrobe Installation", "Door & Window Repair", "Bed & Sofa Repair", "Wood Polishing"],
    faqs: [
      { q: "Can you build custom furniture?", a: "Absolutely! We create custom pieces based on your design and requirements." },
      { q: "What wood types do you work with?", a: "We work with teak, sheesham, plywood, MDF, and particle board." },
      { q: "How long does a modular kitchen take?", a: "A standard modular kitchen installation takes 15-20 working days." },
      { q: "Do you provide design consultation?", a: "Yes, our designers will visit your home and provide free design consultation." },
    ],
    reviews: [
      { name: "Deepak Verma", location: "Noida", text: "Beautiful custom wardrobe built exactly as designed. Top quality wood.", rating: 5 },
      { name: "Ananya Iyer", location: "Mumbai", text: "Modular kitchen turned out amazing. Highly recommend Ithihasa carpentry.", rating: 5 },
    ],
  },
  "roofing-fabrication": {
    title: "Metal Fabrication & Roofing",
    description: "Durable gates, grills, roofing sheets, and structural metalwork by experienced fabricators.",
    icon: Factory,
    bannerImages: [bannerFabrication, bannerCarpentry, bannerElectrical],
    includes: ["MS/SS Gates & Grills", "Roofing Sheet Installation", "Railing Fabrication", "Shed Construction", "Welding Repairs", "Structural Steelwork"],
    faqs: [
      { q: "What materials do you use?", a: "We work with mild steel, stainless steel, and aluminum depending on your needs." },
      { q: "Do you provide on-site welding?", a: "Yes, our welders come equipped with portable welding machines." },
      { q: "Can you fabricate custom designs?", a: "We specialize in custom gate and grill designs tailored to your specifications." },
      { q: "What is the durability of your work?", a: "All our fabrication work comes with anti-rust treatment and 5-year structural warranty." },
    ],
    reviews: [
      { name: "Suresh Nair", location: "Kochi", text: "Installed a beautiful SS gate for our home. Excellent finish and sturdy construction.", rating: 5 },
      { name: "Manish Gupta", location: "Ahmedabad", text: "Roofing sheet installation was done within a day. Very professional.", rating: 4 },
    ],
  },
  "deep-cleaning": {
    title: "Deep Cleaning Services",
    description: "Comprehensive deep cleaning for homes and offices. We make every corner spotless.",
    icon: Sparkles,
    bannerImages: [bannerCleaning, bannerPainting, bannerAppliance],
    includes: ["Full Home Deep Clean", "Kitchen Deep Clean", "Bathroom Deep Clean", "Sofa & Carpet Cleaning", "Office Cleaning", "Post-Construction Cleaning"],
    faqs: [
      { q: "How long does a full home cleaning take?", a: "A 2BHK typically takes 4-6 hours." },
      { q: "What cleaning products do you use?", a: "We use eco-friendly, non-toxic cleaning products safe for kids and pets." },
      { q: "Do I need to be present during cleaning?", a: "It's not mandatory but we recommend being present for the first service." },
      { q: "How often should I deep clean?", a: "We recommend a professional deep clean every 3-4 months for optimal hygiene." },
      { q: "Do you clean behind appliances?", a: "Yes, we move and clean behind all appliances including fridge and washing machine." },
    ],
    reviews: [
      { name: "Kavitha Menon", location: "Bangalore", text: "My bathroom tiles are gleaming white again! Incredible deep cleaning team.", rating: 5 },
      { name: "Ravi Teja", location: "Hyderabad", text: "Post-construction cleaning was thorough. Saved us so much time.", rating: 5 },
      { name: "Simran Kaur", location: "Chandigarh", text: "Sofa looks brand new after their cleaning. Amazing results.", rating: 4 },
    ],
  },
  "pest-control": {
    title: "Pest Control",
    description: "Safe and effective pest control treatments for homes and offices.",
    icon: Bug,
    bannerImages: [bannerPest, bannerCleaning, bannerElectrical],
    includes: ["Cockroach Treatment", "Termite Treatment", "Bed Bug Treatment", "Mosquito Control", "Rodent Control", "General Pest Control"],
    faqs: [
      { q: "Is the treatment safe for children and pets?", a: "Yes, we use WHO-approved, low-toxicity chemicals that are safe after drying." },
      { q: "How long does the treatment last?", a: "Most treatments are effective for 3-6 months depending on the pest type." },
      { q: "Do I need to vacate during treatment?", a: "For most treatments, you can stay. For fumigation, we recommend vacating for 4-6 hours." },
      { q: "Do you provide annual maintenance contracts?", a: "Yes, our AMC plans cover quarterly treatments at discounted rates." },
    ],
    reviews: [
      { name: "Aditya Rao", location: "Pune", text: "No more cockroaches since the treatment 3 months ago. Excellent service!", rating: 5 },
      { name: "Meena Kumari", location: "Jaipur", text: "Termite treatment saved our wooden furniture. Very effective.", rating: 5 },
    ],
  },
  "smart-home": {
    title: "Smart Home Setup",
    description: "Transform your home with smart lighting, security cameras, and automated systems.",
    icon: Cpu,
    bannerImages: [bannerSmarthome, bannerElectrical, bannerAppliance],
    includes: ["Smart Lighting", "CCTV Installation", "Smart Lock Setup", "Home Automation", "Wi-Fi Setup", "Intercom Installation"],
    faqs: [
      { q: "Do you support all smart home brands?", a: "We work with Alexa, Google Home, Apple HomeKit, and most major smart home ecosystems." },
      { q: "Can you retrofit an old home?", a: "Yes, we can add smart features to any home without major rewiring." },
      { q: "How much does a basic setup cost?", a: "A basic smart lighting setup starts from ₹5,000. Full home automation varies by scope." },
      { q: "Do you provide after-sales support?", a: "Yes, we offer 6 months of free technical support and troubleshooting." },
    ],
    reviews: [
      { name: "Arjun Kapoor", location: "Delhi", text: "Love controlling everything from my phone now. Professional installation.", rating: 5 },
      { name: "Divya Nair", location: "Kochi", text: "CCTV and smart lock installation was seamless. Feel much safer now.", rating: 5 },
    ],
  },
};

function BannerCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-[320px] w-full overflow-hidden md:h-[420px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} banner`}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent" />
      <div className="absolute inset-0 flex items-end justify-center pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-extrabold text-primary-foreground drop-shadow-lg md:text-5xl"
        >
          {title}
        </motion.h1>
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur transition hover:bg-background/80">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur transition hover:bg-background/80">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-primary-foreground" : "w-2.5 bg-primary-foreground/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground"
        onClick={() => setOpen(!open)}
      >
        {q}
        <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
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
            <p className="pb-4 text-sm text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <BannerCarousel images={service.bannerImages} title={service.title} />

      <div className="flex justify-center -mt-5 relative z-10">
        <ContactCTAButtons size="lg" showLabels />
      </div>

      <CategoryIconStrip />

      <div className="container grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>

          {/* Included Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4 text-2xl font-bold text-foreground">What's Included</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.includes.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 rounded-lg border bg-card p-3 transition-shadow hover:shadow-[var(--card-shadow-hover)]"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-whatsapp" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          {service.faqs.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="rounded-xl border bg-card p-6">
                {service.faqs.map((faq) => (
                  <FAQItem key={faq.q} {...faq} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Reviews */}
          {service.reviews.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Customer Reviews</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {service.reviews.map((r) => (
                  <TestimonialCard key={r.name} {...r} />
                ))}
              </div>
            </motion.div>
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
