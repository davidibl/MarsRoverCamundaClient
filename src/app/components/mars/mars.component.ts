import { Component, OnInit } from '@angular/core';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import { IMarsRoverState } from '../../model/marsRoverState';

@Component({
    moduleId: __moduleName,
    selector: 'mars',
    templateUrl: 'mars.html',
})
export class MarsComponent implements OnInit {

    private _service: MarsRoverStateService;
    private commandstring: string;

    public marsRoverState: IMarsRoverState;

    constructor(service: MarsRoverStateService) {
        this._service = service;
    }

    public ngOnInit() {
        this._service.getInitialState().subscribe((data) => this.marsRoverState = data);
        this._service.getExampleData().subscribe(marsRoverState => this.marsRoverState = marsRoverState);
    }

    public sendCommandsAndState() {
        this._service.sendCommandAndState(this.commandstring, this.marsRoverState);
    }

    public getYPosition() {
        let y = (this.marsRoverState == null) ? 0 : this.marsRoverState.yCoordinate;
        return ( (10 - y) * 60) + 'px';
    }

    public getXPosition() {
        let x = (this.marsRoverState == null) ? 0 : this.marsRoverState.xCoordinate;
        return (50 + (x * 60)) + 'px';
    }

}
