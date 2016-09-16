import { Component, OnInit } from '@angular/core';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import {MarsRoverState} from "../../model/somemodel/marsRoverState";

@Component({
    moduleId: __moduleName,
    selector: 'sample-body',
    templateUrl: 'samplebody.html'
})
export class SampleBodyComponent implements OnInit {

    public marsRoverState: MarsRoverState;
    private _service: MarsRoverStateService;
    private commandstring: string;

    constructor(service: MarsRoverStateService) {
        this._service = service;
    }

    ngOnInit() {
        this._service.getInitialState().subscribe((data) => this.marsRoverState = data);
        this._service.getExampleData().subscribe(marsRoverState => this.marsRoverState = marsRoverState);
    }

    sendCommandsAndState() {
        this._service.sendCommandAndState(this.commandstring, this.marsRoverState);
    }

    getYPosition() {
        let y = (this.marsRoverState == null) ? 0 : this.marsRoverState.yCoordinate;
        return ((10-y) * 60) + 'px';
    }

    getXPosition() {
        let x = (this.marsRoverState == null) ? 0 : this.marsRoverState.xCoordinate;
        return (50 + (x * 60)) + 'px';
    }

}
