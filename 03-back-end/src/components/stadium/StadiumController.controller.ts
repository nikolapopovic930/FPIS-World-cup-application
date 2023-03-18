import StadiumService, { DefaultStadiumAdapterOptions } from './StadiumService.service';
import { Request, Response } from 'express';
import { AddStadiumValidator, IAddStadiumDto } from './dto/IAddStadiumDto.dto';
import { EditStadiumValidator, IEditStadiumDto } from './dto/IEditStadiumDto.dto';
import BaseController from '../../common/BaseController';
class StadiumController extends BaseController {

    async getAll(req: Request, res: Response) {

        this.services.stadium.getAll(DefaultStadiumAdapterOptions)
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.services.stadium.getById(id, DefaultStadiumAdapterOptions)
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
        const data = req.body as IAddStadiumDto;

        if (!AddStadiumValidator(data)) {
            return res.status(400).send(AddStadiumValidator.errors);
        }

        this.services.stadium.add({
            name: data.name,
            place: data.place
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
        const data = req.body as IEditStadiumDto;

        if (!EditStadiumValidator(data)) {
            return res.status(400).send(EditStadiumValidator.errors);
        }

        this.services.stadium.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.stadium.editById(id, {
                    name: data.name,
                    place: data.place
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

        this.services.stadium.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.stadium.deleteById(id)
                    .then(result => {
                        res.send('This stadium has been deleted!');
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

export default StadiumController;