import {Component} from '@angular/core';
import {MarsRoverState} from '../../model/marsRoverState';
import {MarsRoverStateService} from '../../service/marsRoverStateService';
import {StateComponentBase} from '../stateComponentBase/stateComponentBase';
@Component ({
    moduleId: __moduleName,
    selector: 'shark',
    templateUrl: 'shark.html'
})
export class SharkComponent extends StateComponentBase {

    constructor(marsRoverStateService: MarsRoverStateService) {
        this.marsRoverStateService = marsRoverStateService;
    }

    getYPosition() {
        let y = (this.marsRoverState == null) ? 0 : this.marsRoverState.yCoordinate;
        return ( (10 - y) * 60) + 'px';
    }

    getXPosition() {
        let x = (this.marsRoverState == null) ? 0 : this.marsRoverState.xCoordinate;
        return (50 + (x * 60)) + 'px';
    }

}
