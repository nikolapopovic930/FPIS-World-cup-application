import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IAddTeamDto {
    name: string;
    groupId: number;
}

interface IAddTeam extends IServiceData {
    name: string;
    group_id: number;
}

const AddTeamSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 64
        },
        groupId: {
            type: "number"
        },
    },
    required: [
        "name",
        "groupId"
    ],
    additionalProperties: false
}

const AddTeamValidator = ajv.compile(AddTeamSchema);

export default IAddTeam;
export { AddTeamValidator, IAddTeamDto };