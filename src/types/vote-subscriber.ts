class VoteSubscriber {
  url: string;
  socket: WebSocket;
  handler: (data: any) => Promise<void>;

  constructor(url: string, handler: (data: any) => Promise<void>) {
    this.url = url;
    this.socket = new WebSocket(this.url);
    this.handler = handler;

    this.socket.onopen = () => {
        console.log('Connected to WebSocket');
    };

    this.socket.onmessage = async (event) => {
        const data = JSON.parse(event.data.toString());
        console.log("WebSocket got message: " + data);
        await this.handler(data);
    };

    this.socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

  }

  close() {
    console.log("WebSocket closed");
    this.socket.close();
  }
}

export default VoteSubscriber;
