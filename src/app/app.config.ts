// Sample Config injected as class in app

export class Config {

    private _remoteUrlBase: string = 'localhost:9001';

    public getRemoteUrlBase(): string {
        return this._remoteUrlBase;
    }
}
