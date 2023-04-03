import ITeam from "./ITeam.model"

export default interface IGroup {
    groupId: number,
    name: string

    teams: ITeam[]
}