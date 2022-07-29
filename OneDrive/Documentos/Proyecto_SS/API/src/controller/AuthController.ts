import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      //Si detecta que falta el usuario y la contraseña regresará el siguiente error:
      return res
        .status(400)
        .send({ message: '¡Correo y contraseña requeridos!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (e) {
      //Si detecta que el usuario o la contraseña estan mal, regresará el siguiente error:
      return res
        .status(400)
        .send({ message: '¡Correo o contraseña incorrectos!' });
    }

    // Se verifica la contraseña después de encriptarla, y si no, arroja un error:
    if (!user.checkPassword(password)) {
      return res
        .status(400)
        .send({ message: '¡Correo o contraseña incorrectos!' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '12h' }
    );

    res.send({ message: 'OK', token, userId: user.id, role: user.role });
  };

  // Esto que realizaremos, es para que permita al usuario cambiar de contraseña.
  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    // Lo que haremos es condicionar a que se ponga la vieja contraseña, y la nueva para poder cambiarla.
    if (!(oldPassword && newPassword)) {
      res
        .status(400)
        .send({ message: 'La vieja y la nueva contraseña son requeridas.' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    // Va a buscar al usuario, si no lo encuentra, va a arrojar un error:
    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: '¡Algo ha salido mal!' });
    }

    // Hace un chequeo de que la contraseña vieja sea correcta, y si no manda un error.
    if (!user.checkPassword(oldPassword)) {
      return res.status(401).send({
        message:
          'La contraseña que ingresaste es incorrecta. ¡Pon tu contraseña!',
      });
    }

    // Hace la validación para dar de alta la nueva contraseña:
    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    // Valida si hay error, y si lo hay lanza el error:
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    // Encriptación de la nueva contraseña, y guardado de la misma:
    user.hashPassword();
    userRepository.save(user);

    res.status(200).send({ message: 'OK' });
  };
}
export default AuthController;
