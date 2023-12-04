import { Grupo, Rol, Usuario } from './../formulario-departamento/formulario-departamento.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  private base = 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar';
  //private base = 'http://localhost:8080';
  private apiUrlRoles = this.base + '/departamentos/roles'; // Reemplaza con tu URL real
  private apiUrlGrupos = this.base + '/departamentos?formato=basico';
  private apiUrlUsuarios = this.base + '/usuarios?formato=basico';
  constructor(private http: HttpClient) {}

  public getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrlRoles).pipe(
      catchError((error:any) => {
        console.error('Error en la solicitud:', error);
        return of([]); // En caso de error, emite una lista vacía
      })
    );
  }
  public getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrlGrupos).pipe(
      catchError((error:any) => {
        console.error('Error en la solicitud:', error);
        return of([]); // En caso de error, emite una lista vacía
      })
    );
  }

  public getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrlUsuarios).pipe(
      catchError((error:any) => {
        console.error('Error en la solicitud:', error);
        return of([]); // En caso de error, emite una lista vacía
      })
    );
  }
}