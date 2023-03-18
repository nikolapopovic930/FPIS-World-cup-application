import GroupModel from "./GroupModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddGroup from './dto/IAddGroupDto.dto';
import IEditGroup from './dto/IEditGroupDto.dto';

interface IGroupAdapterOptions extends IAdapterOptions {

}

const DefaultGroupAdapterOptions: IGroupAdapterOptions = {

}

class GroupService extends BaseService<GroupModel, IGroupAdapterOptions>{

    tableName(): string {
        return "group";
    }

    protected async adaptToModel(data: any, options: IGroupAdapterOptions): Promise<GroupModel> {
        return new Promise(async (resolve) => {
        const group: GroupModel = new GroupModel();

        group.groupId = +data?.group_id;
        group.name = data?.name;
        
        


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