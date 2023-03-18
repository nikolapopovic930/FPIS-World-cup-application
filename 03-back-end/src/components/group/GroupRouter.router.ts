import GroupService from './GroupService.service';
import GroupController from './GroupController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import TeamController from '../team/TeamController.controller';

class GroupRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        
        const groupController: GroupController = new GroupController(resources.services);
        const teamController: TeamController = new TeamController(resources.services);

        application.get("/api/group", groupController.getAll.bind(groupController));
        application.get("/api/group/:id", groupController.getById.bind(groupController));
        application.post("/api/group", groupController.add.bind(groupController));
        application.put("/api/group/:id", groupController.edit.bind(groupController));
        application.delete("/api/group/:id", groupController.delete.bind(groupController));
        application.get("/api/group/:gid/team",teamController.getAllTeamsByGroupId.bind(teamController));

    }
}

export default GroupRouter;