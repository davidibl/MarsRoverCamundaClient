import { NgModule, forwardRef } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MarsComponent } from './components/mars/mars.component';
import { SharkComponent } from './components/shark/shark.component';
import { StatedisplayComponent } from './components/statedisplay/statedisplay.component';

import { APP_SERVICES } from './service/services';

import { routing } from './routes';
import { Config } from './app.config';

@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule, RouterModule, routing ],
    declarations: [ HeaderComponent, MarsComponent, AppComponent, SharkComponent, StatedisplayComponent ],
    bootstrap: [ AppComponent ],
    providers: [
        APP_SERVICES,
        Config,
        { provide: APP_BASE_HREF, useValue : '/' }
    ]
})
export class MarsroverModule {
}
