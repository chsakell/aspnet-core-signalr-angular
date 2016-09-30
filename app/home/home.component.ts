import { Component, OnInit } from '@angular/core';

import { FeedService } from '../shared/services/feed.service';
import { Match } from '../shared/interfaces';
import { DataService } from '../shared/services/data.service';
import { ConnectionState } from '../shared/interfaces';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {

    matches: Match[];
    error: any;

    constructor(private dataService: DataService,
        private feedService: FeedService) { }

    ngOnInit() {
        let self = this;

        self.feedService.connectionState
            .subscribe(
            connectionState => {
                if (connectionState == ConnectionState.Connected) {
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
                self.feedService.updateMatch.subscribe(
                    match => {
                        for(var i=0; i< self.matches.length; i++)
                        {   
                            if (self.matches[i].Id === match.Id) {
                                self.matches[i] = match;
                            }
                        }
                    }
                );
            },
            error => {
                console.log(error);
            });
    }
}