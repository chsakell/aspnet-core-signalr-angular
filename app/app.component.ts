import { Component, OnInit } from '@angular/core';

import { FeedService } from './shared/services/feed.service';
import { ConnectionState } from './shared/interfaces';

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