import MatchModel from "./MatchModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddMatch from './dto/IAddMatchDto.dto';
import IEditMatch from './dto/IEditMatchDto.dto';

interface IMatchAdapterOptions extends IAdapterOptions {
    loadTeamsData: boolean;
    loadStadiumData: boolean;
}

const DefaultMatchAdapterOptions: IMatchAdapterOptions = {
    loadTeamsData: false,
    loadStadiumData: false

}

class MatchService extends BaseService<MatchModel, IMatchAdapterOptions>{

    tableName(): string {
        return "match";
    }

    sortFildName(): string {
        return "match_id";
    }

    protected async adaptToModel(data: any, options:IMatchAdapterOptions): Promise<MatchModel> {
        const match: MatchModel = new MatchModel();

        match.matchId = +data?.match_id;
        match.firstTeam = +data?.first_team;
        match.secondTeam = +data?.second_team;
        match.firstTeamGoals = data?.first_team_goals;
        match.secondTeamGoals = data?.second_team_goals;
        match.date = data?.date;
        match.stadiumId = +data?.stadium_id;
        match.isSurrendered = +data?.is_surrendered;

        if(options.loadTeamsData) {

            match.firstTeamData = await this.services.team.getById(match.firstTeam, {loadGroup:true})
            match.secondTeamData = await this.services.team.getById(match.secondTeam, {loadGroup:true})
        }

        if(options.loadStadiumData) {

            match.stadiumData = await this.services.stadium.getById(match.stadiumId, {})
    
        }



        return match;
    }

    public async add(data: IAddMatch): Promise<MatchModel> {
        console.log('Usao');
        return this.baseAdd(data, DefaultMatchAdapterOptions);
    }

    public async editById(matchId: number, data: IEditMatch): Promise<MatchModel> {
        return this.baseEditById(matchId, data, DefaultMatchAdapterOptions);
    }

    public async deleteById(matchId: number): Promise<boolean> {
        return this.baseDelete(matchId);
    }
}

export default MatchService;
export { DefaultMatchAdapterOptions }