/* SignalR related interfaces  */
export interface FeedSignalR extends SignalR {
    broadcaster: FeedProxy
}

export interface FeedProxy {
    client: FeedClient;
    server: FeedServer;
}

export interface FeedClient {
    userConnected: (user: any) => void;
    userDisconnected: (id: string) => void;

    updateMatch: (match: Match) => void;
    addFeed: (feed: Feed) => void;
    addChatMessage: (chatMessage: ChatMessage) => void;
}

export interface FeedServer {
    subscribe(matchId: number): void;
    unsubscribe(matchId: number): void;
}

export enum SignalRConnectionStatus {
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
    Feeds: Feed[];
}

export interface Feed {
    Id: number;
    Description: string;
    CreatedAt: Date;
    MatchId: number;
}

export interface ChatMessage {
    MatchId: number;
    Text: string;
    CreatedAt: Date;
}