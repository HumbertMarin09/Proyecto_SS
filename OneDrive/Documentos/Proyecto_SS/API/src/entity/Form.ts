import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Menores } from './Menores';

// Aquí es donde se generan los campos de la base de datos del formulario:
@Entity()
export class Forms {
  @PrimaryGeneratedColumn()
  folio: number;

  @Column()
  @IsNotEmpty()
  nombre: string;

  @Column()
  @IsNotEmpty()
  apellido: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  fecha_nac: string;

  @Column()
  @IsNotEmpty()
  edad: string;

  @Column({
    nullable: true,
  })
  foto: string;

  @Column()
  @IsNotEmpty()
  sexo: string;

  @Column()
  @IsNotEmpty()
  telefono: string;

  @Column()
  @IsNotEmpty()
  est_civil: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  vigencia: string;

  @Column({
    nullable: true,
  })
  escolaridad: string;

  @Column({
    nullable: true,
  })
  mot_escolaridad: string;

  @Column({
    nullable: true,
  })
  otro_escuela: string;

  @Column({
    nullable: true,
  })
  ocupacion: string;

  @Column({
    nullable: true,
  })
  firma: string;

  @Column({
    nullable: true,
  })
  leer_escribir: string;

  @Column({
    nullable: true,
  })
  lengua: string;

  @Column({
    nullable: true,
  })
  cual_lengua: string;

  @Column({
    nullable: true,
  })
  enfermedad: string;

  @Column({
    nullable: true,
  })
  cual_enfermedad: string;

  @Column({
    nullable: true,
  })
  prestaciones: string;

  @Column({
    nullable: true,
  })
  hijos: string;

  @Column({
    nullable: true,
  })
  cuant_hijos: string;

  @Column({
    nullable: true,
  })
  cuant_menores: string;

  @Column({
    nullable: true,
  })
  cp: string;

  @Column({
    nullable: true,
  })
  calle: string;

  @Column({
    nullable: true,
  })
  colonia: string;

  @Column({
    nullable: true,
  })
  municipio: string;

  @Column({
    nullable: true,
  })
  vivienda: string;

  @Column({
    nullable: true,
  })
  otro_vivienda: string;

  @Column({
    nullable: true,
  })
  techo: string;

  @Column({
    nullable: true,
  })
  muros: string;

  @Column({
    nullable: true,
  })
  dren_des: string;

  @Column({
    nullable: true,
  })
  cocina: string;

  @Column({
    nullable: true,
  })
  cuartos: string;

  @Column({
    nullable: true,
  })
  ing_esposo: number;

  @Column({
    nullable: true,
  })
  ing_esposa: number;

  @Column({
    nullable: true,
  })
  ing_hijos: number;

  @Column({
    nullable: true,
  })
  ing_programa: number;

  @Column({
    nullable: true,
  })
  ing_pension: number;

  @Column({
    nullable: true,
  })
  total_ing: number;

  @Column({
    nullable: true,
  })
  egr_alimentacion: number;

  @Column({
    nullable: true,
  })
  egr_renta: number;

  @Column({
    nullable: true,
  })
  egr_predial: number;

  @Column({
    nullable: true,
  })
  egr_agua: number;

  @Column({
    nullable: true,
  })
  egr_luz: number;

  @Column({
    nullable: true,
  })
  egr_gas_lena: number;

  @Column({
    nullable: true,
  })
  egr_transporte: number;

  @Column({
    nullable: true,
  })
  egr_educacion: number;

  @Column({
    nullable: true,
  })
  egr_medicamentos: number;

  @Column({
    nullable: true,
  })
  egr_ropa_zap: number;

  @Column({
    nullable: true,
  })
  egr_entretenimiento: number;

  @Column({
    nullable: true,
  })
  egr_serv_digitales: number;

  @Column({
    nullable: true,
  })
  total_egr: number;

  @Column({
    nullable: true,
  })
  diferencia_ing_egr: number;

  @Column({
    nullable: true,
  })
  sit_economica: string;

  @Column({
    nullable: true,
  })
  diagnostico: string;

  @OneToMany(() => Menores, (menores) => menores.forms)
  menores: Menores[];
}
