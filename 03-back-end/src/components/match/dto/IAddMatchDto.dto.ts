import Ajv from 'ajv';
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

ajv.addFormat('custom-date-time', function (dateTimeString: any) {
    if (typeof dateTimeString === 'object') {
        dateTimeString = dateTimeString.toISOString();
    }

    return !isNaN(Date.parse(dateTimeString));
});

interface IAddMatchDto {
    firstTeam: number;
    secondTeam: number;
    firstTeamGoals: number;
    secondTeamGoals: number;
    date: Date;
    stadiumId: number;
    isSurrendered: number;
}

interface IAddMatch extends IServiceData {
    first_team: number;
    second_team: number;
    first_team_goals: number;
    second_team_goals: number;
    date: Date;
    stadium_id: number;
    is_surrendered: number;
}

const AddMatchSchema = {
    type: "object",
    properties: {
        firstTeam: {
            type: "number"
        },
        secondTeam: {
            type: "number"
        },
        firstTeamGoals: {
            type: "number"
        },
        secondTeamGoals: {
            type: "number"
        },
        date:{
           
        },
        stadiumId: {
            type: "number"
        },
        isSurrendered: {
            type: "number"
        },
    },
    required: [
        "firstTeam",
        "secondTeam",
        "date",
        "stadiumId",
        "isSurrendered"
    ],
    additionalProperties: false
}

const AddMatchValidator = ajv.compile(AddMatchSchema);

export default IAddMatch;
export { AddMatchValidator, IAddMatchDto };