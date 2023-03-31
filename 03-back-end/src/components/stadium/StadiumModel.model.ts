import IModel from '../../common/IModel.interface';

class StadiumModel implements IModel {
    stadiumId: number;
    name: string;
    capacity: number;
    picture: string;
}

export default StadiumModel;