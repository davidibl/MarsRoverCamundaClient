import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { SampleApp } from './sample.app';
import {APP_ROUTER_PROVIDERS} from './routes';
import { APP_SERVICES } from './services';
import { Config } from './app.config';

bootstrap(SampleApp, [
    HTTP_PROVIDERS,
    APP_ROUTER_PROVIDERS,
    APP_SERVICES,
    { provide: Config, useClass: Config }
]);
