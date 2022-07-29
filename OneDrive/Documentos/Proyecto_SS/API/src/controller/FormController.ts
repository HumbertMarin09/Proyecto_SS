import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Forms } from '../entity/Form';
import { Menores } from '../entity/Menores';
import { validate } from 'class-validator';

export class FormController {
  // Método para ontener formularios:
  static todos = async (req: Request, res: Response) => {
    const formRepository = getRepository(Forms);

    let form;

    try {
      form = await formRepository.find({
        relations: ['menores'],
      });
    } catch (e) {
      res.status(404).send({ message: '¡Algo ha salido mal!' });
    }

    if (form.length > 0) {
      res.send(form);
    } else {
      res.status(404).send({ message: 'No se encontraron resultados.' });
    }
    // console.log('Form->', form);
  };

  // Método para ontener un solo formulario:
  static porFolio = async (req: Request, res: Response) => {
    const { folio } = req.params;

    const formRepository = getRepository(Forms);

    try {
      const forms = await formRepository.findOneOrFail(folio, {
        relations: ['menores'],
      });
      res.send(forms);
    } catch (e) {
      res
        .status(404)
        .send({ message: 'No se encontro lo que estas buscando.' });
    }
  };

  // Método para responder formularios:
  static nuevo = async (req: Request, res: Response) => {
    const {
      nombre,
      apellido,
      fecha_nac,
      edad,
      sexo,
      telefono,
      est_civil,
      vigencia,
      escolaridad,
      mot_escolaridad,
      otro_escuela,
      ocupacion,
      firma,
      leer_escribir,
      lengua,
      cual_lengua,
      enfermedad,
      cual_enfermedad,
      prestaciones,
      hijos,
      cuant_hijos,
      cuant_menores,
      cp,
      calle,
      colonia,
      municipio,
      vivienda,
      otro_vivienda,
      techo,
      muros,
      dren_des,
      cocina,
      cuartos,
      ing_esposo,
      ing_esposa,
      ing_hijos,
      ing_programa,
      ing_pension,
      total_ing,
      egr_alimentacion,
      egr_renta,
      egr_predial,
      egr_agua,
      egr_luz,
      egr_gas_lena,
      egr_transporte,
      egr_educacion,
      egr_medicamentos,
      egr_ropa_zap,
      egr_entretenimiento,
      egr_serv_digitales,
      total_egr,
      diferencia_ing_egr,
      sit_economica,
      diagnostico,
    } = req.body;

    const form = new Forms();

    form.nombre = nombre;
    form.apellido = apellido;
    form.fecha_nac = fecha_nac;
    form.edad = edad;
    form.foto = 'nuevo';
    form.sexo = sexo;
    form.telefono = telefono;
    form.est_civil = est_civil;
    form.vigencia = vigencia;
    form.escolaridad = escolaridad;
    form.mot_escolaridad = mot_escolaridad;
    form.otro_escuela = otro_escuela;
    form.ocupacion = ocupacion;
    form.firma = firma;
    form.leer_escribir = leer_escribir;
    form.lengua = lengua;
    form.cual_lengua = cual_lengua;
    form.enfermedad = enfermedad;
    form.cual_enfermedad = cual_enfermedad;
    form.prestaciones = prestaciones;
    form.hijos = hijos;
    form.cuant_hijos = cuant_hijos;
    form.cuant_menores = cuant_menores;
    form.cp = cp;
    form.calle = calle;
    form.colonia = colonia;
    form.municipio = municipio;
    form.vivienda = vivienda;
    form.otro_vivienda = otro_vivienda;
    form.techo = techo;
    form.muros = muros;
    form.dren_des = dren_des;
    form.cocina = cocina;
    form.cuartos = cuartos;
    form.ing_esposo = ing_esposo;
    form.ing_esposa = ing_esposa;
    form.ing_hijos = ing_hijos;
    form.ing_programa = ing_programa;
    form.ing_pension = ing_pension;
    form.total_ing = total_ing;
    form.egr_alimentacion = egr_alimentacion;
    form.egr_renta = egr_renta;
    form.egr_predial = egr_predial;
    form.egr_agua = egr_agua;
    form.egr_luz = egr_luz;
    form.egr_gas_lena = egr_gas_lena;
    form.egr_transporte = egr_transporte;
    form.egr_educacion = egr_educacion;
    form.egr_medicamentos = egr_medicamentos;
    form.egr_ropa_zap = egr_ropa_zap;
    form.egr_entretenimiento = egr_entretenimiento;
    form.egr_serv_digitales = egr_serv_digitales;
    form.total_egr = total_egr;
    form.diferencia_ing_egr = diferencia_ing_egr;
    form.sit_economica = sit_economica;
    form.diagnostico = diagnostico;

    const validationOps = {
      validationError: { target: false, value: false },
    };

    const errors = await validate(form, validationOps);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    const formRepository = getRepository(Forms);

    try {
      await formRepository.manager.save(form);
    } catch (e) {
      return res
        .status(409)
        .send({ message: '¡No se puede guardar el formulario!' });
    }

    res.status(201).send({ message: '¡Formulario subido con éxito!' });
  };

