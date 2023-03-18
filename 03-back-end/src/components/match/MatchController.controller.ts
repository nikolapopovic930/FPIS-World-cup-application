import MatchService, { DefaultMatchAdapterOptions } from './MatchService.service';
import { Request, Response } from 'express';
import { AddMatchValidator, IAddMatchDto } from './dto/IAddMatchDto.dto';
import { EditMatchValidator, IEditMatchDto } from './dto/IEditMatchDto.dto';
import BaseController from '../../common/BaseController';
class MatchController extends BaseController {

    async getAll(req: Request, res: Response) {

        this.services.match.getAll(DefaultMatchAdapterOptions)
            .then(result => {
                res.send(result);
            }).catch(error => {
                res.status(500).send(error?.message);
            })
    }

    async getById(req: Request, res: Response) {

        const id: number = +req.params?.id;

        this.services.match.getById(id, DefaultMatchAdapterOptions)
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
        const data = req.body as IAddMatchDto;

        if (!AddMatchValidator(data)) {
            return res.status(400).send(AddMatchValidator.errors);
        }

        this.services.match.add({
            first_team: data.firstTeam,
            second_team: data.secondTeam,
            first_team_goals: data.firstTeamGoals,
            second_team_goals: data.secondTeamGoals,
            stadium_id: data.stadiumId,
            is_surrendered: data.isSurrendered
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
        const data = req.body as IEditMatchDto;

        if (!EditMatchValidator(data)) {
            return res.status(400).send(EditMatchValidator.errors);
        }

        this.services.match.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.match.editById(id, {
                    first_team: data.firstTeam,
                    second_team: data.secondTeam,
                    first_team_goals: data.firstTeamGoals,
                    second_team_goals: data.secondTeamGoals,
                    stadium_id: data.stadiumId,
                    is_surrendered: data.isSurrendered
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

        this.services.match.getById(id, {})
            .then(result => {
                if (result === null) {
                    return res.sendStatus(404);
                }

                this.services.match.deleteById(id)
                    .then(result => {
                        res.send('This match has been deleted!');
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

export default MatchController;