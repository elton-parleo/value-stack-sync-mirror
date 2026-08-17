import bestPrice from "./how-agents-pick-the-best-price";
import pricingRails from "./incentives-are-becoming-pricing-rails";
import newShelf from "./new-shelf-is-not-human";
import type { Post } from "./types";

export type { Post, Block, Category } from "./types";

/** Newest first. Add each new article file here. */
export const posts: Post[] = [bestPrice, pricingRails, newShelf];

export const getPost = (slug?: string): Post | undefined =>
  posts.find((p) => p.slug === slug);
