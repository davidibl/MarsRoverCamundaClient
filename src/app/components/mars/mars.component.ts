import { Component, OnInit } from '@angular/core';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import {MarsRoverState} from '../../model/marsRoverState';

@Component({
    moduleId: __moduleName,
    selector: 'mars',
    templateUrl: 'mars.html'
})
export class MarsComponent implements OnInit{

    public marsRoverState: MarsRoverState;
    private _service: MarsRoverStateService;
    private commandstring: string;

    private marscomponment: MarsComponent;

    constructor(service: MarsRoverStateService) {
        this._service = service;
    }

    ngOnInit() {
        this._service.getStateChangeSubject().subscribe((data) => this.marsRoverState = data);
    }

    sendCommandsAndState() {
        this._service.sendCommandAndState(this.commandstring, this.marsRoverState);
    }

}
