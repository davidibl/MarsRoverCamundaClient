import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {ReplaySubject} from "rxjs/Rx";

@Injectable()
export class WebSocketService {
    private subject: ReplaySubject<any>;

    public connect(url): Rx.Observable<any> {
        if (!this.subject) {
            this.subject = new ReplaySubject<any>();
            this.create(url);
        }
        return this.subject;
    }

    private create(url): void {
        let ws = new WebSocket(url);

        ws.onmessage = (evt) => {
            this.subject.next(JSON.parse(evt.data));
        }
    }
}