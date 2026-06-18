import http from 'http';

function mcpRequest(body, sessionId) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
    };
    if (sessionId) headers['mcp-session-id'] = sessionId;
    const req = http.request({
      hostname: '127.0.0.1', port: 3845, path: '/mcp', method: 'POST', headers,
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  try {
    const init = await mcpRequest({
      jsonrpc: '2.0', id: 1, method: 'initialize',
      params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'node', version: '1' } },
    });
    console.log('init', init.status, init.data.slice(0, 500));
    const sid = init.headers['mcp-session-id'];
    const notif = await mcpRequest({ jsonrpc: '2.0', method: 'notifications/initialized' }, sid);
    console.log('notif', notif.status, notif.data.slice(0, 200));
    const tools = await mcpRequest({ jsonrpc: '2.0', id: 2, method: 'tools/list' }, sid);
    console.log('tools', tools.status, tools.data.slice(0, 2000));
  } catch (err) {
    console.error('MCP probe failed:', err);
    process.exit(1);
  }
})();
