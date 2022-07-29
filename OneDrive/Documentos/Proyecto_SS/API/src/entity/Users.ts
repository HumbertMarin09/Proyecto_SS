import { Entity, PrimaryGeneratedColumn, Unique, Column } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from "bcryptjs";

// Aquí es donde se generan los campos de nuestra base de datos:
@Entity()
@Unique(["email"])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  role: string;

  // Se hace un hash del password para encriptarlo:
  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  // Se hace una recuperación del password, y valida o verifica si es correcto:
  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
