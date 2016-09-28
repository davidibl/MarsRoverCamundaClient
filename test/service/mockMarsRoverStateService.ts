import { ReplaySubject } from 'rxjs/ReplaySubject';

export class MockMatsRoverStateService {

    public getExampleData(): ReplaySubject<any> {
        return new ReplaySubject<any>();
    }

    public  getInitialState():ReplaySubject<any> {
         return new ReplaySubject<any>();
    }

}