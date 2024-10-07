import WebSocket from 'ws';

declare global {
  namespace NodeJS {
    interface Global {
      clients: Set<WebSocket>;
    }
  }
}
  
export {};