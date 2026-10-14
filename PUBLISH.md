# Publish checklist (MCP Registry)

## Status snapshot

- Project: `/workspace/mcp-registry/seedance30-mcp`
- Local `/mcp` smoke test: **PASS** (initialize, tools/list, all 3 tools)
- `mcp-publisher validate`: **PASS**
- Preview deploy: `https://seedance30-mcp.hammerhead-driver.workers.dev/mcp`
  - Temporary Wrangler account; claim within ~60 minutes of deploy
  - Claim URL: https://dash.cloudflare.com/claim-preview?claimToken=iwiVy-l-oPBd8TVA_L9UrRPXHXygUF48ZcjIVfAhuOY
  - Datacenter curl hits Cloudflare **bot challenge** — not registry-ready until claimed or redeployed under a real account

## 1. Permanent Cloudflare deploy

```bash
cd /workspace/mcp-registry/seedance30-mcp
npx wrangler login          # browser OAuth
npm run deploy
# then edit server.json remotes[0].url to the permanent workers.dev /mcp URL
```

Or claim the preview account via the Claim URL above, then confirm bot challenge is gone.

## 2. GitHub public repo

`cursor-github` MCP has **no create_repository**; `gh` is not authenticated (401).

```bash
# Create https://github.com/mryangsd-netizen/seedance30-mcp (Public) in the browser
cd /workspace/mcp-registry/seedance30-mcp
git remote add origin https://github.com/mryangsd-netizen/seedance30-mcp.git
git push -u origin main
```

## 3. Registry publish (mcp-publisher 1.8.1 at ~/.local/bin)

```bash
export PATH="$HOME/.local/bin:$PATH"
cd /workspace/mcp-registry/seedance30-mcp
mcp-publisher validate
mcp-publisher login github   # prints device code — complete at https://github.com/login/device
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.mryangsd-netizen/seedance30"
```

Do not run `login github` unattended; it requires interactive browser approval.
