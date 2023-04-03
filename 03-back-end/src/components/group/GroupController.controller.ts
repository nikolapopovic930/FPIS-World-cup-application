import GroupService, { DefaultGroupAdapterOptions } from './GroupService.service';
import { Request, Response } from 'express';
import { AddGroupValidator, IAddGroupDto } from './dto/IAddGroupDto.dto';
import { EditGroupValidator, IEditGroupDto } from './dto/IEditGroupDto.dto';
import BaseController from '../../common/BaseController';
class GroupController extends BaseController{
    

    async getAll(req: Request, res: Response) {

        this.services.group.getAll({loadTeams: true})
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.services.group.getById(id, DefaultGroupAdapterOptions)
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
        const data = req.body as IAddGroupDto;

        if (!AddGroupValidator(data)) {
            return res.status(400).send(AddGroupValidator.errors);
        }

        this.services.group.add({
            name: data.name,
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
        const data = req.body as IEditGroupDto;

        if (!EditGroupValidator(data)) {
            return res.status(400).send(EditGroupValidator.errors);
        }

        this.services.group.getById(id, {loadTeams:false})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.group.editById(id, {
                    name: data.name,
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

        this.services.group.getById(id, {loadTeams:false})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.group.deleteById(id)
                    .then(result => {
                        res.send('This group has been deleted!');
                    })
                    .catch(error => {
                        res.status(400).send(error?.message);
                    })


            })
            .catch(error => {
                res.status(500).send(error?.message);
            });

    }
}

export default GroupController;