import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { FeedSignalR, FeedProxy, FeedClient, FeedServer, ConnectionState, ChatMessage, Match, Feed } from '../interfaces';

@Injectable()
export class FeedService {

    currentState = ConnectionState.Disconnected;
    connectionState: Observable<ConnectionState>;
    userConnected: Observable<any>;

    updateMatch: Observable<Match>;
    addFeed: Observable<Feed>;
    messageReceived: Observable<string>;
    addChatMessage: Observable<ChatMessage>;

    private connectionStateSubject = new Subject<ConnectionState>();
    private userConnectedSubject = new Subject<any>();

    private updateMatchSubject = new Subject<Match>();
    private addFeedSubject = new Subject<Feed>();
    private messageReceivedSubject = new Subject<string>();
    private addChatMessageSubject = new Subject<ChatMessage>();

    private server: FeedServer;

    constructor(private http: Http) {
        this.connectionState = this.connectionStateSubject.asObservable();
        this.userConnected = this.userConnectedSubject.asObservable();

        this.updateMatch = this.updateMatchSubject.asObservable();
        this.addFeed = this.addFeedSubject.asObservable();
        this.messageReceived = this.messageReceivedSubject.asObservable();
        this.addChatMessage = this.addChatMessageSubject.asObservable();
    }

    start(debug: boolean): Observable<ConnectionState> {
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

        /**
          * @desc callback when a message is received
          * @param String to, the conversation id
          * @param Message data, the message
        */
        feedHub.client.messageReceived = message => this.onMessageReceived(message);

        feedHub.client.addChatMessage = chatMessage => this.onAddChatMessage(chatMessage);

        if (debug) {
            // for debug only, callback on connection state change
            $.connection.hub.stateChanged(change => {
                let oldState: string,
                    newState: string;

                for (var state in $.signalR.connectionState) {
                    if ($.signalR.connectionState[state] === change.oldState) {
                        oldState = state;
                    }
                    if ($.signalR.connectionState[state] === change.newState) {
                        newState = state;
                    }
                }

                console.log("Feed Hub state changed from " + oldState + " to " + newState);
            });
        }

        // start the connection
        $.connection.hub.start()
            .done(response => this.setConnectionState(ConnectionState.Connected))
            .fail(error => this.connectionStateSubject.error(error));

        return this.connectionState;
    }

    private setConnectionState(connectionState: ConnectionState) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

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

    private onMessageReceived(message: string) {
        this.messageReceivedSubject.next(message);
    }

    private onAddChatMessage(chatMessage: ChatMessage) {
        console.log(chatMessage);
        this.addChatMessageSubject.next(chatMessage);
    }

    public subscribeToFeed(matchId: number) {
        this.server.subscribe(matchId);
    }

    public unsubscribeFromFeed(matchId: number) {
        this.server.unsubscribe(matchId);
    }
}