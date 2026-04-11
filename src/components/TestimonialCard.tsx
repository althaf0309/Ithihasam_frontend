import { Star } from "lucide-react";

interface Props {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export function TestimonialCard({ name, location, text, rating }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-[var(--card-shadow)]">
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-secondary text-secondary" : "text-border"}
          />
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{text}"</p>
      <div>
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
      </div>
    </div>
  );
}
