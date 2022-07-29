import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Aquí es donde se generan los campos de la base de datos de domicilios:
@Entity()
export class Domicilios {
  @PrimaryGeneratedColumn()
  idDomi: number;

  @Column()
  cp: number;

  @Column()
  colonia: string;

  @Column()
  municipio: string;
}
