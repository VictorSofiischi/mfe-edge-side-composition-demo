import express from "express";
import dotenv from "dotenv";
import http from "http";
import httpProxy from "http-proxy";

dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);
const wsProxy = httpProxy.createProxyServer({ ws: true, changeOrigin: true, xfwd: true });

const PORT = 3000;
const JURISDICTION = process.env.JURISDICTION || "jurisdiction1";

const jurisdictionHosts = {
  jurisdiction1: "http://localhost:3001",
  jurisdiction2: "http://localhost:3002",
};
const sharedHost = "http://localhost:3003";
const primaryHost = jurisdictionHosts[JURISDICTION];

console.log(`Gateway ready at http://localhost:${PORT}`);
console.log(`Primary: ${primaryHost}, Shared: ${sharedHost}`);

// ---------- HELPERS ----------
async function fetchAndForward(url, req, res) {
  const response = await fetch(url, { method: req.method, headers: req.headers });
  const body = await response.arrayBuffer();

  // Forward headers except content-encoding
  response.headers.forEach((value, key) => {
    key = key.toLowerCase();
    if (!["transfer-encoding", "connection", "content-encoding"].includes(key)) {
      res.setHeader(key, value);
    }
  });

  // Mark which remote served this
  res.setHeader("X-Served-By", url.includes(primaryHost) ? JURISDICTION : "shared");

  res.status(response.status).send(Buffer.from(body));
}

// ---------- ROUTE HANDLER ----------
app.use(async (req, res) => {
  const urlPath = req.url;

  // Dev / static assets or built JS/CSS
  if (
    urlPath.startsWith("/node_modules/") ||
    urlPath.startsWith("/src/") ||
    urlPath.startsWith("/@vite/") ||
    urlPath.endsWith(".js") ||
    urlPath.endsWith(".css") ||
    urlPath.endsWith(".map")
  ) {
    // Try to guess origin from referer header
    const referer = req.headers.referer || "";
    const host = referer.includes(sharedHost) ? sharedHost : primaryHost;
    const assetUrl = `${host}${urlPath}`;
    return fetchAndForward(assetUrl, req, res);
  }

  try {
    // Try primary first
    let response = await fetch(`${primaryHost}${urlPath}`, { method: req.method, headers: req.headers });

    // Fallback to shared if 404
    if (response.status === 404) {
      console.log(`Primary returned 404, trying shared: ${urlPath}`);
      response = await fetch(`${sharedHost}${urlPath}`, { method: req.method, headers: req.headers });
    }

    const body = await response.arrayBuffer();

    // Forward headers except content-encoding
    response.headers.forEach((value, key) => {
      key = key.toLowerCase();
      if (!["transfer-encoding", "connection", "content-encoding"].includes(key)) {
        res.setHeader(key, value);
      }
    });

    res.setHeader("X-Served-By", response.url.includes(primaryHost) ? JURISDICTION : "shared");
    res.status(response.status).send(Buffer.from(body));
  } catch (err) {
    console.error("Gateway fetch error:", err);
    res.status(502).send(`
      <html>
        <body>
          <h1>502 - Bad Gateway</h1>
          <p>${err}</p>
        </body>
      </html>
    `);
  }
});

// ---------- WEBSOCKET HMR ----------
server.on("upgrade", (req, socket, head) => {
  wsProxy.ws(req, socket, head, { target: primaryHost }, (err) => {
    if (err) {
      console.log(`WS fallback → shared for ${req.url}`);
      wsProxy.ws(req, socket, head, { target: sharedHost });
    }
  });
});

server.listen(PORT, () => console.log(`✅ Gateway running at http://localhost:${PORT}`));
