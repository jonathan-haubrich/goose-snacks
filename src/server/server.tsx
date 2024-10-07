import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import next, { NextApiHandler } from 'next';
import { parse } from 'url';
import { IncomingMessage, ServerResponse } from 'http'; // Use Node.js types
import { addClient } from '../lib/clientManager.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev }); // Ensure next() is called properly
const handle = app.getRequestHandler(); // Explicitly type handle
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const expressApp = express();

  const server = createServer(expressApp);

  // Create a WebSocket Server
  const wss = new WebSocketServer({ noServer: true });

  // WebSocket connection handling
  wss.on('connection', (ws) => {

    ws.on('close', () => {
    });
  });

  // Upgrade HTTP connection to WebSocket on /wss route
  server.on('upgrade', (req, socket, head) => {
    const parsedUrl = parse(req.url || '', true);
    if (parsedUrl.pathname === '/wss') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
        addClient(ws);
      });
    } else {
      socket.destroy();
    }
  });

  // Handle all other Next.js requests
  expressApp.all('*', (req: IncomingMessage, res: ServerResponse) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
