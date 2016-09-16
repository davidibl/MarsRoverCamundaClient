// Sample Config injected as class in app

export class Config {

    private _remoteUrlBase: string = 'http://localhost:9002';

    public getRemoteUrlBase(): string {
        return this._remoteUrlBase;
    }
}
