import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "enrich_product",
  title: "Enrich product with true cost",
  description:
    "Demo of Parleo's incentive intelligence layer. Given a merchant and product context, returns a mock true-cost breakdown (loyalty, card offers, effective price). Uses deterministic sample data — not live merchant pricing.",
  inputSchema: {
    merchant_id: z.string().describe("Merchant identifier, e.g. 'nike_us', 'sephora_us'."),
    product_sku: z.string().describe("Product SKU or identifier."),
    list_price: z.number().positive().describe("Advertised list price in USD."),
    card_signal: z.string().optional().describe("Optional card context, e.g. 'amex_plat', 'chase_sapphire'."),
    loyalty_tier: z.string().optional().describe("Optional loyalty tier, e.g. 'vip', 'gold'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ merchant_id, product_sku, list_price, card_signal, loyalty_tier }) => {
    const incentives: Array<{ source: string; label: string; amount: number }> = [];
    if (loyalty_tier) incentives.push({ source: "loyalty", label: `${loyalty_tier} tier reward`, amount: -Math.round(list_price * 0.1 * 100) / 100 });
    if (card_signal) incentives.push({ source: "card", label: `${card_signal} statement credit`, amount: -20 });
    incentives.push({ source: "merchant", label: "Base promo", amount: -Math.round(list_price * 0.05 * 100) / 100 });

    const discount = incentives.reduce((sum, i) => sum + i.amount, 0);
    const true_cost = Math.max(0, Math.round((list_price + discount) * 100) / 100);

    const result = {
      merchant_id,
      product_sku,
      list_price,
      incentives,
      true_cost,
      currency: "USD",
      pii: false,
      latency_ms: 48,
      note: "Demo response with sample incentive logic.",
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
