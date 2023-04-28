import ITeamDetailedModel from "./ITeamDetailed.model"

export default interface IGroup {
    groupId: number,
    name: string

    teams: ITeamDetailedModel[]
}