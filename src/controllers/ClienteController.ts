import type { Request, Response } from "express";
import Cliente from "../models/Cliente";
import Tarjeta from "../models/Tajeta";

export class ClienteController {
  static getAll = async (req: Request, res: Response) => {
    
    try {
      const cliente = await Cliente.findAll({
        order: [["createdAt", "DESC"]],
        // Todo: Filtrar por el usuario autenticado
        where: {
          userId: req.user.id,
        },
      });
      console.log("Cliente lista correctamente");
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: "Hubo en un error" });
    }
  };

  static addCliente = async (req: Request, res: Response) => {
    try {
      const cliente = new Cliente(req.body);
      cliente.userId = req.user.id;
      await cliente.save();
      res.status(201).json("Cliente creado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
      const cliente = await Cliente.findByPk(req.cliente.id, {
          include: [Tarjeta],
      })
      console.log(JSON.stringify(cliente, null, 2));
      res.json(cliente)

  }

  static updateClientById = async (req: Request, res: Response) => {
     console.log("responseee........",req.cliente)
    try {
        console.log("try in...............",)
      await req.cliente.update(req.body);
      res.json("cliente actualizado");
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  // static deleteById = async (req: Request, res: Response) => {
  //     // Escribir lo cambios del body
  //     await req.budget.destroy(req.body)
  //     res.json('Presupuesto eliminado correctamente')
  // }
  
}
