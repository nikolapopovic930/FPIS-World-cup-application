import TeamService from './TeamService.service';
import TeamController from './TeamController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class TeamRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        
        const teamController: TeamController = new TeamController(resources.services);

        application.get("/api/team", teamController.getAll.bind(teamController));
        application.get("/api/team/:id", teamController.getById.bind(teamController));
        application.post("/api/team", teamController.add.bind(teamController));
        application.put("/api/team/:id", teamController.edit.bind(teamController));
        application.delete("/api/team/:id", teamController.delete.bind(teamController));
    }
}

export default TeamRouter;