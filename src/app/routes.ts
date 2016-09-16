import {provideRouter, RouterConfig} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { SampleBodyComponent } from './component/samplebody/samplebody.component';

export const routes: RouterConfig = [
    { path: '', component: SampleBodyComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
];
