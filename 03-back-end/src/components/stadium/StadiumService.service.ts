import StadiumModel from "./StadiumModel.model";
import * as mysql2 from "mysql2/promise";
import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddStadium from './dto/IAddStadiumDto.dto';
import IEditStadium from './dto/IEditStadiumDto.dto';

interface IStadiumAdapterOptions extends IAdapterOptions {

}

const DefaultStadiumAdapterOptions: IStadiumAdapterOptions = {

}

class StadiumService extends BaseService<StadiumModel, IStadiumAdapterOptions>{

    tableName(): string {
        return "stadium";
    }

    protected async adaptToModel(data: any): Promise<StadiumModel> {
        const stadium: StadiumModel = new StadiumModel();

        stadium.stadiumId = +data?.stadium_id;
        stadium.name = data?.name;
        stadium.place = data?.place;
        stadium.picture = data?.picture;

        return stadium;
    }

    public async add(data: IAddStadium): Promise<StadiumModel> {
        return this.baseAdd(data, DefaultStadiumAdapterOptions);
    }

    public async editById(stadiumId: number, data: IEditStadium): Promise<StadiumModel> {
        return this.baseEditById(stadiumId, data, DefaultStadiumAdapterOptions);
    }

    public async deleteById(stadiumId: number): Promise<boolean> {
        return this.baseDelete(stadiumId);
    }
}

export default StadiumService;
export { DefaultStadiumAdapterOptions }