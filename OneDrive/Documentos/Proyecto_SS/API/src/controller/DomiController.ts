import { Domicilios } from '../entity/Domicilios';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

export class DomiController {
  // Método para buscar Colonia:
  static getDom = async (req: Request, res: Response) => {
    const { cp } = req.params;

    const domRepository = getRepository(Domicilios);

    let domi;

    try {
      domi = await domRepository.find({ select: ['colonia', 'municipio'],
        where: { cp: cp }
      });
      res.send(domi);
    } catch (e) {
      res
        .status(404)
        .send({ message: 'No se encontro lo que estas buscando.' });
    }
  };
}
