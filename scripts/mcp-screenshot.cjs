const http = require("http");

function parseSse(data) {
  const line = data.split("\n").find((l) => l.startsWith("data: "));
  if (!line) return null;
  try {
    return JSON.parse(line.slice(6));
  } catch (err) {
    console.error("Failed to parse SSE JSON:", err.message);
    return null;
  }
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
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, parsed: parseSse(data), rawLen: data.length }));
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
  const call = await mcpRequest({
    jsonrpc: "2.0", id: 3, method: "tools/call",
    params: { name: "get_screenshot", arguments: { nodeId: "1091:5993" } },
  }, sid);
  const r = call.parsed;
  console.log("rawLen", call.rawLen);
  if (r?.result?.content) {
    for (const c of r.result.content) {
      console.log("type", c.type, "len", c.text?.length || c.data?.length || 0, "mime", c.mimeType);
    }
  } else if (r?.error) console.log(JSON.stringify(r.error));
})();
