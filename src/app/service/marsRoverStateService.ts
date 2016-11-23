import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Config } from '../app.config';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IMarsRoverState } from '../model/marsRoverState';
import { WebSocketService } from './webSocketService';

@Injectable()
export class MarsRoverStateService {

    private _http: Http;
    private _config: Config;
    private _websocketSubject: ReplaySubject<IMarsRoverState> = new ReplaySubject<IMarsRoverState>();

    constructor(http: Http, config: Config, webSocketService: WebSocketService) {
        this._config = config;
        this._http = http;

        this._http.get('http://' + this._config.getRemoteUrlBase() + '/api/marsrover/state')
            .subscribe((data) => this._websocketSubject.next(JSON.parse(data.text())));

        webSocketService.connect('ws://' + this._config.getRemoteUrlBase() + '/roverstate')
            .subscribe((data) => {
                this.handleSocketEvent(data);
            });
    }

    public getStateChangeSubject(): ReplaySubject<IMarsRoverState> {
        return this._websocketSubject;
    }

    public sendCommandAndState(command: string, state: IMarsRoverState) {

        let headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        this._http.post('http://localhost:9001/api/marsrover/?commands=' + command, state, {headers: headers})
            .subscribe((data) => console.debug('gestartet'));
    }

    private handleSocketEvent(value: any) {
        this._websocketSubject.next(value);
    }

}
