import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BaseFormUser } from '@shared/utils/base-form-user';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public userForm: BaseFormUser,
  ) {}

  ngOnInit(): void {
    this.userForm.baseForm.get('username')!.setValidators(null);
    this.userForm.baseForm.get('username')!.updateValueAndValidity();

    this.userForm.baseForm.get('role')!.setValidators(null);
    this.userForm.baseForm.get('role')!.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onLogin(): void {
    if (this.userForm.baseForm.invalid) {
      return;
    }

    const formValue = this.userForm.baseForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  checkField(field: string): boolean {
    return this.userForm.isValidField(field)!;
  }
}
