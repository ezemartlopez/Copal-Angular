import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private production = true;//Variable que controla la configuracion api
  private apiUrl;
  private baseModulo;
  constructor(private http: HttpClient) { 
    if(!this.production){ this.apiUrl = 'https://localhost:8080'; }//Local Api backEnd
    else{ this.apiUrl = 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar';}//Produccion Api BackEnd

    this.baseModulo = this.apiUrl + '/departamentos'; //Base de este servicio
  }
  //Observables cada uno configurado con su ruta
  private getUsuarios(): Observable<any> {
    let url = this.apiUrl + '/usuarios?formato=basico';
    return this.http.get<any>(url);
  }
  private getRoles(): Observable<any[]>{
    let url = this.baseModulo + '/roles';
    return this.http.get<any[]>(url);
  }
  private postDepartamento(depto: any){
    let url = this.baseModulo;
    return this.http.post<any>(url,{...depto});
  }
  private putDepartamento(id: number,depto: any){
    let url = this.baseModulo + `/${id}`;
    return this.http.put<any>(url,{...depto});
  }
  private getDepartamento(id: string): Observable<any>{
    let url = this.baseModulo + `/${id}`;
    return this.http.get<any>(url);
  }
  private postAutoridadGrupo(data: any, idGrupo: number): Observable<any>{
    const url = `${this.baseModulo}/${idGrupo}/autoridad`;
    return this.http.post<any>(url, data);
  }
  private deleteAutoridad(idAutoridad: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/autoridad/${idAutoridad}`);
  }

    // GET Usuarios
    public obtenerUsuarios(setter: (data: any[]) => void, setterError: () => void){
      this.getUsuarios().subscribe({
          next: data => {// Callback para datos
            console.log('Exito llamada: ', data);
            setter(data);
          },
          error: error => {// Callback para errores
            console.log('Error: ', error);
            setterError();
          },
          complete: () => {// Callback para la finalización
            console.log('Termino la llamada usuarios');
          }
        });  
    }

    // GET Usuarios
    public obtenerRoles(setter: (data: any[]) => void, setterError: () => void){
      this.getRoles().subscribe({
          next: data => {// Callback para datos
            console.log('Exito llamada: ', data);
            setter(data);
          },
          error: error => {// Callback para errores
            console.log('Error: ', error);
            setterError();
          },
          complete: () => {// Callback para la finalización
            console.log('Termino la llamada roles');
          }
        });  
    }
    // GET Usuarios
    public obtenerDepartamento(id: string, setter: (data: any) => void, setterError: () => void){
      this.getDepartamento(id).subscribe({
          next: data => {// Callback para datos
            console.log('Exito llamada: ', data);
            setter(data);
          },
          error: error => {// Callback para errores
            console.log('Error: ', error);
            setterError();
          },
          complete: () => {// Callback para la finalización
            console.log('Termino la llamada de departamento');
          }
        });  
    }
    // POST GRUPO
    public crearDepartamento(depto: any, successHandler: (res: any) => void, errorHandler: () => void){
      this.postDepartamento(depto).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);// Puedes realizar acciones adicionales aquí
          successHandler(response);
        },
        error: (response) => {
          console.error('Error en la solicitud POST:', response);// Puedes manejar errores aquí
          errorHandler();
        }
      });  
    }
    public actualizarDepartamento(id: number, depto: any, successHandler: (res: any) => void, errorHandler: () => void){
      this.putDepartamento(id, depto).subscribe({
        next: (response) => {
          console.log('Respuesta Update:', response);// Puedes realizar acciones adicionales aquí
          successHandler(response);
        },
        error: (response) => {
          console.error('Error en la solicitud PUT:', response);// Puedes manejar errores aquí
          errorHandler();
        }
      });  
    }
    // AGREGAR UNA AUTORIDAD A GRUPO
    public agregarAutoridadAGrupo(idGrupo : number, idUsuario: number, idRol : number, successHandler: (res: any) => void, errorHandler: () => void) { 
      const data = {usuarioId: idUsuario, rolId: idRol};
      this.postAutoridadGrupo(data, idGrupo).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);// Puedes realizar acciones adicionales aquí
          successHandler(response);
        },
        error: (response) => {
          console.error('Error en la solicitud POST:', response);// Puedes manejar errores aquí
          errorHandler();
        }
      });
    }
    public eliminarAutoridadGrupo(idGrupo: number, successHandler?: () => void, errorHandler?: () => void){
      this.deleteAutoridad(idGrupo).subscribe({
        next: () => {
          console.log('Operación de eliminación exitosa');
          // Puedes realizar acciones adicionales después de la eliminación
          if (successHandler) {
            successHandler();
          }
        },
        error: (error) => {
          console.error('Error al eliminar la autoridad del grupo:', error);
          // Puedes manejar el error de acuerdo a tus necesidades
          if (errorHandler) {
            errorHandler();
          }
        }
      });
    }
}
