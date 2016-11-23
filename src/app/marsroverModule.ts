import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MarsComponent } from './components/mars/mars.component';

import { APP_SERVICES } from './service/services';

import { routing } from './routes';
import { Config } from './app.config';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [ AppComponent, HeaderComponent, MarsComponent ],
    imports: [ BrowserModule, HttpModule, FormsModule, RouterModule, routing ],
    providers: [
        APP_SERVICES,
        Config,
        { provide: APP_BASE_HREF, useValue : '/' },
    ],
}, )
export class MarsroverModule {
}
