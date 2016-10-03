import { Component, OnInit, Input } from '@angular/core';

import { Match } from '../interfaces';
import { FeedService } from '../services/feed.service';

@Component({
    selector: 'match',
    templateUrl: 'app/shared/components/match.component.html'
})
export class MatchComponent implements OnInit {

    @Input() match: Match;

    constructor(private feedService: FeedService) { }

    ngOnInit() { }

    subscribe() {
        console.log(this.match.Id);
        this.feedService.subscribeToFeed(this.match.Id);
    }
}