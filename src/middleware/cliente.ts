import { Request, Response, NextFunction } from "express";
import Cliente from "../models/Cliente";
import { param, validationResult } from "express-validator";

declare global {
    namespace Express {
        interface Request {
            cliente: Cliente
        }
    }
}

export const validateClienteId = async (req: Request, res: Response, next: NextFunction) => {
    await param('clienteId')
        .isInt().withMessage('ID no válido')
        .custom(value => value > 0).withMessage('ID no válido')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

export const validateClienteExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clienteId } = req.params
        const cliente = await Cliente.findByPk(clienteId)
        if (!cliente) {
            const error = new Error('cliente no encontrado')
            return res.status(404).json({ error: error.message })
        }
        req.cliente = cliente
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }
}

export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
    if (req.cliente.userId !== req.user.id) {
        const error = new Error('Acción no válida')
        return res.status(401).json({ error: error.message })
    }
    next()
}