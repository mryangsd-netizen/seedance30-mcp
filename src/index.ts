import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";

const PRODUCT_URL = "https://seedance30.com";
const PRICING_URL = "https://seedance30.com/#pricing";

function createServer() {
  const server = new McpServer({
    name: "seedance30",
    version: "1.0.0",
  });

  server.registerTool(
    "get_product_info",
    {
      description:
        "Return public product information for Seedance 3.0 at seedance30.com (informational only; does not generate video).",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text" as const,
          text: [
            "Seedance 3.0 AI Video Generator",
            `Website: ${PRODUCT_URL}`,
            "Operator: DREAMEGA LLC (per product site).",
            "",
            "Summary (from public site copy):",
            "Seedance 3.0 is an AI video platform focused on multi-shot storytelling with native audio,",
            "character consistency across shots, and text / image / keyframe / multimodal reference inputs.",
            "Claimed outputs include 1080p (standard) and up to 2K (Pro), MP4 export, multiple aspect ratios,",
            "and clip lengths commonly described as about 5–12 seconds.",
            "",
            "This MCP exposes informational tools only. It does not call paid generation APIs or create video.",
          ].join("\n"),
        },
      ],
    }),
  );

  server.registerTool(
    "get_pricing_url",
    {
      description:
        "Return the public pricing page URL for Seedance 3.0. Does not fetch live prices or create checkout.",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text" as const,
          text: [
            `Pricing URL: ${PRICING_URL}`,
            "Pricing is published on the Seedance 3.0 website (Starter / Pro / Scale style plans and credits).",
            "Open the URL for current amounts, credits, and terms. This tool does not quote prices as a contract.",
          ].join("\n"),
        },
      ],
    }),
  );

  server.registerTool(
    "list_capabilities",
    {
      description:
        "Honest summary of Seedance 3.0 capabilities described on the public site (text-to-video, image-to-video, audio). Informational only.",
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: "text" as const,
          text: [
            "Seedance 3.0 capabilities (public site summary; not an API guarantee):",
            "",
            "- Text-to-video: generate clips from prompts.",
            "- Image-to-video: use one or two reference images (e.g. open/close frames).",
            "- Audio: native audio generation and/or user-uploaded audio to guide visuals; lip-sync described for dialogue.",
            "- Multi-shot storytelling with character consistency across shots.",
            "- Resolutions: up to 1080p in standard mode; up to 2K in Pro mode (per site).",
            "- Aspect ratios listed on site include 16:9, 9:16, 4:3, 3:4, 21:9, 1:1.",
            "- Typical clip length described as 5–12 seconds; export as MP4.",
            "- Free trial credits for new users are advertised; paid plans unlock commercial rights / higher tiers.",
            "",
            `Source: ${PRODUCT_URL}`,
            "This MCP does not perform generation, billing, or account actions.",
          ].join("\n"),
        },
      ],
    }),
  );

  return server;
}

const mcpHandler = createMcpHandler(createServer, { route: "/mcp" });

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "") {
      return new Response(
        [
          "seedance30 MCP (informational)",
          "MCP endpoint: /mcp",
          "Tools: get_product_info, get_pricing_url, list_capabilities",
          "Website: https://seedance30.com",
        ].join("\n"),
        { headers: { "content-type": "text/plain; charset=utf-8" } },
      );
    }

    return mcpHandler(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
