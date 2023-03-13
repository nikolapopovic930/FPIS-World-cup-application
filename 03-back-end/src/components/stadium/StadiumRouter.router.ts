import StadiumService from './StadiumService.service';
import StadiumController from './StadiumController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class StadiumRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const stadiumService: StadiumService = new StadiumService(resources.databaseConnection);
        const stadiumController: StadiumController = new StadiumController(stadiumService);

        application.get("/api/stadium", stadiumController.getAll.bind(stadiumController));
        application.get("/api/stadium/:id", stadiumController.getById.bind(stadiumController));
        application.post("/api/stadium", stadiumController.add.bind(stadiumController));
        application.put("/api/stadium/:id", stadiumController.edit.bind(stadiumController));
        application.delete("/api/stadium/:id", stadiumController.delete.bind(stadiumController));
    }
}

export default StadiumRouter;