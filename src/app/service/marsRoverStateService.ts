import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from '../app.config';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IMarsRoverState } from '../model/marsRoverState';
import { WebSocketService } from './webSocketService';

@Injectable()
export class MarsRoverStateService {

    private websocketUrl: string = 'ws://localhost:9001/roverstate';
    private stateUrl: string = 'http://localhost:9001/api/marsrover/state';
    private commandUrl: string = 'http://localhost:9001/api/marsrover/?commands=';

    private _http: Http;
    private _config: Config;

    private _examplesSubject: ReplaySubject<IMarsRoverState> = new ReplaySubject<IMarsRoverState>();

    private _websocketSubject: ReplaySubject<IMarsRoverState> = new ReplaySubject<IMarsRoverState>();

    constructor(http: Http, config: Config, webSocketService: WebSocketService) {
        this._config = config;
        this._http = http;

        this._http.get(this.stateUrl)
            .subscribe((data) => this._examplesSubject.next(JSON.parse(data.text())));

        webSocketService.connect(this.websocketUrl).subscribe((data) => {
            this.handleSocketEvent(data);
        });
    }

    public getExampleData(): ReplaySubject<IMarsRoverState> {
        return this._websocketSubject;
    }

    public  getInitialState(): ReplaySubject<IMarsRoverState> {
        return this._examplesSubject;
    }

    public sendCommandAndState(command: string, state: IMarsRoverState) {

        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this._http.post(this.commandUrl + command, state, {headers: headers})
            .subscribe((data) => console.debug('gestartet'));
    }

    private handleSocketEvent(value: any) {
        this._websocketSubject.next(value);
    }

}
