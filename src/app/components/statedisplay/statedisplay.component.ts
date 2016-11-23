import { Component } from '@angular/core';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import { StateComponentBase } from '../stateComponentBase/stateComponentBase';

@Component({
    moduleId: __moduleName,
    selector: 'statedisplay',
    templateUrl: 'statedisplay.html',
})
export class StatedisplayComponent extends StateComponentBase {

    constructor(marsRoverStateService: MarsRoverStateService) {
        super();
        this.marsRoverStateService = marsRoverStateService;
    }

}
