import TeamModel from "./TeamModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddTeam from './dto/IAddTeamDto.dto';
import IEditTeam from './dto/IEditTeamDto.dto';
import TeamDetailedModel from "./TeamDetailedModel.model";
import MatchModel from "../match/MatchModel.model";

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

    sortFildName(): string {
        return "team_id";
    }

    protected async adaptToModel(data: any, options: ITeamAdapterOptions): Promise<TeamModel> {
        return new Promise(async (resolve) => {
        
            const team: TeamModel = new TeamModel();

            team.teamId = +data?.team_id;
            team.name = data?.name;
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

    public async getAllByGroupId2(groupId: number, options: ITeamAdapterOptions): Promise<TeamDetailedModel[]> {
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAndValue("group_id", groupId, options)
                .then(async result => {
                    if (result.length === 0) {
                        return resolve([]);
                    }
                    const matches = this.services.match.getAll({loadTeamsData:false, loadStadiumData: false});

                    const teams: TeamDetailedModel[] = await Promise.all(result.map(async team => {
                        
                        const teamId = team.teamId;
                        const filteredMatches = (await matches).filter(match => match.firstTeam == team.teamId || match.secondTeam == team.teamId);
                        const gamesPlayed = (filteredMatches).length;
                        const wins = ((await matches).filter(match => (match.firstTeam == teamId && match.firstTeamGoals > match.secondTeamGoals) 
                                                                        ||
                                                                        ( match.secondTeam == teamId  && match.firstTeamGoals < match.secondTeamGoals)))
                                                                        .length;
                        const draws = ((await matches).filter(match => ((match.firstTeam == teamId || match.secondTeam == teamId) && match.firstTeamGoals == match.secondTeamGoals))).length;
                        const losses = gamesPlayed - wins - draws;
                        var goalsGiven = 0;
                        var goalsReceived = 0;
                        var points = 0;
                        filteredMatches.forEach(function (match: MatchModel) {
                            if (match.firstTeam == teamId){
                                goalsGiven += match.firstTeamGoals;
                                goalsReceived += match.secondTeamGoals;
                                if(match.firstTeamGoals > match.secondTeamGoals){
                                    points += 3;
                                }
                                else if(match.firstTeamGoals == match.secondTeamGoals){
                                    points += 1;
                                }
                            }
                            else{
                                goalsGiven += match.secondTeamGoals;
                                goalsReceived += match.firstTeamGoals;
                               if(match.firstTeamGoals < match.secondTeamGoals){
                                    points += 3;
                                }
                                else if(match.firstTeamGoals == match.secondTeamGoals){
                                    points += 1;
                                }
                            }
                        });
                        const goalDifference = goalsGiven - goalsReceived;

                        return {
                        
                                teamId: team.teamId,
                                name: (await this.getById(team.teamId, {loadGroup: false})).name,
                                groupId: (await (this.getById(team.teamId, {loadGroup: false}))).groupId,
                                gamesPlayed: gamesPlayed,
                                wins: wins,
                                draws: draws,
                                losses: losses,
                                goalDifference: goalDifference,
                                points: points
                        }
                    }));

                    resolve(teams);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }
}

export default TeamService;
export { DefaultTeamAdapterOptions }