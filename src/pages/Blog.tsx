import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import blogHeader from "@/assets/blog-header.jpg";
import bannerPainting from "@/assets/banner-painting.jpg";
import bannerCleaning from "@/assets/banner-cleaning.jpg";
import bannerSmarthome from "@/assets/banner-smarthome.jpg";

export const blogPosts = [
  {
    slug: "top-5-home-maintenance-tips",
    title: "Top 5 Home Maintenance Tips Every Homeowner Should Know",
    excerpt: "Regular home maintenance prevents costly repairs. Here are 5 essential tips to keep your home in top shape year-round.",
    image: blogHeader,
    author: "Ithihasa Team",
    date: "2026-04-05",
    category: "Home Tips",
    content: `
## 1. Schedule Regular HVAC Maintenance
Your heating and cooling system works hard year-round. Schedule professional servicing at least twice a year to keep it running efficiently and extend its lifespan.

## 2. Check for Water Leaks Monthly
A small leak can lead to major damage. Inspect under sinks, around toilets, and near water heaters monthly. Early detection saves thousands in repairs.

## 3. Clean Gutters and Drains
Clogged gutters cause water damage to your roof and foundation. Clean them at least twice a year, especially before monsoon season.

## 4. Test Smoke Detectors and Electrical Safety
Replace batteries in smoke detectors annually. Check for frayed wires, overloaded circuits, and ensure your MCB panel is functioning properly.

## 5. Repaint and Seal Exterior Surfaces
Exterior paint does more than look good — it protects your home from weather damage. Touch up peeling areas and reseal windows and doors annually.

## Conclusion
A little preventive maintenance goes a long way. Book Ithihasa's annual home maintenance package for peace of mind!
    `,
  },
  {
    slug: "choosing-right-paint-colors",
    title: "How to Choose the Right Paint Colors for Your Home",
    excerpt: "Selecting paint colors can be overwhelming. Our expert guide helps you pick the perfect palette for every room.",
    image: bannerPainting,
    author: "Design Team",
    date: "2026-03-28",
    category: "Painting",
    content: `
## Understanding Color Psychology
Colors affect mood and energy. Cool blues and greens create calm spaces perfect for bedrooms, while warm yellows and oranges energize kitchens and living areas.

## Consider Natural Light
Rooms with lots of natural light can handle darker shades. North-facing rooms benefit from warm tones to counteract cool light.

## The 60-30-10 Rule
Use 60% dominant color (walls), 30% secondary color (furniture, curtains), and 10% accent color (decor, pillows) for a balanced look.

## Test Before You Commit
Always test paint samples on your actual walls. Colors look different under your home's specific lighting conditions.

## Popular Trends for 2026
Earth tones, sage greens, and warm terracotta are trending this year. Matte finishes continue to be popular for living spaces.

## Need Help Deciding?
Book a free color consultation with Ithihasa's painting experts!
    `,
  },
  {
    slug: "smart-home-beginners-guide",
    title: "Smart Home Setup: A Beginner's Complete Guide",
    excerpt: "Transform your home with smart technology. From lighting to security, here's everything you need to know to get started.",
    image: bannerSmarthome,
    author: "Tech Team",
    date: "2026-03-15",
    category: "Smart Home",
    content: `
## What is a Smart Home?
A smart home uses internet-connected devices to allow remote management of appliances, lighting, security, and temperature.

## Start with Smart Lighting
Smart bulbs are the easiest entry point. Control brightness, color, and schedules from your phone or voice assistant.

## Add Security Next
Smart locks, video doorbells, and CCTV cameras provide peace of mind. Most systems send real-time alerts to your phone.

## Voice Assistants
Amazon Alexa or Google Home acts as the brain of your smart home. They connect and control all your devices.

## Wi-Fi is Key
A strong, reliable Wi-Fi network is essential. Consider mesh routers for larger homes to ensure coverage everywhere.

## Professional Installation Matters
While some devices are DIY-friendly, professional installation ensures proper wiring, optimal camera placement, and seamless integration.

Book Ithihasa's smart home setup service for a hassle-free experience!
    `,
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary py-16">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl font-bold text-primary-foreground md:text-4xl"
          >
            Blog & Tips
          </motion.h1>
          <p className="text-primary-foreground/80">Expert advice and home improvement tips from Ithihasa</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group overflow-hidden rounded-xl border bg-card shadow-[var(--card-shadow)] transition-shadow hover:shadow-[var(--card-shadow-hover)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
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
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground line-clamp-2">{post.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
