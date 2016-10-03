import { Component, OnInit, Input } from '@angular/core';

import { Match } from '../interfaces';

@Component({
    selector: 'chat',
    templateUrl: 'app/shared/components/chat.component.html'
})
export class ChatComponent implements OnInit {

    @Input() matches: Match[];

    constructor() { }

    ngOnInit() { }
}