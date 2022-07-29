import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Forms } from '../entity/Form';
import { Menores } from '../entity/Menores';
import { validate } from 'class-validator';

export class MenorController {
  // Método para crear menores:
  static nuevoMenor = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      sexo_hijo,
      fecha_nac_hijo,
      edad_hijo,
      estudia_hijo,
      nivel_hijo,
      no_estudia_hijo,
      otro_hijo,
      nivel_max_hijo,
      enfermedad_hijo,
      cual_enfermedad_hijo,
    } = req.body;

    let form;

    const formRepository = getRepository(Forms);

    try {
      form = await formRepository.findOneOrFail({ where: { foto: id } });

      if (!form) {
        return;
      } else {
        const menores = new Menores();

        menores.sexo_hijo = sexo_hijo;
        menores.fecha_nac_hijo = fecha_nac_hijo;
        menores.edad_hijo = edad_hijo;
        menores.estudia_hijo = estudia_hijo;
        menores.nivel_hijo = nivel_hijo;
        menores.no_estudia_hijo = no_estudia_hijo;
        menores.otro_hijo = otro_hijo;
        menores.nivel_max_hijo = nivel_max_hijo;
        menores.enfermedad_hijo = enfermedad_hijo;
        menores.cual_enfermedad_hijo = cual_enfermedad_hijo;
        menores.forms = form;

        const validationOps = {
          validationError: { target: false, value: false },
        };

        const errores = await validate(menores, validationOps);
        if (errores.length > 0) {
          return res.status(400).send(errores);
        }

        const menorRepository = getRepository(Menores);

        // console.log(menores);
        await menorRepository.manager.save(menores);
      }
    } catch (e) {
      return res
        .status(409)
        .send({ message: '¡No se puede guardar al menor!' });
    }

    res.status(201).send({ message: '¡Menor subido con éxito!' });
  };

  // Método para editar menores:
  static editMenor = async (req: Request, res: Response) => {
    let menores;
    let form;
    const formas = Object.values(req.params);
    const { id } = req.params;

    const {
      sexo_hijo,
      fecha_nac_hijo,
      edad_hijo,
      estudia_hijo,
      nivel_hijo,
      no_estudia_hijo,
      otro_hijo,
      nivel_max_hijo,
      enfermedad_hijo,
      cual_enfermedad_hijo,
    } = req.body;

    const forms = {
      forms: formas[0],
      folio: formas[0],
    };

    const formRepository = getRepository(Forms);
    const menorRepository = getRepository(Menores);

    const validationOps = {
      validationError: { target: false, value: false },
    };

    try {
      menores = await menorRepository
      .createQueryBuilder('menor')
      .where('menor.forms = :forms', { forms: forms.forms })
      .andWhere('menor.id_menor = :id_menor', { id_menor: id })
      .getOne();

      if (!menores) {
        form = await formRepository.findOneOrFail(forms.folio);

        const menor = new Menores();

        menor.sexo_hijo = sexo_hijo;
        menor.fecha_nac_hijo = fecha_nac_hijo;
        menor.edad_hijo = edad_hijo;
        menor.estudia_hijo = estudia_hijo;
        menor.nivel_hijo = nivel_hijo;
        menor.no_estudia_hijo = no_estudia_hijo;
        menor.otro_hijo = otro_hijo;
        menor.nivel_max_hijo = nivel_max_hijo;
        menor.enfermedad_hijo = enfermedad_hijo;
        menor.cual_enfermedad_hijo = cual_enfermedad_hijo;
        menor.forms = form;

        const errores = await validate(menor, validationOps);
        if (errores.length > 0) {
          return res.status(400).send(errores);
        }

        await menorRepository.manager.save(menor);
      } else {
        menores.sexo_hijo = sexo_hijo;
        menores.fecha_nac_hijo = fecha_nac_hijo;
        menores.edad_hijo = edad_hijo;
        menores.estudia_hijo = estudia_hijo;
        menores.nivel_hijo = nivel_hijo;
        menores.no_estudia_hijo = no_estudia_hijo;
        menores.otro_hijo = otro_hijo;
        menores.nivel_max_hijo = nivel_max_hijo;
        menores.enfermedad_hijo = enfermedad_hijo;
        menores.cual_enfermedad_hijo = cual_enfermedad_hijo;
        
        const errores = await validate(menores, validationOps);
          if (errores.length > 0) {
            return res.status(400).send(errores);
          }

        // console.log('Actualización ->', menores)

        await menorRepository.manager.save(menores);
      }
    } catch (e) {
      return res
        .status(404)
        .send({ message: 'No se pudo actualizar el menor' });
    }

    res.status(201).send({ message: '¡El menor se ha actualizado!' });
  };
}
