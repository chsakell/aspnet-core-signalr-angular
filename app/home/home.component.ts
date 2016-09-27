import { Component, OnInit } from '@angular/core';

import { FeedService, ConnectionState } from '../shared/feed.service';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html'
})
export class HomeComponent implements OnInit {

    error: any;

    constructor(private service: FeedService) { }

    ngOnInit() {
        this.service.connectionState
            .subscribe(
            connectionState => {
                if (connectionState == ConnectionState.Connected) {
                    console.log('Connected!');
                } else {
                    console.log(connectionState.toString());
                }
            },
            error => {
                this.error = error;
                console.log(error);
            });

        if (this.service.currentState === ConnectionState.Connected) {
            console.log(' connected....');
        }
        else {
            console.log('not connected');
        }
    }
}