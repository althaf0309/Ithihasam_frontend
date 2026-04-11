import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroProfessionals from "@/assets/hero-professionals.jpg";
import { motion } from "framer-motion";

const WHATSAPP = "911234567890";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30">
      <div className="container grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Trusted by 10,000+ Homeowners
          </span>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Reliable Home Services at Your{" "}
            <span className="text-primary">Doorstep</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-muted-foreground">
            From electrical repairs to deep cleaning — book verified professionals in minutes.
            Fast, affordable, and hassle-free.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="#booking">
                Book Now <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground"
            >
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={heroProfessionals}
            alt="Home service professionals ready to help"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
