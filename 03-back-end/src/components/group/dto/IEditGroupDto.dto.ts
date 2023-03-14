import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IEditGroupDto {
    name: string;
}

interface IEditGroup extends IServiceData {
    name: string;
}

const EditGroupSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 64
        }
    },
    required: [
        "name"
    ],
    additionalProperties: false
}

const EditGroupValidator = ajv.compile(EditGroupSchema);

export default IEditGroup;
export { EditGroupValidator, IEditGroupDto };