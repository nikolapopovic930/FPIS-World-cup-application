import IModel from '../../common/IModel.interface';
import TeamModel from '../team/TeamModel.model';

class GroupModel implements IModel {
    groupId: number;
    name: string;
}

export default GroupModel;