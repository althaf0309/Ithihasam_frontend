import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getLocalizedText, serviceCatalog } from "@/lib/service-catalog";
import { useLang } from "@/contexts/LangContext";

const colorPairs = [
  "from-emerald-500/20 to-teal-500/20",
  "from-amber-500/20 to-blue-500/20",
  "from-sky-500/20 to-indigo-500/20",
  "from-red-500/20 to-orange-500/20",
  "from-cyan-500/20 to-blue-500/20",
  "from-orange-500/20 to-amber-500/20",
  "from-lime-500/20 to-green-500/20",
  "from-violet-500/20 to-purple-500/20",
];

export function CategoryIconStrip() {
  const { lang } = useLang();

  return (
    <section className="border-y border-border/50 bg-card/50 py-8">
      <div className="container">
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
          {serviceCatalog.map((service, index) => (
            <motion.div
              key={service.slug}
              className="flex"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group relative flex h-[118px] w-[152px] min-w-[152px] flex-col items-center justify-center gap-2.5 rounded-xl border border-border/30 bg-card px-3 py-3.5 transition-all hover:border-primary/40 hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                  <img
                    src={service.cardImage}
                    alt={getLocalizedText(service.title, lang)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorPairs[index % colorPairs.length]} opacity-0 transition-opacity group-hover:opacity-100`} />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/25 backdrop-blur-[1px] transition-all group-hover:bg-background/10 group-hover:backdrop-blur-0">
                    <service.icon size={22} className="text-primary-foreground drop-shadow-md transition-transform group-hover:scale-110" />
                  </div>
                </div>
                <span className="min-h-[2.15rem] max-w-[122px] text-center text-[11px] font-semibold leading-[1.15rem] text-muted-foreground transition-colors group-hover:text-primary">
                  {getLocalizedText(service.title, lang)}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
