import AnimatedSection from "../AnimatedSection";

const merchants = [
  "Sephora", "Nike", "REI", "Backcountry", "Best Buy", "Amazon", "Target",
  "Ulta", "Home Depot", "Nordstrom", "Macy's", "Lululemon", "Apple", "Sony",
  "Dyson", "Patagonia", "Adidas",
];

const merchantDomains: Record<string, string> = {
  "Sephora": "sephora.com", "Nike": "nike.com", "REI": "rei.com", "Backcountry": "backcountry.com",
  "Best Buy": "bestbuy.com", "Amazon": "amazon.com", "Target": "target.com", "Ulta": "ulta.com",
  "Home Depot": "homedepot.com", "Nordstrom": "nordstrom.com", "Macy's": "macys.com",
  "Lululemon": "lululemon.com", "Apple": "apple.com", "Sony": "sony.com", "Dyson": "dyson.com",
  "Patagonia": "patagonia.com", "Adidas": "adidas.com",
};

const cardPartners = [
  { name: "Amex", domain: "americanexpress.com" },
  { name: "Visa", domain: "visa.com" },
  { name: "Chase", domain: "chase.com" },
];

const LogoPill = ({ name, domain }: { name: string; domain: string }) => (
  <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-[13px] font-bold text-foreground/80">
    <img
      src={`https://img.logo.dev/${domain}?token=pk_anonymous&size=60&format=png`}
      alt={name}
      className="h-4 opacity-70"
      style={{ filter: "grayscale(30%)" }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
    {name}
  </span>
);

const MerchantNetwork = () => (
  <AnimatedSection className="py-12 md:py-16">
    <div className="mx-auto max-w-content px-5 md:px-20">
      <div className="font-label mb-3 text-primary">The Network</div>
      <h2 className="font-heading text-[28px] text-foreground md:text-[40px]">
        38+ merchants and growing.
      </h2>
      <p className="mt-2 max-w-[520px] text-[15px] text-foreground/50">
        Loyalty programs, card offers, and incentive logic. Indexed, normalized, and refreshed hourly.
      </p>

      {/* Merchant grid */}
      <div className="mt-8 flex flex-wrap gap-3">
        {merchants.map((m) => (
          <LogoPill key={m} name={m} domain={merchantDomains[m]} />
        ))}
      </div>

      {/* Card partners */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase tracking-widest text-parleo-muted">Card Partners</span>
        <div className="flex gap-2">
          {cardPartners.map((c) => (
            <span key={c.name} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[13px] font-bold text-foreground/70">
              <img
                src={`https://img.logo.dev/${c.domain}?token=pk_anonymous&size=60&format=png`}
                alt={c.name}
                className="h-4 opacity-60"
                style={{ filter: "grayscale(30%)" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-6 text-[13px] text-parleo-muted">
        + expanding to 100+ merchants across beauty, outdoor, electronics, home, and fashion
      </p>
    </div>
  </AnimatedSection>
);

export default MerchantNetwork;
