import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoMeta } from "@/components/SeoMeta";
import { fetchBlogPosts } from "@/lib/api";
import { resolveContentImage } from "@/lib/content-images";
import { createKeywordSet } from "@/lib/seo";
import { useLang } from "@/contexts/LangContext";

export default function Blog() {
  const { formatDate, t } = useLang();
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });
  const pageKeywords = createKeywordSet(
    "Ithihasam blog",
    "home maintenance blog Kannur",
    "home maintenance blog Thrissur",
    "electrical and plumbing tips",
    "house painting ideas Kerala",
    "appliance servicing tips",
    "deep cleaning checklist",
    "pest control tips",
  );

  return (
    <div className="min-h-screen bg-background">
      <SeoMeta
        title="Ithihasam Blog | Home Maintenance Tips for Kannur & Thrissur"
        description="Read Ithihasam blog articles on home maintenance, electrical work, plumbing, painting, appliance repair, cleaning, pest control, and smart home services in Kannur and Thrissur."
        keywords={pageKeywords}
        image={posts?.[0] ? resolveContentImage(posts[0].cover_image) : undefined}
      />
      <Header />

      <section className="bg-primary py-16">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl"
          >
            {t("blog.title")}
          </motion.h1>
          <p className="text-primary-foreground/80">{t("blog.subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {isLoading && <p className="text-sm text-muted-foreground">{t("blog.loading")}</p>}
          {isError && <p className="text-sm text-destructive">{t("blog.error")}</p>}

          {!isLoading && !isError && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {(posts || []).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group overflow-hidden rounded-xl border bg-card shadow-[var(--card-shadow)] transition-shadow hover:shadow-[var(--card-shadow-hover)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resolveContentImage(post.cover_image)}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User size={12} /> {post.author_name}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.published_at)}</span>
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground">{post.title}</h3>
                    <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    <p className="mb-4 text-xs text-muted-foreground">{post.read_time_minutes} {t("blog.readTime")}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      {t("blog.readMore")} <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
