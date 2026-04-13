import { Zap, Paintbrush, Wrench, Hammer, Factory, Sparkles, Bug, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import bannerElectrical from "@/assets/banner-electrical.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerAppliance from "@/assets/banner-appliance.jpg";
import bannerCarpentry from "@/assets/banner-carpentry.jpg";
import bannerFabrication from "@/assets/banner-fabrication.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerPest from "@/assets/banner-pest.jpg";
import bannerSmarthome from "@/assets/banner-smarthome.jpg";

const categories = [
  { name: "Appliance Service", icon: Wrench, slug: "appliance-servicing", image: bannerAppliance, color: "from-emerald-500/20 to-teal-500/20" },
  { name: "Electrical & Plumbing", icon: Zap, slug: "electrical-plumbing", image: bannerElectrical, color: "from-amber-500/20 to-blue-500/20" },
  { name: "Painting", icon: Paintbrush, slug: "painting", image: bannerPainting, color: "from-sky-500/20 to-indigo-500/20" },
  { name: "Fabrication", icon: Factory, slug: "roofing-fabrication", image: bannerFabrication, color: "from-red-500/20 to-orange-500/20" },
  { name: "Deep Cleaning", icon: Sparkles, slug: "deep-cleaning", image: bannerCleaning, color: "from-cyan-500/20 to-blue-500/20" },
  { name: "Carpentry", icon: Hammer, slug: "carpentry", image: bannerCarpentry, color: "from-orange-500/20 to-amber-500/20" },
  { name: "Pest Control", icon: Bug, slug: "pest-control", image: bannerPest, color: "from-lime-500/20 to-green-500/20" },
  { name: "Smart Home", icon: Cpu, slug: "smart-home", image: bannerSmarthome, color: "from-violet-500/20 to-purple-500/20" },
];

export function CategoryIconStrip() {
  return (
    <section className="border-y border-border/50 bg-card/50 py-8">
      <div className="container">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/services/${cat.slug}`}
                className="group relative flex min-w-[120px] flex-col items-center gap-3 rounded-2xl border border-border/30 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-[var(--card-shadow-hover)]"
              >
                {/* Thumbnail image */}
                <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 transition-opacity group-hover:opacity-100`} />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[1px] transition-all group-hover:bg-background/10 group-hover:backdrop-blur-0">
                    <cat.icon size={18} className="text-primary-foreground drop-shadow-md transition-transform group-hover:scale-110" />
                  </div>
                </div>
                <span className="text-center text-xs font-semibold text-muted-foreground transition-colors group-hover:text-primary">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
