import { UserResponse } from '@app/shared/models/user.interface';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from '@app/shared/services/utils.service';
import { BaseFormUser } from '@app/shared/utils/base-form-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = ''; // Esto permitirá identificar si es admin el usuario.
  isLogged = false; // Creamos el termino para visualizar un botoón u otro, si esta loggeado.

  private destroy$ = new Subject<any>();

  // Se va usar esto para que se pueda efectuar la función del toggle, y que nos pueda aparecer el Sidebar.
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService, private userForm: BaseFormUser) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        if (user != null) {
          this.isLogged = true;
        }
        this.isAdmin = user?.role;
      }); // Aquí le estamos generando una verificación, de que si esta loggeado muestre algo, y si no, muestre lo otro.
  }

  ngOnDestroy(): void {
    // Le decimos que destruya la suscripción, una vez se haya desloggeado el usuario, para evitar un consumo alto de recursos:
    this.destroy$.next({});
    this.destroy$.complete();
  }

  //Aquí aparecen nustras barras para abrir el sidebar.
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
    this.utilsSvc.openSidebar(false); // Aquí mandamos a decir que no deje abierto el sidebar, que lo cierre.
    this.isLogged = false;
    this.userForm.baseForm.reset();
  }
}
