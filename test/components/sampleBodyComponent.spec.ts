/// <reference path="../../typings/index.d.ts" />

import { SampleBodyComponent } from '../../src/app/component/samplebody/samplebody.component';
import { BasicRemoteServiceWithCache } from '../../src/app/service/basicRemoteServiceWithCache.service';
import { Config } from '../../src/app/app.config';
import { Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ExampleModel } from '../../src/app/model/somemodel/marsRoverState';

describe('SampleBodyComponent', () => {
    let sut: SampleBodyComponent;
    let basicRemoteServiceWithCache: BasicRemoteServiceWithCache;
    let http: Http;
    let config: Config;

    beforeEach(() => {
        let backend = new MockBackend();
        http = new Http(backend, new BaseRequestOptions());
        config = <Config>{};
        basicRemoteServiceWithCache = new BasicRemoteServiceWithCache(http, config);

        sut = new SampleBodyComponent(basicRemoteServiceWithCache);
        
    });

    describe('ngOnInit', () => {

        it('sollte bei der Initialisierung getExampleData in dem Service aufrufen', () => {
            const spy = spyOn(basicRemoteServiceWithCache, 'getExampleData').and.returnValue(new ReplaySubject<ExampleModel>());

            sut.ngOnInit();

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
