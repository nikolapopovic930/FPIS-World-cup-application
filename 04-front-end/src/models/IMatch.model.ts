import ITeam from './ITeam.model';
import IStadium from './IStadium.model';

export default interface IMatch {
    matchId: number,
    firstTeam: number,
    secondTeam: number,
    firstTeamGoals: number,
    secondTeamGoals: number,
    date: string,
    stadiumId: number,
    isSurrendered: number,

    firstTeamData: ITeam,
    secondTeamData: ITeam

    stadiumData: IStadium
}