  // Nueva imagen:
  static newFile = async (req: Request, res: Response) => {
    const { file } = req.params;

    const formRepository = getRepository(Forms);

    const ruta = req.file.path;

    try {
      if (file === 'nuevo') {
        let form;

        form = await formRepository.findOneOrFail({ where: { foto: file } });

        // console.log(form);

        form.foto = ruta;

        const validationOps = {
          validationError: { target: false, value: false },
        };

        const errors = await validate(form, validationOps);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }

        await formRepository.manager.save(form);
      } else {
        let form;

        form = await formRepository.findOneOrFail(file);

        form.foto = ruta;

        const validationOps = {
          validationError: { target: false, value: false },
        };

        const errors = await validate(form, validationOps);
        if (errors.length > 0) {
          return res.status(400).send(errors);
        }

        await formRepository.manager.save(form);
      }
    } catch (e) {
      return res
        .status(409)
        .send({ message: '¡No se puede guardar la imagen!' });
    }

    res.status(201).send({ message: '¡Imagen guardada con éxito!' });
  };

  // Método para editar formularios:
  static editar = async (req: Request, res: Response) => {
    let form;
    const { folio } = req.params;

    const {
      nombre,
      apellido,
      fecha_nac,
      edad,
      sexo,
      telefono,
      est_civil,
      vigencia,
      escolaridad,
      mot_escolaridad,
      otro_escuela,
      ocupacion,
      firma,
      leer_escribir,
      lengua,
      cual_lengua,
      enfermedad,
      cual_enfermedad,
      prestaciones,
      hijos,
      cuant_hijos,
      cuant_menores,
      cp,
      calle,
      colonia,
      municipio,
      vivienda,
      otro_vivienda,
      techo,
      muros,
      dren_des,
      cocina,
      cuartos,
      ing_esposo,
      ing_esposa,
      ing_hijos,
      ing_programa,
      ing_pension,
      total_ing,
      egr_alimentacion,
      egr_renta,
      egr_predial,
      egr_agua,
      egr_luz,
      egr_gas_lena,
      egr_transporte,
      egr_educacion,
      egr_medicamentos,
      egr_ropa_zap,
      egr_entretenimiento,
      egr_serv_digitales,
      total_egr,
      diferencia_ing_egr,
      sit_economica,
      diagnostico,
    } = req.body;

    const formRepository = getRepository(Forms);

    try {
      form = await formRepository.findOneOrFail(folio);

      form.nombre = nombre;
      form.apellido = apellido;
      form.fecha_nac = fecha_nac;
      form.edad = edad;
      form.sexo = sexo;
      form.telefono = telefono;
      form.est_civil = est_civil;
      form.vigencia = vigencia;
      form.escolaridad = escolaridad;
      form.mot_escolaridad = mot_escolaridad;
      form.otro_escuela = otro_escuela;
      form.ocupacion = ocupacion;
      form.firma = firma;
      form.leer_escribir = leer_escribir;
      form.lengua = lengua;
      form.cual_lengua = cual_lengua;
      form.enfermedad = enfermedad;
      form.cual_enfermedad = cual_enfermedad;
      form.prestaciones = prestaciones;
      form.hijos = hijos;
      form.cuant_hijos = cuant_hijos;
      form.cuant_menores = cuant_menores;
      form.cp = cp;
      form.calle = calle;
      form.colonia = colonia;
      form.municipio = municipio;
      form.vivienda = vivienda;
      form.otro_vivienda = otro_vivienda;
      form.techo = techo;
      form.muros = muros;
      form.dren_des = dren_des;
      form.cocina = cocina;
      form.cuartos = cuartos;
      form.ing_esposo = ing_esposo;
      form.ing_esposa = ing_esposa;
      form.ing_hijos = ing_hijos;
      form.ing_programa = ing_programa;
      form.ing_pension = ing_pension;
      form.total_ing = total_ing;
      form.egr_alimentacion = egr_alimentacion;
      form.egr_renta = egr_renta;
      form.egr_predial = egr_predial;
      form.egr_agua = egr_agua;
      form.egr_luz = egr_luz;
      form.egr_gas_lena = egr_gas_lena;
      form.egr_transporte = egr_transporte;
      form.egr_educacion = egr_educacion;
      form.egr_medicamentos = egr_medicamentos;
      form.egr_ropa_zap = egr_ropa_zap;
      form.egr_entretenimiento = egr_entretenimiento;
      form.egr_serv_digitales = egr_serv_digitales;
      form.total_egr = total_egr;
      form.diferencia_ing_egr = diferencia_ing_egr;
      form.sit_economica = sit_economica;
      form.diagnostico = diagnostico;

    } catch (e) {
      return res.status(404).send({ message: 'Formulario no encontrado' });
    }

    const validationOps = {
      validationError: { target: false, value: false },
    };

    const errors = await validate(form, validationOps);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    try {
      await formRepository.manager.save(form);
    } catch (e) {
      return res.status(409).send({ message: "¡No se puede guardar este correo!" });
    }

    res.status(201).send({ message: '¡El formulario se ha actualizado!' });
  };

  // Método para eliminar formularios:
  // static borrar = async (req: Request, res: Response) => {
  //   const formas = Object.values(req.params);
  //   const forms = {
  //     forms: formas[0],
  //     folio: formas[0],
  //   };
  //   const formRepository = getRepository(Forms);
  //   const menorRepository = getRepository(Menores);
  //   let form: Forms;
  //   let menor;

  //   try {
  //     menor = await menorRepository.find({ where: { forms: forms.forms } });
  //     form = await formRepository.findOneOrFail(forms.folio);
  //   } catch (e) {
  //     return res.status(404).send({ message: '¡Formulario no encontrado!' });
  //   }

  //   if (!menor) {
  //     formRepository.delete(forms.folio);
  //   } else {
  //     menorRepository.remove(menor);
  //   }

  //   formRepository.delete(form);
  //   res.status(201).send({ message: '¡Formulario borrado!' });
  // };
}
export default FormController;
