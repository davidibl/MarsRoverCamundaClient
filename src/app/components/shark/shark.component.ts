import { Component } from '@angular/core';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import { StateComponentBase } from '../stateComponentBase/stateComponentBase';
@Component ({
    moduleId: __moduleName,
    selector: 'shark',
    templateUrl: 'shark.html',
})
export class SharkComponent extends StateComponentBase {

    constructor(marsRoverStateService: MarsRoverStateService) {
        super();
        this.marsRoverStateService = marsRoverStateService;
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
