import {Component, OnInit} from '@angular/core';
import {MarsRoverState} from '../../model/marsRoverState';
import {MarsRoverStateService} from '../../service/marsRoverStateService';
import {StateComponentBase} from '../stateComponentBase/stateComponentBase';
@Component({
    moduleId: __moduleName,
    selector: 'statedisplay',
    templateUrl: 'statedisplay.html'
})
export class StatedisplayComponent extends StateComponentBase {

    constructor(marsRoverStateService: MarsRoverStateService) {
        this.marsRoverStateService = marsRoverStateService;

    }

}
