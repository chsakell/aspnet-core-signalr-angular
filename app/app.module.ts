import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConfigService } from './shared/services/config.service';
import { DataService } from './shared/services/data.service';
import { HomeComponent } from './home/home.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { MatchComponent } from './shared/components/match.component';
import { routing } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HighlightDirective,
        MatchComponent
    ],
    bootstrap: [AppComponent],
    providers: [ 
        ConfigService,
        DataService
    ]
})
export class AppModule { }
