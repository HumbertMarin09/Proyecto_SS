import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false; // Generamos esto, para ver que la función de abierto y cerrado del sidebar este bien.
  private destroy$ = new Subject<any>();

  constructor(private utilsSvc: UtilsService) {}

  // Aquí mandamos a decir que identifique si el sidebar esta abierto, para poder cerrarlo:
  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

  // Mandamos a destruir la suscripción:

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
