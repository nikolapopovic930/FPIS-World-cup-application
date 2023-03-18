import * as express from "express";
import * as cors from "cors";
import { DevConfig } from "./configs";
import IConfig from "./common/IConfig.interface";
import IApplicationResources from './common/IApplicationResources.interface';
import * as mysql2 from 'mysql2/promise';
import GroupService from './components/group/GroupService.service';
import StadiumService from './components/stadium/StadiumService.service';
import TeamService from "./components/team/TeamService.service";
import MatchService from "./components/match/MatchService.service";

async function main() {
    const config: IConfig = DevConfig;
    
    const db = await mysql2.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: config.database.charset,
        timezone: config.database.timezone
    });
    
    const applicationResources: IApplicationResources = {
        databaseConnection: db,
        services: {
            team: null,
            group: null,
            stadium: null,
            match: null,
        }
    };


    applicationResources.services.team = new TeamService(applicationResources);
    applicationResources.services.group = new GroupService(applicationResources);
    applicationResources.services.stadium = new StadiumService(applicationResources);
    applicationResources.services.match = new MatchService(applicationResources);

   // const resources: IApplicationResources = {
   //     databaseConnection: db,
   //     services:{
   //         group: new GroupService(db),
   ///         stadium: new StadiumService(db),
   //         team: new TeamService(db)
   //     }
        
   // };
    
    const application: express.Application = express();

    application.use(cors());
    application.use(express.json());


    for (const router of config.routers) {
        router.setupRoutes(application, applicationResources);
    }

    application.use((req, res) => {
        res.sendStatus(404);
    });

    application.listen(config.server.port);
}

process.on("uncaughtException", error => {
    console.log("Error:", error);
})

main();