const http = require("http");
const fs = require("fs");
const path = require("path");

function parseSse(data) {
  const line = data.split("\n").find((l) => l.startsWith("data: "));
  if (!line) return null;
  return JSON.parse(line.slice(6));
}

function mcpRequest(body, sessionId) {
  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    };
    if (sessionId) headers["mcp-session-id"] = sessionId;
    const req = http.request(
      { hostname: "127.0.0.1", port: 3845, path: "/mcp", method: "POST", headers },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, parsed: parseSse(data), raw: data }));
      },
    );
    req.on("error", reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  const init = await mcpRequest({
    jsonrpc: "2.0", id: 1, method: "initialize",
    params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "node", version: "1" } },
  });
  const sid = init.headers["mcp-session-id"];
  await mcpRequest({ jsonrpc: "2.0", method: "notifications/initialized" }, sid);
  const outDir = "c:/Users/akash/OneDrive/Desktop/Layer/layer-landing/scripts/bg-chunks";
  const call = await mcpRequest({
    jsonrpc: "2.0", id: 3, method: "tools/call",
    params: {
      name: "get_design_context",
      arguments: {
        nodeId: "1091:5993",
        clientLanguages: "typescript",
        clientFrameworks: "react",
        dirForAssetWrites: outDir,
      },
    },
  }, sid);
  const r = call.parsed;
  if (r?.result?.content) {
    for (const c of r.result.content) {
      if (c.type === "text") console.log(c.text.slice(0, 2500));
    }
  } else console.log(call.raw.slice(0, 1500));
  const files = fs.readdirSync(outDir);
  console.log("chunk count", files.length);
  for (const f of files) {
    const st = fs.statSync(path.join(outDir, f));
    console.log(f, st.size);
  }
})();
