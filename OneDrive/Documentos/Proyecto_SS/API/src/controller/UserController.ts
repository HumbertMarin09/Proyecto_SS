import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { validate } from "class-validator";

export class UserController {
  // Este será el metodo para que funcione la obtención de usuarios:
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(Users); // Aquí se hace el proceso para llamar al repositorio.

    let users;

    // Le diremos que busque el usuario, si no lo encuentra, arroje un error:
    try {
      users = await userRepository.find({ select: ["id", "username", "email", "role"] }); //Con este le estamos diciendo que obtenga a nuestros usuarios cuando los busque.
    } catch (e) {
      res.status(404).send({ message: "¡Algo ha salido mal!" });
    }

    // Aquí condicionamos que si encuentra usuarios los arroje, y si no, arroje un error:
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send({ message: "No se encontraron usuarios." });
    }
  };

  // Este será el metodo para buscar a un usuario por id:
  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users); // Aquí se hace el proceso para buscar en el repositorio.

    // Similar al proceso pasado, se va buscar al usuario por id, si no se encuentra, lanzará un error:
    try {
      const user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (e) {
      res.status(404).send({ message: "No se encontro el usuario." });
    }
  };

  // Este será el metodo para crear nuevos usuarios:
  static new = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    const user = new Users(); // Aquí le decimos que crearemos un nuevo usuario:

    // Esta es la forma en como enviaremos la información del front a la base de datos:
    user.username = username;
    user.email = email;
    user.password = password;
    user.role = role;

    // Validación:
    // Se crea una validación para no mostrar los dats de usuario en la pantalla.
    const validationOps = {
      validationError: { target: false, value: false },
    };
    const errors = await validate(user, validationOps);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    // TODO: HASH PASSWORD

    const userRepository = getRepository(Users); // Aquí es donde se hace la conexión al repositorio.

    // Va a intentar guardar el usuario, pero si no le funciona, pues arrojará un error.
    try {
      user.hashPassword(); // Mandamos a llamar el proceso de encriptado del password.
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).send({ message: "¡Este correo ya esta en uso!" });
    }

    // Si todo esta bien:
    res.status(201).send({message: "¡Usuario creado!"});
  };

  // Este será el metodo para editar usuarios:
  static edit = async (req: Request, res: Response) => {
    let user;
    // Va a pedir el parametro del id para identificar al usuario, pero solo dejará cambiar el nombre de usuario, email y rol:
    const { id } = req.params;
    const { username, email, role } = req.body;

    const userRepository = getRepository(Users);

    // Va a intentar obtener el usuario, y si no arrojará el error:
    try {
      user = await userRepository.findOneOrFail(id);
      // Buscará el nombre de usuario, email y el rol para cambiarlos:
      user.username = username;
      user.email = email;
      user.role = role;
    } catch (e) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    // Se crea una validación para no mostrar los dats de usuario en la pantalla.
    const validationOps = {
      validationError: { target: false, value: false },
    };

    // Arrojará un error en caso de no lograr validar al usuario:
    const errors = await validate(user, validationOps);
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    // Va a intentar guardar los cambios, si no, arrojará un error:
    try {
      await userRepository.save(user);
    } catch (e) {
      return res.status(409).send({ message: "¡Este correo ya esta en uso!" });
    }

    // Si todo salio bien, enviará esto:
    res.status(201).send({ message: "¡El usuario se ha actualizado!" });
  };

  // Este será el metodo para eliminar usuarios:
  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(Users); // Aquí es donde se hace la conexión con el repositorio.
    let user: Users;

    // Se va a buscar el usuario, si no lo encuntra, arrojará un mensaje de error:
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (e) {
      return res.status(404).send({ message: "¡Usuario no encontrado!" });
    }

    // Borrar usuario:
    userRepository.delete(id);
    res.status(201).send({ message: "¡Usuario borrado!" });
  };
}

export default UserController;
