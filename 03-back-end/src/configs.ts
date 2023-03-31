import IConfig from "./common/IConfig.interface";
import StadiumRouter from './components/stadium/StadiumRouter.router';
import GroupRouter from './components/group/GroupRouter.router';
import TeamRouter from "./components/team/TeamRouter.router";
import MatchRouter from './components/match/MatchRouter.router';

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
        timezone: "+00:00"
    },
    routers: [
        new StadiumRouter(),
        new GroupRouter(),
        new TeamRouter(),
        new MatchRouter()
    ]
}

export { DevConfig }