import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/; // Expresión regular para condiciones de password.
  errorMessage = null;

  constructor(private fb: UntypedFormBuilder) {}

  baseForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength]],
    email: ['', [Validators.required, Validators.email]], // Se manda a llamar la validación de los criterios del usuario
    password: [
      '',
      [Validators.required, Validators.pattern(this.isValidPassword)],
    ], // Se manda a llamar la validación de los criterios de la contraseña.
    role: ['', [Validators.required]],
  });

  // Lo que hacemos aquí, es validar si el usuario realizo algo dentro de los campos, para lanzar el error.
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
      const minlenght = errors?.['minLength']?.requiredLength;
      const messages: any = {
        required: 'Debes introducir la información requerida.',
        minlenght: `El nombre de usuaria debe tener minimo ${minlenght} caracteres.`,
        email: 'No es un correo valido.',
        pattern: 'Contraseña invalida. Revisa tu contraseña.',
      };

      const errorKey: any = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
