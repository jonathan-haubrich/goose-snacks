// src/server/wsManager.ts
import WebSocket from 'ws';

let clients: Set<WebSocket>;

if(process.env.NODE_ENV === "production") {
    clients = new Set<WebSocket>();
} else {
    if(!(global as any).clients) {
        (global as any).clients = new Set<WebSocket>();
    }
    clients = (global as any).clients;
}

// Function to add new WebSocket clients
export function addClient(client: WebSocket) {
  console.log("addClient called: " + clients.size);
  clients.add(client);

  client.on('close', () => {
    console.log("Deleting client: " + client);
    clients.delete(client);
  });
}

// Function to broadcast vote updates to all WebSocket clients
export function broadcastVotesUpdate(productId: number) {
  console.log("broadcastVotesUpdate called: " + clients.size);
  clients.forEach((client) => {
    console.log("client.readyState: " + client.readyState);
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ productId }));
    }
  });
}
