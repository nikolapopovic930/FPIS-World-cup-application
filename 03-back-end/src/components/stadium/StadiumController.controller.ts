import StadiumService, { DefaultStadiumAdapterOptions } from './StadiumService.service';
import { Request, Response } from 'express';
import { AddStadiumValidator, IAddStadiumDto } from './dto/IAddStadiumDto.dto';
import { EditStadiumValidator, IEditStadiumDto } from './dto/IEditStadiumDto.dto';
class StadiumController {
    private stadiumService: StadiumService;

    constructor(stadiumService: StadiumService) {
        this.stadiumService = stadiumService;
    }

    async getAll(req: Request, res: Response) {

        this.stadiumService.getAll(DefaultStadiumAdapterOptions)
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.stadiumService.getById(id, DefaultStadiumAdapterOptions)
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

        this.stadiumService.add({
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

        this.stadiumService.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.stadiumService.editById(id, {
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

        this.stadiumService.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.stadiumService.deleteById(id)
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