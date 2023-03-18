import IModel from '../../common/IModel.interface';
import GroupModel from '../group/GroupModel.model';

class TeamModel implements IModel {
    teamId: number;
    name: string;
    flag: string;
    groupId: number;

    group?: GroupModel = null;
}

export default TeamModel;