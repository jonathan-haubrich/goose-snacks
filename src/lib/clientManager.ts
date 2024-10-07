// src/server/wsManager.ts
import WebSocket from 'ws';

if(!(global as any).clients) {
    (global as any).clients = new Set<WebSocket>();
}

// Function to add new WebSocket clients
export function addClient(client: WebSocket) {
    (global as any).clients.add(client);
  console.log("Adding client: " + (global as any).clients.size);

  client.on('close', () => {
    (global as any).clients.delete(client);
  });
}

// Function to broadcast vote updates to all WebSocket clients
export function broadcastVotesUpdate(productId: number) {
  console.log("Broadcasting votes!");
  (global as any).clients.forEach((client: WebSocket) => {
    console.log("Client: " + client);
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ productId }));
    }
  });
}
