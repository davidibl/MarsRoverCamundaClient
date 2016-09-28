/// <reference path="../../typings/index.d.ts" />

import { MarsComponent } from '../../src/app/components/mars/mars.component';
import { MarsRoverStateService } from '../../src/app/service/marsRoverStateService';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Config } from '../../src/app/app.config';
import { Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockMatsRoverStateService } from '../service/mockMarsRoverStateService';

describe('SampleBodyComponent', () => {
    let sut: MarsComponent;
    let stateService: MarsRoverStateService;
    let http: Http;
    let config: Config;
    let fixture: ComponentFixture<MarsComponent>;

    TestBed.initTestEnvironment(
        BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    beforeEach(() => {

        this.stateService = {
            getInitialState: jasmine.createSpy("getInitialState").and.returnValue(new ReplaySubject<any>()),
            getExampleData: jasmine.createSpy("getExampleData").and.returnValue(new ReplaySubject<any>())
        };

        TestBed.configureTestingModule({
            declarations: [ MarsComponent ],
            imports: [ FormsModule ],
            providers: [{provide: MarsRoverStateService, useValue: this.stateService}]
        });
        
        
    });

    describe('ngOnInit', () => {

        it('sollte bei der Initialisierung getExampleData in dem Service aufrufen', done => {

            TestBed.compileComponents().then(() => {
                const fixture = TestBed.createComponent(MarsComponent);
                let instance = fixture.componentInstance;
                const marsRoverStateService = TestBed.get(MarsRoverStateService);
                
                instance.ngOnInit();

                let result = expect(this.stateService.getInitialState).toHaveBeenCalledTimes(1);
                expect(this.stateService.getExampleData).toHaveBeenCalledTimes(1);

                done();
            });

            
        });
    });
});
