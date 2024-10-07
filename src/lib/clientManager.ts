// src/server/wsManager.ts
import WebSocket from 'ws';

if(!(global as any).clients) {
    (global as any).clients = new Set<WebSocket>();
}

// Function to add new WebSocket clients
export function addClient(client: WebSocket) {
    (global as any).clients.add(client);

  client.on('close', () => {
    (global as any).clients.delete(client);
  });
}

// Function to broadcast vote updates to all WebSocket clients
export function broadcastVotesUpdate(productId: number) {
  (global as any).clients.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ productId }));
    }
  });
}
