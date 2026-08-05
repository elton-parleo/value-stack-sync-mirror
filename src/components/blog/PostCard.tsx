import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Post, formatDate, readingTime } from "@/content/blog/posts";

type Props = {
  post: Post;
  index?: number;
  variant?: "grid" | "row";
};

const PostCard = ({ post, index = 0, variant = "grid" }: Props) => {
  if (variant === "row") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      >
        <Link
          to={`/blog/${post.slug}`}
          className="group flex items-start gap-5 border-b border-border py-5 transition-colors hover:border-primary/25"
        >
          <div className="hidden h-[74px] w-[110px] shrink-0 overflow-hidden rounded-md bg-secondary sm:block">
            <img
              src={post.cover}
              alt={post.coverAlt}
              loading="lazy"
              className="img-editorial h-full w-full object-cover grayscale-[0.15] group-hover:grayscale-0"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-foreground/40">
              <span className="text-primary">{post.category}</span>
              <span className="h-px w-3 bg-border" />
              <span>{readingTime(post)} min</span>
            </div>
            <h3 className="mt-1.5 text-[17px] font-semibold leading-tight tracking-[-0.02em] text-foreground">
              <span className="link-reveal">{post.title}</span>
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[14px] leading-[1.55] text-foreground/55">
              {post.dek}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/25 hover:shadow-card-hover"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={post.cover}
            alt={post.coverAlt}
            loading="lazy"
            className="img-editorial h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0"
          />
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.1em] text-foreground/70 backdrop-blur-sm">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-[18px] font-semibold leading-[1.2] tracking-[-0.022em] text-foreground">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.55] text-foreground/58">
            {post.dek}
          </p>
          <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-[11.5px] text-foreground/45">
            <span className="font-medium text-foreground/65">{post.author.name}</span>
            <span className="h-px w-3 bg-border" />
            <span>{formatDate(post.date)}</span>
            <span className="ml-auto tabular-nums">{readingTime(post)} min</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
