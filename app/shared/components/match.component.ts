import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChatMessage, Match } from '../interfaces';
import { FeedService } from '../services/feed.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'match',
    templateUrl: 'app/shared/components/match.component.html'
})
export class MatchComponent implements OnInit {

    @Input() match: Match;
    @Output() updateSubscription = new EventEmitter();
    subscribed: boolean;
    chatMessage: string = '';

    constructor(private dataService: DataService) { }

    ngOnInit() { }

    subscribe() {
        console.log(this.match.Id);
        this.subscribed = true;
        //this.feedService.subscribeToFeed(this.match.Id);
    }

    unsubscribe() {
        this.subscribed = false;
        //this.feedService.unsubscribeToFeed(this.match.Id);
    }

    setSubscription(val: boolean) {
        this.subscribed = val;
        let subscription =
            {
                subscribe: val,
                matchId: this.match.Id
            }

        this.updateSubscription.emit(subscription);
    }

    addChatMessage() {
        let self = this;
        let messageToSend: ChatMessage = {
            MatchId: self.match.Id,
            Text: self.chatMessage,
            CreatedAt: new Date(Date.now())
        };

        this.dataService.addChatMessage(messageToSend)
            .subscribe(() => {
                console.log('message sent..');
            },
            error => {
                console.log(error);
            });

        self.chatMessage = '';
    }
}