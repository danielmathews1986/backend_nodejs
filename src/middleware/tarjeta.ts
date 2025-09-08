import { Request, Response, NextFunction, json } from "express";
import { body, param, validationResult } from 'express-validator'
import Tarjeta from "../models/Tajeta";

declare global {
    namespace Express {
        interface Request {
            tarjeta: Tarjeta
        }
    }
}

export const validateTarjetaInput = async(req: Request, res: Response, next: NextFunction) => {
    console.log("validateTarjetaInput")
    next()
}

export const validateTarjetaId = async(req: Request, res: Response, next: NextFunction) => {
    console.log("validateTarjetaId")
    await param('tarjetaId').isInt().custom(value => value > 0)
    .withMessage('ID no válido').run(req)

    let errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
            
    next()
}

export const validateTarjetaExists = async(req: Request, res: Response, next: NextFunction) => {
     console.log("validateTarjetaId")
    try {
        const { tarjetaId } = req.params
        const tarjeta = await Tarjeta.findByPk(tarjetaId)
        if (!tarjeta) {
            const error = new Error('tarjeta no encontrado')
            return res.status(404).json({ error: error.message })
        }
        req.tarjeta = tarjeta
        next()
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }
}