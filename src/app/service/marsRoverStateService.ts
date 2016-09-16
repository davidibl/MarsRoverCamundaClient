import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Config } from '../app.config';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {MarsRoverState} from '../model/somemodel/marsRoverState';
import {WebSocketService} from "./webSocketService";

@Injectable()
export class MarsRoverStateService {

    private websocketUrl: string = "ws://localhost:9001/roverstate";

    private _http: Http;
    private _config: Config;

    private _dataCache: Array<MarsRoverState> = null;
    private _examplesSubject: ReplaySubject<MarsRoverState> = new ReplaySubject<MarsRoverState>();

    private _websocketSubject: ReplaySubject<MarsRoverState> = new ReplaySubject<MarsRoverState>();

    constructor(http: Http, config: Config, webSocketService: WebSocketService) {
        this._config = config;
        this._http = http;

        this._http.get("http://localhost:9001/api/marsrover/state").subscribe((data) => this._examplesSubject.next(JSON.parse(data.text())));

        webSocketService.connect(this.websocketUrl).subscribe((data) => {
            this.handleSocketEvent(data);
        });
    }

    private handleSocketEvent(value: any) {
        this._websocketSubject.next(value);
    }

    public getExampleData(): ReplaySubject<MarsRoverState> {
        return this._websocketSubject;
    }

    public  getInitialState():ReplaySubject<MarsRoverState> {
        return this._examplesSubject;
    }

    public sendCommandAndState(command: string, state: MarsRoverState) {

        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this._http.post("http://localhost:9001/api/marsrover/?commands=" + command, state, {headers: headers}).subscribe((data) => console.debug("gestartet"));
    }

}
