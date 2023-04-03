import IModel from '../../common/IModel.interface';
import TeamModel from '../team/TeamModel.model';

export interface IGroupTeams {
    team: TeamModel,
}

class GroupModel implements IModel {
    groupId: number;
    name: string;

    teams?: IGroupTeams[] = [];
}

export default GroupModel;