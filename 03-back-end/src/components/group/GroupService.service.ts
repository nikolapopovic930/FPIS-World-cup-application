import GroupModel from "./GroupModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddGroup from './dto/IAddGroupDto.dto';
import IEditGroup from './dto/IEditGroupDto.dto';
import TeamDetailedModel from "../team/TeamDetailedModel.model";

interface IGroupAdapterOptions extends IAdapterOptions {
    loadTeams: boolean
}

const DefaultGroupAdapterOptions: IGroupAdapterOptions = {
    loadTeams: false
}

class GroupService extends BaseService<GroupModel, IGroupAdapterOptions>{

    tableName(): string {
        return "group";
    }

    sortFildName(): string {
        return "name";
    }

    

    protected async adaptToModel(data: any, options: IGroupAdapterOptions): Promise<GroupModel> {
        return new Promise(async (resolve) => {
        const group: GroupModel = new GroupModel();

        group.groupId = +data?.group_id;
        group.name = data?.name;

        if (options.loadTeams) {
            group.teams = await this.services.team.getAllByGroupId2(group.groupId, {loadGroup: false});
            group.teams.sort((a: TeamDetailedModel, b: TeamDetailedModel) => {
                if (a.points > b.points) 
                    return -1;
                else if(a.points < b.points) 
                    return 1;
                else {
                    if(a.goalDifference > b.goalDifference)
                        return -1;
                    else
                        return 1;
                }
            })
        
        }
        resolve(group);
        });
    }


    public async add(data: IAddGroup): Promise<GroupModel> {
        return this.baseAdd(data, DefaultGroupAdapterOptions);
    }

    public async editById(groupId: number, data: IEditGroup): Promise<GroupModel> {
        return this.baseEditById(groupId, data, DefaultGroupAdapterOptions);
    }

    public async deleteById(groupId: number): Promise<boolean> {
        return this.baseDelete(groupId);
    }

    
}

export default GroupService;
export { DefaultGroupAdapterOptions }