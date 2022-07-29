import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

// Lo que se hará aquí es generarun Token para que una vez haya accedido el usuario, pueda ejecutar las demás acciones como editar, hacer un nuevo usuario, etc. Solo si es un admin:
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['auth'];
  let jwtPayload;

  // Se genera el Token y se hace una verificación para verificar si esta bien:
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    return res.status(401).json({ message: '¡No estas autorizada!' });
  }

  const { userId, email } = jwtPayload;

  // Mandamos a generar el Token a través del login, y le indicamos su duración:
  const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
    expiresIn: '12h',
  });
  res.setHeader('token', newToken);

  // Llamar el siguiente:
  next();
};
