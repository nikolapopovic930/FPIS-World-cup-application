import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IEditStadiumDto {
    name: string;
    capacity: string;
    picture: string;
}

interface IEditStadium extends IServiceData {
    name: string;
    capacity: string;
    picture: string;
}

const EditStadiumSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 3,
            maxLength: 64
        },
        capacity: {
            type: "string",
            minLength: 4,
            maxLength: 64
        },
        picture: {
            type: "string",
            minLength: 4,
            maxLength: 64
        },
    },
    required: [
        "name",
        "capacity",
        "picture"
    ],
    additionalProperties: false
}

const EditStadiumValidator = ajv.compile(EditStadiumSchema);

export default IEditStadium;
export { EditStadiumValidator, IEditStadiumDto };