import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Users } from "../entity/Users";

// Lo que haremos aquí es la validación de rol de usuario:
export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = res.locals.jwtPayload;
    const userRepository = getRepository(Users);
    let user: Users;

    // Verifica si existe el ID de usuario, y si no arroja un error:
    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(401).json({ message: "¡No se encontro este ID de usuaria!" });
    }

    // Verificar si el rol de usuario coincide, y si no, arroja un error:
    const { role } = user;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({ message: "¡No estas autorizada!" });
    }
  };
};
