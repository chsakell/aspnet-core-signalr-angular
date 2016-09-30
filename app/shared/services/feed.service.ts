import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { FeedSignalR, FeedProxy, FeedClient, ConnectionState } from '../interfaces';

@Injectable()
export class FeedService {

    currentState = ConnectionState.Disconnected;
    connectionState: Observable<ConnectionState>;
    userConnected: Observable<any>;
    messageReceived: Observable<string>;

    private connectionStateSubject = new Subject<ConnectionState>();
    private userConnectedSubject = new Subject<any>();
    private messageReceivedSubject = new Subject<string>();

    constructor(private http: Http) {
        this.connectionState = this.connectionStateSubject.asObservable();
        this.userConnected = this.userConnectedSubject.asObservable();
        this.messageReceived = this.messageReceivedSubject.asObservable();
    }

    start(debug: boolean): Observable<ConnectionState> {
        // only for debug
        $.connection.hub.logging = debug;
        // get the signalR hub named 'broadcaster'
        let connection = <FeedSignalR>$.connection;
        let feedHub = connection.broadcaster;

        /**
         * @desc callback when a new user connect to the chat
         * @param User user, the connected user
       */
        feedHub.client.userConnected = user => this.onUserConnected(user);

        /**
          * @desc callback when a message is received
          * @param String to, the conversation id
          * @param Message data, the message
        */
        feedHub.client.messageReceived = message => this.onMessageReceived(message);

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
        console.log("Chat Hub new user connected: " + user);
        this.userConnectedSubject.next(user);
    }

    private onMessageReceived(message: string) {
        console.log(message);
        this.messageReceivedSubject.next(message);
    }
}