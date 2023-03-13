import IConfig from "./common/IConfig.interface";
import StadiumRouter from './components/stadium/StadiumRouter.router';

const DevConfig: IConfig = {
    server: {
        port: 10000,
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "singidunum",
        database: "fpis_world_cup_db",
        charset: "utf8",
        timezone: "+01:00"
    },
    routers: [
        new StadiumRouter(),
    ]
}

export { DevConfig }