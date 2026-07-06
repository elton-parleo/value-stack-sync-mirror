import { defineMcp } from "@lovable.dev/mcp-js";
import listProtocolsTool from "./tools/list-protocols";
import listIntegrationsTool from "./tools/list-integrations";
import enrichProductTool from "./tools/enrich-product";

export default defineMcp({
  name: "parleo-mcp",
  title: "Parleo",
  version: "0.1.0",
  instructions:
    "Parleo is the incentive intelligence layer for agentic commerce. Use these tools to look up supported protocols and integrations, and to see a demo of true-cost enrichment (loyalty, card offers, effective price) for a product. Data returned by enrich_product is illustrative sample data, not live merchant pricing.",
  tools: [listProtocolsTool, listIntegrationsTool, enrichProductTool],
});
