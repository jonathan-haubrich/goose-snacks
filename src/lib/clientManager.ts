// src/server/wsManager.ts
import WebSocket from 'ws';

let clients: Set<WebSocket>;

if(process.env.NODE_ENV === "production") {
    console.log("Production");
    clients = new Set<WebSocket>();
} else {
    console.log("Development");
    if(!(global as any).clients) {
        (global as any).clients = new Set<WebSocket>();
    }
    clients = (global as any).clients;
}

// Function to add new WebSocket clients
export function addClient(client: WebSocket) {
  clients.add(client);
  console.log("Adding client: " + clients.size);

  client.on('close', () => {
    clients.delete(client);
  });
}

// Function to broadcast vote updates to all WebSocket clients
export function broadcastVotesUpdate(productId: number) {
    console.log("Broadcasting votes!");
  clients.forEach((client) => {
    console.log("Client: " + client);
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ productId }));
    }
  });
}
