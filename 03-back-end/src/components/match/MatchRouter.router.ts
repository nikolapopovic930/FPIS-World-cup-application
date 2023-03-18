import MatchService from './MatchService.service';
import MatchController from './MatchController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class MatchRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        
        const matchController: MatchController = new MatchController(resources.services);

        application.get("/api/match", matchController.getAll.bind(matchController));
        application.get("/api/match/:id", matchController.getById.bind(matchController));
        application.post("/api/match", matchController.add.bind(matchController));
        application.put("/api/match/:id", matchController.edit.bind(matchController));
        application.delete("/api/match/:id", matchController.delete.bind(matchController));
    }
}

export default MatchRouter;