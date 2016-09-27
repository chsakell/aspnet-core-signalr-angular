import { Component, OnInit } from '@angular/core';

import { FeedService, ConnectionState } from './shared/feed.service'

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [FeedService]
})
export class AppComponent implements OnInit {

    constructor(private service: FeedService) { }

    ngOnInit() {
        this.service.start(true).subscribe(
            null,
            error => console.log('Error on init: ' + error));
    }
}