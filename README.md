# seedance30-mcp

Public remote MCP server for [Seedance 3.0](https://seedance30.com) (informational tools only).

Registry name: `io.github.mryangsd-netizen/seedance30`

## Endpoint

Streamable HTTP: `https://<worker>.workers.dev/mcp` (set after deploy)

## Tools

| Tool | Purpose |
|------|---------|
| `get_product_info` | Public product summary + https://seedance30.com |
| `get_pricing_url` | Pricing URL on the product site |
| `list_capabilities` | Honest text/image-to-video capability summary |

No paid video generation is performed by this server.

## Develop

```bash
npm install
npm run dev
# MCP at http://127.0.0.1:8787/mcp
```

## Deploy

```bash
npx wrangler login   # once
npm run deploy
```

## MCP Registry

See `server.json`. Publish with:

```bash
mcp-publisher login github
mcp-publisher publish
```
