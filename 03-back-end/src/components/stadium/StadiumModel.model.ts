import IModel from '../../common/IModel.interface';

class StadiumModel implements IModel {
    stadiumId: number;
    name: string;
    place: number;
}

export default StadiumModel;