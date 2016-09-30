import { Component, OnInit, Input } from '@angular/core';

import { Match } from '../interfaces';

@Component({
    selector: 'match',
    templateUrl: 'app/shared/components/match.component.html'
})
export class MatchComponent implements OnInit {

    @Input() match: Match;

    constructor() { }

    ngOnInit() { }
}