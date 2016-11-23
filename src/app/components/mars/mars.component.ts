import { Component, OnInit } from '@angular/core';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import { IMarsRoverState } from '../../model/marsRoverState';

@Component({
    moduleId: __moduleName,
    selector: 'mars',
    templateUrl: 'mars.html',
})
export class MarsComponent implements OnInit{

    private _service: MarsRoverStateService;
    private commandstring: string;

    public marsRoverState: IMarsRoverState;

    constructor(service: MarsRoverStateService) {
        this._service = service;
    }

    public ngOnInit() {
        this._service.getStateChangeSubject().subscribe((data) => this.marsRoverState = data);
    }

    public sendCommandsAndState() {
        this._service.sendCommandAndState(this.commandstring, this.marsRoverState);
    }
}
