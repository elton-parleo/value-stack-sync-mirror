import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const INTEGRATIONS = [
  { name: "MCP", category: "protocol", description: "Model Context Protocol" },
  { name: "OpenAPI", category: "protocol", description: "REST standard" },
  { name: "ACP", category: "protocol", description: "Agent Commerce Protocol" },
  { name: "AP2", category: "protocol", description: "Agent Payments Protocol" },
  { name: "UCP", category: "protocol", description: "Google Unified Commerce" },
  { name: "Visa TAP", category: "protocol", description: "Token Auth Protocol" },
  { name: "Shopify", category: "platform", description: "Commerce platform" },
  { name: "Stripe", category: "payments", description: "Payments" },
  { name: "Oracle", category: "enterprise", description: "Enterprise stack" },
];

export default defineTool({
  name: "list_integrations",
  title: "List Parleo integrations",
  description: "Return the merchant, protocol, and platform integrations Parleo supports. Optionally filter by category.",
  inputSchema: {
    category: z.enum(["protocol", "platform", "payments", "enterprise"]).optional().describe("Filter by integration category."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category ? INTEGRATIONS.filter((i) => i.category === category) : INTEGRATIONS;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { integrations: items },
    };
  },
});
