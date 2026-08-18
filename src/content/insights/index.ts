import auditLaunch from "./inside-the-agentic-value-audit";
import shareOfAlgorithm from "./share-of-algorithm";
import bestPrice from "./how-agents-pick-the-best-price";
import pricingRails from "./incentives-are-becoming-pricing-rails";
import newShelf from "./new-shelf-is-not-human";
import type { Post } from "./types";

export type { Post, Block, Category, Pillar, Leak, Faq } from "./types";

/** Newest first. Add each new article file here. */
export const posts: Post[] = [auditLaunch, shareOfAlgorithm, bestPrice, pricingRails, newShelf];


/** Publication order, oldest first. Drives the editorial index numbers. */
export const chronological: Post[] = [...posts].sort((a, b) => a.date.localeCompare(b.date));

/** 1-based publication number for a post (first ever published = 1). */
export const postNumber = (slug: string): number =>
  chronological.findIndex((p) => p.slug === slug) + 1;

export const getPost = (slug?: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
