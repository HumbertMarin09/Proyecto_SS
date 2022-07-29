import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormPass } from '@app/shared/utils/base-form-pass';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  hide2 = true;

  private subscription: Subscription = new Subscription();

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public passForm: BaseFormPass
  ) {}

  ngOnInit(): void {
    this.passForm.baseForm.reset();
  }

  changePass() {
    if (this.passForm.baseForm.invalid) {
      return;
    }

    const formValue = this.passForm.baseForm.value;
    this.subscription.add(
      this.authSvc.chPassword(formValue).subscribe((res) => {
        this.router.navigate(['']);
        window.alert('¡La contraseña se ha cambiado con éxito!');
      })
    );
  }

  checkField(field: string): boolean {
    return this.passForm.isValidField(field)!;
  }
}
