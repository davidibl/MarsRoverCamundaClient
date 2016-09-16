import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';
import { HeaderComponent } from './component/header/header.component';

@Component({
    moduleId: __moduleName,
    selector: 'sample-app',
    templateUrl : 'sampleapp.html',
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})
export class SampleApp {

    constructor() {

    }
}
