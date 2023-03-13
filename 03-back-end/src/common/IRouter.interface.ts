import * as express from 'express';
import IApplicationResources from './IApplicationResources.interface';

interface IRouter {
    setupRoutes(application: express.Application, resources: IApplicationResources);
}

export default IRouter;