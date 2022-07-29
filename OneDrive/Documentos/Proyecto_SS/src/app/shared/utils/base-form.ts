import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseForm {
  errorMessage = null;

  constructor(private fb: UntypedFormBuilder) {}
  
  baseForm = this.fb.group({
    folio: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    fecha_nac: ['', [Validators.required]],
    edad: ['', [Validators.required]],
    foto: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.maxLength(10)]],
    est_civil: ['', [Validators.required]],
    vigencia: ['', [Validators.required]],
    escolaridad: [''],
    mot_escolaridad: [''],
    otro_escuela: [''],
    ocupacion: [''],
    firma: [''],
    leer_escribir: [''],
    lengua: [''],
    cual_lengua: [''],
    enfermedad: [''],
    cual_enfermedad: [''],
    prestaciones: [''],
    hijos: [''],
    cuant_hijos: [''],
    cuant_menores: [''],
    cp: [''],
    calle: [''],
    colonia: [''],
    municipio: [''],
    vivienda: [''],
    otro_vivienda: [''],
    techo: [''],
    muros: [''],
    dren_des: [''],
    cocina: [''],
    cuartos: [''],
    ing_esposo: [''],
    ing_esposa: [''],
    ing_hijos: [''],
    ing_programa: [''],
    ing_pension: [''],
    total_ing: [''],
    egr_alimentacion: [''],
    egr_renta: [''],
    egr_predial: [''],
    egr_agua: [''],
    egr_luz: [''],
    egr_gas_lena: [''],
    egr_transporte: [''],
    egr_educacion: [''],
    egr_medicamentos: [''],
    egr_ropa_zap: [''],
    egr_entretenimiento: [''],
    egr_serv_digitales: [''],
    total_egr: [''],
    diferencia_ing_egr: [''],
    sit_economica: [''],
    diagnostico: [''],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field)!; // Aquí es donde se va a llamar las acciones de los mensajes de error.
    return (
      (this.baseForm.get(field)!.touched || this.baseForm.get(field)!.dirty) &&
      !this.baseForm.get(field)!.valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field)!;

    if (errors) {
      const maxlength = errors?.['maxLength']?.requiredLength;
      const messages: any = {
        required: 'Debes introducir la información requerida.',
        maxlength: `El campo solo puede tener un maximo de ${maxlength} caracteres`,
      };

      const errorKey: any = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
