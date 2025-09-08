import type { Request, Response } from "express";
import Tarjeta from "../models/Tajeta";
import Cliente from "../models/Cliente";

export class TarjetaController {
  static create = async (req: Request, res: Response) => {
    try {
      const tarjeta = new Tarjeta(req.body);
      const cliente = await Cliente.findOne({ where: { id: req.cliente.id } })
      tarjeta.clienteId = req.cliente.id;
      //tarjeta.clienteId = cliente.id;
      cliente.cuenta = true;
      //await tarjeta.save();
      await Promise.all([tarjeta.save(), cliente.save()]);
      res.status(201).json("tarjeta agregado correctamente y cuenta actualizada");
    } catch (error) {
      //res.status(500).json({ json: "Hubo un error" });
      res.status(401).json({ error: error.message })
    }
  };

}
