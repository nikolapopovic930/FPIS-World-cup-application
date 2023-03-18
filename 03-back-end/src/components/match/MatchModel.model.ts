import IModel from '../../common/IModel.interface';

class MatchModel implements IModel {
    matchId: number;
    firstTeam: number;
    secondTeam: number;
    firstTeamGoals: number;
    secondTeamGoals: number;
    stadiumId: number;
    isSurrendered: number;

}

export default MatchModel;