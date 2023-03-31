import TeamModel from "./TeamModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddTeam from './dto/IAddTeamDto.dto';
import IEditTeam from './dto/IEditTeamDto.dto';

interface ITeamAdapterOptions extends IAdapterOptions {
    loadGroup: boolean
}

const DefaultTeamAdapterOptions: ITeamAdapterOptions = {
    loadGroup: false
}

class TeamService extends BaseService<TeamModel, ITeamAdapterOptions>{

    tableName(): string {
        return "team";
    }

    protected async adaptToModel(data: any, options: ITeamAdapterOptions): Promise<TeamModel> {
        return new Promise(async (resolve) => {
        
            const team: TeamModel = new TeamModel();

            team.teamId = +data?.team_id;
            team.name = data?.name;
            team.flag = data?.flag;
            team.groupId = +data?.group_id;

            if (options.loadGroup) {
                team.group = await this.services.group.getById(team.groupId, {
                    loadTeams:false
                });
        }
    
            resolve(team);

        })
        
   /*     const team: TeamModel = new TeamModel();

        team.teamId = +data?.team_id;
        team.name = data?.name;
        team.flag = data?.flag;
        team.groupId = +data?.group_id;

        if (options.loadGroup) {
            team.group = await this.services.group.getById(team.groupId, {
                loadIngredients: true,
            });
        }

        return team;
    }

    */
}
    public async add(data: IAddTeam): Promise<TeamModel> {
        return this.baseAdd(data, DefaultTeamAdapterOptions);
    }

    public async editById(teamId: number, data: IEditTeam): Promise<TeamModel> {
        return this.baseEditById(teamId, data, DefaultTeamAdapterOptions);
    }

    public async deleteById(teamId: number): Promise<boolean> {
        return this.baseDelete(teamId);
    }

    async getAllByGroupId(groupId: number, options: ITeamAdapterOptions) {
        return this.getAllByFieldNameAndValue("group_id", groupId, options);
    }
}

export default TeamService;
export { DefaultTeamAdapterOptions }