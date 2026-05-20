const domainMap: Record<string, string> = {
  // Protocols / Tech
  "Anthropic": "anthropic.com",
  "MCP": "anthropic.com",
  "Stripe": "stripe.com",
  "ACP": "stripe.com",
  "OpenAI": "openai.com",
  "OpenAPI": "openai.com",
  "Google": "google.com",
  "UCP": "google.com",
  "AP2": "google.com",
  "Visa": "visa.com",
  "Visa TAP": "visa.com",
  "Shopify": "shopify.com",
  "Oracle": "oracle.com",
  "ChatGPT": "openai.com",
  "Claude": "anthropic.com",
  "Perplexity": "perplexity.ai",
  // Merchants
  "Sephora": "sephora.com",
  "Ulta": "ulta.com",
  "Target": "target.com",
  "Nordstrom": "nordstrom.com",
  "Nike": "nike.com",
  "REI": "rei.com",
  "Backcountry": "backcountry.com",
  "Best Buy": "bestbuy.com",
  "Amazon": "amazon.com",
  "Sony": "sony.com",
  "Kohl's": "kohls.com",
  "Home Depot": "homedepot.com",
  "Macy's": "macys.com",
  "Lululemon": "lululemon.com",
  "Apple": "apple.com",
  "Dyson": "dyson.com",
  "Patagonia": "patagonia.com",
  "Adidas": "adidas.com",
  // Cards
  "Amex": "americanexpress.com",
  "Chase": "chase.com",
};

interface BrandLogoProps {
  name: string;
  domain?: string;
  size?: number;
  className?: string;
  grayscale?: boolean;
}

const BrandLogo = ({ name, domain, size = 16, className = "", grayscale = false }: BrandLogoProps) => {
  const d = domain || domainMap[name];
  if (!d) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${d}&sz=${size > 20 ? 64 : 32}`}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`shrink-0 rounded-sm ${grayscale ? "opacity-70" : ""} ${className}`}
      style={grayscale ? { filter: "grayscale(30%)" } : undefined}
      loading="lazy"
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
};

export default BrandLogo;
