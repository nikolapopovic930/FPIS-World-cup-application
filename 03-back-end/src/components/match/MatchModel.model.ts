import IModel from '../../common/IModel.interface';
import StadiumModel from '../stadium/StadiumModel.model';
import TeamModel from '../team/TeamModel.model';


class MatchModel implements IModel {
    matchId: number;
    firstTeam: number;
    secondTeam: number;
    firstTeamGoals: number | null;
    secondTeamGoals: number | null;
    date: Date ;
    stadiumId: number;
    isSurrendered: number;

    firstTeamData?: TeamModel;
    secondTeamData?: TeamModel;

    stadiumData?: StadiumModel;
}

export default MatchModel;