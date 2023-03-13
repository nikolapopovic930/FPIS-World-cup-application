import * as express from "express";
import * as cors from "cors";
import { DevConfig } from "./configs";
import IConfig from "./common/IConfig.interface";
import IApplicationResources from './common/IApplicationResources.interface';
import * as mysql2 from 'mysql2/promise';

async function main() {
    const config: IConfig = DevConfig;
    const resources: IApplicationResources = {
        databaseConnection: await mysql2.createConnection({
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            charset: config.database.charset,
            timezone: config.database.timezone
        })
    };

    const application: express.Application = express();

    application.use(cors());
    application.use(express.json());


    for (const router of config.routers) {
        router.setupRoutes(application, resources);
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