import * as mysql2 from 'mysql2/promise';
import StadiumService from '../components/stadium/StadiumService.service';
import GroupService from '../components/group/GroupService.service';
import TeamService from '../components/team/TeamService.service';
import MatchService from '../components/match/MatchService.service';
export interface Iservices {
    stadium: StadiumService;
    group: GroupService;
    team: TeamService;
    match: MatchService;
}

interface IApplicationResources {
    databaseConnection: mysql2.Connection;
    services: Iservices;
}

export default IApplicationResources;