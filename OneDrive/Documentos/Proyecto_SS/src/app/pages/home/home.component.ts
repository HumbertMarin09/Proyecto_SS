import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth/auth.service';
import { FormsService } from './service/forms.service';
import { ModalFormComponent } from '../home/components/modal-form/modal-form.component';
import { UserResponse } from '@app/shared/models/user.interface';
import { BaseForm } from '@app/shared/utils/base-form';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit, OnDestroy {
  filtrado: any;
  filtrado2: any;
  filtrado3: any;
  filtrado4: any;
  isAdmin = '';
  myGroup = new UntypedFormGroup({
    buscador: new UntypedFormControl(),
    busca: new UntypedFormControl(),
    buscador2: new UntypedFormControl(),
    busca2: new UntypedFormControl(),
    buscador3: new UntypedFormControl(),
    busca3: new UntypedFormControl(),
    buscador4: new UntypedFormControl(),
    busca4: new UntypedFormControl(),
  });

  displayedColumns: string[] = [
    'folio',
    'nombre',
    'apellido',
    'edad',
    'sexo',
    'est_civil',
    'telefono',
    'cuant_menores',
    'colonia',
    'sit_economica',
    'acciones',
  ];

  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  constructor(
    public authSvc: AuthService,
    private formSvc: FormsService,
    public formForm: BaseForm,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formSvc.todos().subscribe((forms) => {
      this.dataSource.data = forms;
    });
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: UserResponse) => {
        this.isAdmin = user?.role;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // onDelete(folioId: number): void {
  //   if (window.confirm('¿Enserio quieres eliminar este formulario?')) {
  //     this.formSvc
  //       .borrar(folioId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((res) => {
  //         window.alert('¡Formulario eliminado con éxido!');
  //         // Resultado de la actualización después del update.
  //         this.formSvc.todos().subscribe((forms) => {
  //           this.dataSource.data = forms;
  //         });
  //       });
  //   }
  // }

  onOpenModal(form = {}): void {
    console.log('Form->', form);
    let dialogRef = this.dialog.open(ModalFormComponent, {
      height: '700px',
      width: '1500px',
      hasBackdrop: false,
      data: { title: 'Nuevo formulario', form },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`, typeof result);
      // Resultado del update, después de actualizar.
      this.formSvc.todos().subscribe((forms) => {
        this.dataSource.data = forms;
      });
    });
    this.formForm.baseForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  filtro() {
    if (this.myGroup.value.busca === 'folio') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.folio.toString() === filter;
      };
    } else if (this.myGroup.value.busca === 'nombre') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.nombre.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'apellido') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.apellido.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'edad') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.edad.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'sexo') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sexo.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'est_civil') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.est_civil.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'colonia') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.colonia.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'cuant_menores') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.cuant_menores.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca === 'sit_economica') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sit_economica.toLowerCase().includes(filter);
      };
    }
  }

  filtrar() {
    let filterValue = this.myGroup.value.buscador.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (filterValue === '') {
      this.formSvc.todos().subscribe((forms) => {
        this.dataSource.data = forms;
      });
    } else {
      this.filtrado = this.dataSource.filteredData;
      this.dataSource.data = this.filtrado;
    }
  }

  filtro2() {
    if (this.myGroup.value.busca2 === 'folio') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.folio.toString() === filter;
      };
    } else if (this.myGroup.value.busca2 === 'nombre') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.nombre.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'apellido') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.apellido.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'edad') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.edad.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'sexo') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sexo.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'est_civil') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.est_civil.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'colonia') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.colonia.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'cuant_menores') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.cuant_menores.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca2 === 'sit_economica') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sit_economica.toLowerCase().includes(filter);
      };
    }
  }

  filtrar2() {
    let filterValue2 = this.myGroup.value.buscador2.trim().toLowerCase();
    this.dataSource.filter = filterValue2;
    if (filterValue2 === '') {
      this.dataSource.data = this.filtrado;
    } else {
      this.filtrado2 = this.dataSource.filteredData;
      this.dataSource.data = this.filtrado2;
    }
  }

  filtro3() {
    if (this.myGroup.value.busca3 === 'folio') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.folio.toString() === filter;
      };
    } else if (this.myGroup.value.busca3 === 'nombre') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.nombre.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'apellido') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.apellido.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'edad') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.edad.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'sexo') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sexo.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'est_civil') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.est_civil.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'colonia') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.colonia.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'cuant_menores') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.cuant_menores.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca3 === 'sit_economica') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sit_economica.toLowerCase().includes(filter);
      };
    }
  }

  filtrar3() {
    let filterValue3 = this.myGroup.value.buscador3.trim().toLowerCase();
    this.dataSource.filter = filterValue3;
    if (filterValue3 === '') {
      this.dataSource.data = this.filtrado2;
    } else {
      this.filtrado3 = this.dataSource.filteredData;
      this.dataSource.data = this.filtrado3;
    }
  }

  filtro4() {
    if (this.myGroup.value.busca4 === 'folio') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.folio.toString() === filter;
      };
    } else if (this.myGroup.value.busca4 === 'nombre') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.nombre.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'apellido') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.apellido.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'edad') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.edad.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'sexo') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sexo.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'est_civil') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.est_civil.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'colonia') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.colonia.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'cuant_menores') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.cuant_menores.toLowerCase().includes(filter);
      };
    } else if (this.myGroup.value.busca4 === 'sit_economica') {
      this.dataSource.filterPredicate = function (
        data: any,
        filter: string
      ): boolean {
        return data.sit_economica.toLowerCase().includes(filter);
      };
    }
  }

  filtrar4() {
    let filterValue4 = this.myGroup.value.buscador4.trim().toLowerCase();
    this.dataSource.filter = filterValue4;
    if (filterValue4 === '') {
      this.dataSource.data = this.filtrado3;
    } else {
      this.filtrado4 = this.dataSource.filteredData;
      this.dataSource.data = this.filtrado4;
    }
  }
}
