import { ArrowRight, MessageCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroProfessionals from "@/assets/hero-professionals.jpg";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

const WHATSAPP = "911234567890";

export function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroProfessionals} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-secondary/10 blur-[80px]" />

      <div className="container relative grid items-center gap-8 py-20 md:grid-cols-2 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            {t("hero.badge")}
          </motion.span>

          <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-gradient">{t("hero.title1")}</span>
            <br />
            <span className="text-foreground">{t("hero.title2")}</span>
          </h1>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40">
              <a href="#booking">
                {t("nav.bookNow")} <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-whatsapp/50 text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground"
            >
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="mr-2" />
                {t("hero.whatsapp")}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Professionals" },
              { value: "15+", label: "Cities" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="text-2xl font-extrabold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden md:flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
            <img
              src={heroProfessionals}
              alt="Home service professionals ready to help"
              className="relative w-full max-w-md rounded-2xl border border-border/50 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
