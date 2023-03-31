import TeamService, { DefaultTeamAdapterOptions } from './TeamService.service';
import { Request, Response } from 'express';
import { AddTeamValidator, IAddTeamDto } from './dto/IAddTeamDto.dto';
import { EditTeamValidator, IEditTeamDto } from './dto/IEditTeamDto.dto';
import BaseController from '../../common/BaseController';
class TeamController extends BaseController {

    async getAll(req: Request, res: Response) {

        this.services.team.getAll(DefaultTeamAdapterOptions)
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.services.team.getById(id, DefaultTeamAdapterOptions)
            .then(result => {

                if (result === null) {
                    return res.sendStatus(404);
                }

                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddTeamDto;

        if (!AddTeamValidator(data)) {
            return res.status(400).send(AddTeamValidator.errors);
        }

        this.services.team.add({
            name: data.name,
            flag: data.flag,
            group_id: data.groupId
        })
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(400).send(error?.message);
            });

    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.id;
        const data = req.body as IEditTeamDto;

        if (!EditTeamValidator(data)) {
            return res.status(400).send(EditTeamValidator.errors);
        }

        this.services.team.getById(id, {loadGroup: true})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.team.editById(id, {
                    name: data.name,
                    flag: data.flag,
                    group_id: data.groupId
                })
                    .then(result => {
                        res.send(result);
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    })


            })
            .catch(error => {
                res.status(500).send(error?.message);
            });

    }

    async delete(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.team.getById(id, {loadGroup: true})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.team.deleteById(id)
                    .then(result => {
                        res.send('This team has been deleted!');
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    })


            })
            .catch(error => {
                res.status(500).send(error?.message);
            });

    }

    async getAllTeamsByGroupId(req: Request, res: Response) {
        const groupId: number = +req.params?.gid;

        this.services.group.getById(groupId, {loadTeams:true}).then(result => {
            if (result === null) {
                return res.sendStatus(404).send("Group not found");
            }

            this.services.team.getAllByGroupId(groupId,{
            loadGroup:true
                
            })
        
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);

        })  
        
    })

        .catch(error => {
            res.status(500).send(error?.message);
        });

    }
}

export default TeamController;