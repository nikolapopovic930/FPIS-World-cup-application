import { Iservices } from './IApplicationResources.interface';
export default abstract class BaseController {
    private _services: Iservices;

    constructor(services: Iservices){
        this._services = services;
    }

    protected get services(): Iservices {
        return this._services;
    }
}