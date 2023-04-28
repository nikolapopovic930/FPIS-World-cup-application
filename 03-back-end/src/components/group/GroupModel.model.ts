import IModel from '../../common/IModel.interface';


class GroupModel implements IModel {
    groupId: number;
    name: string;
    teams?: any[];
}

export default GroupModel;