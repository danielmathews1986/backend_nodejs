import type { Request, Response } from 'express'
import Budgest from '../models/Budgest'
import Expense from '../models/Expense'
export class BudgetController {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgest = await Budgest.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // Todo: Filtrar por el usuario autenticado
                where: {
                    userId: req.user.id
                }
            })
            res.json(budgest)
        } catch (error) {
            res.status(500).json({ error: 'Hubo en un error' })
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const budgest = new Budgest(req.body)
            budgest.userId = req.user.id
            await budgest.save()
            res.status(201).json('Presupuesto creado correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static getById = async (req: Request, res: Response) => {
        const budget = await Budgest.findByPk(req.budget.id, {
            include: [Expense],
        })
        console.log(JSON.stringify(budget, null, 2));
        res.json(budget)
        
    }

//     @Get(':id')
// async getBudget(@Param('id') id: number, @Res() res: Response) {
//   const budget = await Budgest.findByPk(id, {
//     include: [Expense]
//   });

//   res.json(budget);
// }

    static updateById = async (req: Request, res: Response) => {
        // Escribir los cambios del body
         console.log("responseee bugest........",req.budget)
         console.log("response",req.body)
        await req.budget.update(req.body)
        res.json('Presupuesto actualizado')
    }

    static deleteById = async (req: Request, res: Response) => {
        // Escribir lo cambios del body
        await req.budget.destroy(req.body)
        res.json('Presupuesto eliminado correctamente')
    }
}