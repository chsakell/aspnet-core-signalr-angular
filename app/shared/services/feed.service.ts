import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { FeedSignalR, FeedProxy, FeedClient, FeedServer, SignalRConnectionStatus, ChatMessage, Match, Feed } from '../interfaces';

@Injectable()
export class FeedService {

    currentState = SignalRConnectionStatus.Disconnected;
    connectionState: Observable<SignalRConnectionStatus>;

    userConnected: Observable<any>;
    updateMatch: Observable<Match>;
    addFeed: Observable<Feed>;
    addChatMessage: Observable<ChatMessage>;

    private connectionStateSubject = new Subject<SignalRConnectionStatus>();
    private userConnectedSubject = new Subject<any>();

    private updateMatchSubject = new Subject<Match>();
    private addFeedSubject = new Subject<Feed>();
    private addChatMessageSubject = new Subject<ChatMessage>();

    private server: FeedServer;

    constructor(private http: Http) {
        this.connectionState = this.connectionStateSubject.asObservable();

        this.userConnected = this.userConnectedSubject.asObservable();
        this.updateMatch = this.updateMatchSubject.asObservable();
        this.addFeed = this.addFeedSubject.asObservable();
        this.addChatMessage = this.addChatMessageSubject.asObservable();
    }

    start(debug: boolean): Observable<SignalRConnectionStatus> {
        // only for debug
        $.connection.hub.logging = debug;
        // get the signalR hub named 'broadcaster'
        let connection = <FeedSignalR>$.connection;
        let feedHub = connection.broadcaster;
        this.server = feedHub.server;

        /**
         * @desc callback when a new user connect to the chat
         * @param User user, the connected user
       */
        feedHub.client.userConnected = user => this.onUserConnected(user);

        /**
          * @desc callback when match score is updated
        */
        feedHub.client.updateMatch = match => this.onUpdateMatch(match);

        /**
          * @desc callback when a feed is added
        */
        feedHub.client.addFeed = feed => this.onAddFeed(feed);

        feedHub.client.addChatMessage = chatMessage => this.onAddChatMessage(chatMessage);

        // start the connection
        $.connection.hub.start()
            .done(response => this.setConnectionState(SignalRConnectionStatus.Connected))
            .fail(error => this.connectionStateSubject.error(error));

        return this.connectionState;
    }

    private setConnectionState(connectionState: SignalRConnectionStatus) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

    // Client side methods
    private onUserConnected(user: any) {
        this.userConnectedSubject.next(user);
    }

    private onUpdateMatch(match: Match) {
        this.updateMatchSubject.next(match);
    }

    private onAddFeed(feed: Feed) {
        console.log(feed);
        this.addFeedSubject.next(feed);
    }

    private onAddChatMessage(chatMessage: ChatMessage) {
        console.log(chatMessage);
        this.addChatMessageSubject.next(chatMessage);
    }

    // Server side methods
    public subscribeToFeed(matchId: number) {
        this.server.subscribe(matchId);
    }

    public unsubscribeFromFeed(matchId: number) {
        this.server.unsubscribe(matchId);
    }
}