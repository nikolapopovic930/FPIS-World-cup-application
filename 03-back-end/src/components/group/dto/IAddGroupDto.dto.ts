import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IAddGroupDto {
    name: string;
}

interface IAddGroup extends IServiceData {
    name: string;
}

const AddGroupSchema = {
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

const AddGroupValidator = ajv.compile(AddGroupSchema);

export default IAddGroup;
export { AddGroupValidator, IAddGroupDto };