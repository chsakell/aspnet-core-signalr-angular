import { Component, OnInit, Input } from '@angular/core';

import { ChatMessage, Match } from '../interfaces';
import { FeedService } from '../services/feed.service';

@Component({
    selector: 'chat',
    templateUrl: 'app/shared/components/chat.component.html'
})
export class ChatComponent implements OnInit {

    @Input() matches: Match[];
    @Input() connection: string;
    messages: ChatMessage[];

    constructor(private feedService: FeedService) { }

    ngOnInit() {
        let self = this;

        self.feedService.addChatMessage.subscribe(
            message => {
                console.log('received..');
                console.log(message);
                if(!self.messages)
                    self.messages = new Array<ChatMessage>();
                self.messages.unshift(message);
            }
        )
     }
}