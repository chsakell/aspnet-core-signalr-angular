/* SignalR related interfaces  */
export interface FeedSignalR extends SignalR {
    broadcaster: FeedProxy
}

export interface FeedProxy {
    client: FeedClient
}

export interface FeedClient {
    userConnected: (user: any) => void;
    userDisconnected: (id: string) => void;
    messageReceived: (message: string) => void;
}

export enum ConnectionState {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}