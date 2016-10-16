import { Component, OnInit } from '@angular/core';

import { FeedService } from '../shared/services/feed.service';
import { Match, Feed } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { SignalRConnectionStatus } from '../shared/interfaces';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {

    matches: Match[];
    connectionId: string;
    error: any;

    constructor(private dataService: DataService,
        private feedService: FeedService) { }

    ngOnInit() {
        let self = this;

        self.listenForConnection();

        self.feedService.connectionState
            .subscribe(
            connectionState => {
                if (connectionState == SignalRConnectionStatus.Connected) {
                    console.log('Connected!');
                    self.loadMatches();
                } else {
                    console.log(connectionState.toString());
                }
            },
            error => {
                this.error = error;
                console.log(error);
            });
    }

    loadMatches(): void {
        let self = this;
        this.dataService.getMatches()
            .subscribe((res: Match[]) => {
                self.matches = res;
                // Listen for match score updates...
                self.feedService.updateMatch.subscribe(
                    match => {
                        for (var i = 0; i < self.matches.length; i++) {
                            if (self.matches[i].Id === match.Id) {
                                self.matches[i].HostScore = match.HostScore;
                                self.matches[i].GuestScore = match.GuestScore;

                                if(match.HostScore === 0 && match.GuestScore === 0)
                                    self.matches[i].Feeds = new Array<Feed>();
                            }
                        }
                    }
                );

                // Listen for subscribed feed updates..
                self.feedService.addFeed.subscribe(
                    feed => {
                        console.log(feed);
                        for (var i = 0; i < self.matches.length; i++) {
                            if (self.matches[i].Id === feed.MatchId) {
                                if (!self.matches[i].Feeds) {
                                    self.matches[i].Feeds = new Array<Feed>();
                                }
                                self.matches[i].Feeds.unshift(feed);
                            }
                        }
                    }
                );
            },
            error => {
                console.log(error);
            });
    }

    listenForConnection() {
        let self = this;
        // Listen for connected / disconnected events
        self.feedService.setConnectionId.subscribe(
            id => {
                console.log(id);
                self.connectionId = id;
            }
        );
    }

    updateSubscription(subscription: any) {
        if (<boolean>subscription.subscribe === true)
            this.feedService.subscribeToFeed(<number>subscription.matchId);
        else
            this.feedService.unsubscribeFromFeed(<number>subscription.matchId);
    }
}