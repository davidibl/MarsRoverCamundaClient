import {MarsRoverState} from '../../model/marsRoverState';
import {MarsRoverStateService} from '../../service/marsRoverStateService';
import {OnInit} from '@angular/core';

export class StateComponentBase implements OnInit {

    public marsRoverState: MarsRoverState;
    public marsRoverStateService: MarsRoverStateService;

    updateMarsRoverState(data: MarsRoverState) {
        this.marsRoverState = data;
    }

    ngOnInit() {
        this.marsRoverStateService.getStateChangeSubject()
            .subscribe(data => this.updateMarsRoverState(data));
    }
}
