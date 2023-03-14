import GroupService from './GroupService.service';
import GroupController from './GroupController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class GroupRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const groupService: GroupService = new GroupService(resources.databaseConnection);
        const groupController: GroupController = new GroupController(groupService);

        application.get("/api/group", groupController.getAll.bind(groupController));
        application.get("/api/group/:id", groupController.getById.bind(groupController));
        application.post("/api/group", groupController.add.bind(groupController));
        application.put("/api/group/:id", groupController.edit.bind(groupController));
        application.delete("/api/group/:id", groupController.delete.bind(groupController));
    }
}

export default GroupRouter;