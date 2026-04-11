import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/contexts/LangContext";
import { useState, useEffect, useCallback, useRef } from "react";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerAppliance from "@/assets/banner-appliance.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerSmarthome from "@/assets/banner-smarthome.jpg";

const WHATSAPP = "911234567890";

const slides = [
  {
    image: bannerElectrical,
    title: "Expert Electrical & Plumbing",
    subtitle: "Certified professionals for all your home needs",
  },
  {
    image: bannerPainting,
    title: "Transform Your Space",
    subtitle: "Premium painting services with flawless finishes",
  },
  {
    image: bannerAppliance,
    title: "Appliance Care Experts",
    subtitle: "AC, washing machine & refrigerator servicing",
  },
  {
    image: bannerCarpentry,
    title: "Custom Carpentry & Woodwork",
    subtitle: "Furniture, modular kitchens & expert repairs",
  },
  {
    image: bannerCleaning,
    title: "Deep Cleaning Services",
    subtitle: "Make every corner of your home spotless",
  },
  {
    image: bannerSmarthome,
    title: "Smart Home Setup",
    subtitle: "Automate your home with latest technology",
  },
];

export function HeroSection() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section ref={sectionRef} className="relative h-[520px] overflow-hidden md:h-[620px]">
      {/* Background carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-[-15%]"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeOut" },
              scale: { duration: 8, ease: "linear" },
            }}
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />

      {/* Glows */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-secondary/8 blur-[100px]" />

      {/* Content */}
      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            {t("hero.badge")}
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mb-3 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                <span className="text-gradient">{slides[current].title}</span>
              </h1>
              <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                {slides[current].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40">
              <a href="#booking">
                {t("nav.bookNow")} <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-whatsapp/50 bg-whatsapp/10 text-whatsapp backdrop-blur-sm hover:bg-whatsapp hover:text-whatsapp-foreground"
            >
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="mr-2" />
                {t("hero.whatsapp")}
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex gap-8"
          >
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Professionals" },
              { value: "15+", label: "Cities" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-10 bg-primary"
                : "w-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
