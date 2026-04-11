import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { blogPosts } from "./Blog";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary underline">Back to Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="relative h-[300px] overflow-hidden md:h-[400px]">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-8">
            <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{post.category}</span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-primary-foreground md:text-4xl">
              {post.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-10">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
        <article className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
          {post.content.split("\n").map((line, i) => {
            const trimmed = line.trim();
            if (trimmed.startsWith("## ")) return <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">{trimmed.replace("## ", "")}</h2>;
            if (trimmed === "") return null;
            return <p key={i} className="mb-3 leading-relaxed text-muted-foreground">{trimmed}</p>;
          })}
        </article>
      </div>

      <Footer />
    </div>
  );
}
