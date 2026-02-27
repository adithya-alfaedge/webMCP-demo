// WebMCP Proxy Server — zero npm installs, pure Node.js built-ins
// Supports: Anthropic Claude + OpenAI GPT
// Usage: node server.js  →  open http://localhost:3000

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const PORT = 3000;

function proxyRequest({ hostname, urlPath, headers }, body, res) {
  const options = { hostname, path: urlPath, method: 'POST', headers };
  const proxyReq = https.request(options, proxyRes => {
    res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
    proxyRes.pipe(res);
  });
  proxyReq.on('error', err => {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
  });
  proxyReq.write(body);
  proxyReq.end();
}

const server = http.createServer((req, res) => {

  // CORS headers on every response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-provider');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // Proxy: POST /api/messages  (Anthropic OR OpenAI)
  if (req.method === 'POST' && req.url === '/api/messages') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const apiKey   = req.headers['x-api-key'];
      const provider = req.headers['x-provider'] || 'anthropic';

      if (!apiKey) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing x-api-key header' })); return;
      }

      if (provider === 'openai') {
        proxyRequest({
          hostname: 'api.openai.com',
          urlPath:  '/v1/chat/completions',
          headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${apiKey}`,
          }
        }, body, res);
      } else {
        proxyRequest({
          hostname: 'api.anthropic.com',
          urlPath:  '/v1/messages',
          headers: {
            'Content-Type':      'application/json',
            'anthropic-version': '2023-06-01',
            'x-api-key':         apiKey,
          }
        }, body, res);
      }
    });
    return;
  }

  // Static: serve webmcp-playground.html at /
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const filePath = path.join(__dirname, 'webmcp-playground.html');
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Put webmcp-playground.html in the same folder as server.js');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => {
  console.log('\n  WebMCP Proxy  http://localhost:' + PORT);
  console.log('  Providers: Anthropic (claude-sonnet-4) + OpenAI (gpt-4o)\n');
});
