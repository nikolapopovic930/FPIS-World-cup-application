import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IEditTeamDto {
    name: string;
    flag: string;
    groupId: number;
}

interface IEditTeam extends IServiceData {
    name: string;
    flag: string;
    group_id: number;
}

const EditTeamSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 4,
            maxLength: 64
        },
        flag: {
            type: "string",
            minLength: 4,
            maxLength: 64
        },
        groupId: {
            type: "string",
            minLength: 1,
            maxLength: 64
        },
    },
    required: [
        "name",
        "flag",
        "groupId"
    ],
    additionalProperties: false
}

const EditTeamValidator = ajv.compile(EditTeamSchema);

export default IEditTeam;
export { EditTeamValidator, IEditTeamDto };