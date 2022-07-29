import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient) {}

  todos(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.API_URL}/forms`)
      .pipe(catchError(this.handlerError));
  }

  porFolio(folioId: number): Observable<any> {
    console.log(folioId);
    return this.http
      .get<any>(`${environment.API_URL}/forms/${folioId}`)
      .pipe(catchError(this.handlerError));
  }

  nuevo(form: any): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/forms`, form)
      .pipe(catchError(this.handlerError));
  }

  nuevoMenor(folioId: any, menor: any): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/menores/${folioId}`, menor)
      .pipe(catchError(this.handlerError));
  }

  newFile(id: any, file: any): Observable<any> {
    return this.http
    .post<any>(`${environment.API_URL}/forms/${id}`, file)
    .pipe(catchError(this.handlerError));
  }

  editar(folioId: number, form: any): Observable<any> {
    return this.http
      .patch<any>(`${environment.API_URL}/forms/${folioId}`, form)
      .pipe(catchError(this.handlerError));
  }

  editarMenor(folioId: number, id_menor: any, menor: any): Observable<any> {
    return this.http
      .patch<any>(`${environment.API_URL}/menores/${folioId}/${id_menor}`, menor)
      .pipe(catchError(this.handlerError));
  }

  // borrar(folioId: number): Observable<{}> {
  //   return this.http
  //     .delete<any>(`${environment.API_URL}/forms/${folioId}`)
  //     .pipe(catchError(this.handlerError));
  // }

  getDom(cp: any): Observable<any> {
    return this.http
      .get<any>(`${environment.API_URL}/domicilios/${cp}`)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
