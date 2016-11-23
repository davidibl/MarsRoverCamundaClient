import { MarsRoverStateService } from './service/marsRoverStateService';
import { WebSocketService } from './service/webSocketService';

export const APP_SERVICES = [
    { provide: MarsRoverStateService, useClass: MarsRoverStateService },
    { provide: WebSocketService, useClass: WebSocketService },
];
