import IModel from '../../common/IModel.interface';
import GroupModel from '../group/GroupModel.model';

class TeamModel implements IModel {
    teamId: number;
    name: string;
    groupId: number;

    group?: GroupModel ;
}

export default TeamModel;