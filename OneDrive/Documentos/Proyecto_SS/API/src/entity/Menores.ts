import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Forms } from './Form';

// Aquí es donde se generan los campos de la base de datos del formulario de menores:
@Entity()
export class Menores {
  @PrimaryGeneratedColumn()
  id_menor: number;

  @Column({
    nullable: true,
  })
  @IsOptional()
  sexo_hijo: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  @IsOptional()
  fecha_nac_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  edad_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  estudia_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  nivel_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  no_estudia_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  otro_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  nivel_max_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  enfermedad_hijo: string;

  @Column({
    nullable: true,
  })
  @IsOptional()
  cual_enfermedad_hijo: string;

  @ManyToOne(() => Forms, (forms) => forms.menores, {
    createForeignKeyConstraints: true,
  })
  forms: Forms;
}
