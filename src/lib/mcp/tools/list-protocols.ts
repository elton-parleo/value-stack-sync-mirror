import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const PROTOCOLS = [
  { id: "mcp", name: "Anthropic MCP", description: "Model Context Protocol for tool-using assistants." },
  { id: "acp", name: "Stripe ACP", description: "Agent Commerce Protocol for agent checkout." },
  { id: "ap2", name: "Google AP2", description: "Agent Payments Protocol." },
  { id: "ucp", name: "Google UCP", description: "Unified Commerce Protocol." },
  { id: "tap", name: "Visa TAP", description: "Token Auth Protocol for card credentials." },
  { id: "openapi", name: "OpenAPI", description: "REST-standard integration surface." },
];

export default defineTool({
  name: "list_supported_protocols",
  title: "List supported protocols",
  description: "Return the agentic-commerce protocols Parleo ships on (MCP, ACP, AP2, UCP, TAP, OpenAPI).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(PROTOCOLS, null, 2) }],
    structuredContent: { protocols: PROTOCOLS },
  }),
});
