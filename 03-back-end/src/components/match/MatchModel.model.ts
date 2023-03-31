import IModel from '../../common/IModel.interface';
import TeamModel from '../team/TeamModel.model';
import StadiumModel from '../../../dist/components/stadium/StadiumModel.model';

class MatchModel implements IModel {
    matchId: number;
    firstTeam: number;
    secondTeam: number;
    firstTeamGoals: number;
    secondTeamGoals: number;
    date: Date;
    stadiumId: number;
    isSurrendered: number;

    firstTeamData?: TeamModel;
    secondTeamData?: TeamModel;

    stadiumData?: StadiumModel;
}

export default MatchModel;