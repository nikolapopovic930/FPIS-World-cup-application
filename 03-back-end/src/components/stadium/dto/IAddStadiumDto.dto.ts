import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IAddStadiumDto {
    name: string;
    place: string;
    picture: string;
}

interface IAddStadium extends IServiceData {
    name: string;
    place: string;
    picture: string;
}

const AddStadiumSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 64
        },
        place: {
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
        "place",
        "picture"
    ],
    additionalProperties: false
}

const AddStadiumValidator = ajv.compile(AddStadiumSchema);

export default IAddStadium;
export { AddStadiumValidator, IAddStadiumDto };