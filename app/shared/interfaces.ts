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
    
    updateMatch: (match: Match) => void;
    messageReceived: (message: string) => void;
}

export enum ConnectionState {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}

/* LiveGameFeed related interfaces */
export interface Match {
    Id: number;
    Host: string;
    Guest: string;
    HostScore: number;
    GuestScore: number;
    MatchDate: Date;
    Type: string;
}