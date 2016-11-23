import { IMarsRoverState } from '../../model/marsRoverState';
import { MarsRoverStateService } from '../../service/marsRoverStateService';
import { OnInit } from '@angular/core';

export class StateComponentBase implements OnInit {

    public marsRoverState: IMarsRoverState;
    public marsRoverStateService: MarsRoverStateService;

    public ngOnInit() {
        this.marsRoverStateService.getStateChangeSubject()
            .subscribe(data => this.updateMarsRoverState(data));
    }

    private updateMarsRoverState(data: IMarsRoverState) {
        this.marsRoverState = data;
    }
}
