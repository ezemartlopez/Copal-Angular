import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar';
  //private base = 'http://localhost:8080';
  private apiUrlRoles = this.base + '/departamentos/roles';
  private apiUrlGrupos = this.base + '/departamentos?formato=basico';
  private apiUrlUsuarios = this.base + '/usuarios?formato=basico';
  private apiUrlDepartamentos = this.base + '/departamentos';
  private apiUrlSubDepartamento = this.base + '/subDepartamento';

  constructor(private http: HttpClient) { }
  /************************************USO GENERAL*************************************/
  //OBTENER ROLES
  getRoles(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.apiUrlRoles).subscribe(
      (data) => {
        setter(data);// Llama a la función "setter" para guardar los datos
      },
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) {
          errorHandler(error);
        }
        // Establece una lista vacía como respuesta
        setter([]);
      }
    );
  }


  // OBTENER TODOS LOS USUARIOS
  getUsuarios(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.apiUrlUsuarios).subscribe(
      (data) => {
        setter(data);// Llama a la función "setter" para guardar los datos
      },
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) {
          errorHandler(error);
        }
         // Establece una lista vacía como respuesta
        setter([]);
      }
    );
  }

  // OBTNER TODOS LOS GRUPOS
  getGrupos(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.apiUrlGrupos).subscribe(
      (data) => {
        setter(data);// Llama a la función "setter" para guardar los datos
      },
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) {
          errorHandler(error);
        }
        // Establece una lista vacía como respuesta
        setter([]);
      }
    );
  }
  // OBTENER TODOS LOS DEPARTAMENTOS
  getDepartamentos(setter: (data: any) => void, errorHandler: (error: any) => void): void {
    this.http.get(this.apiUrlDepartamentos).subscribe(
      (data) => {
        setter(data);// Llama a la función "setter" para guardar los datos
      },
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) {
          errorHandler(error);
        }
        // Establece una lista vacía como respuesta
        setter([]);
      }
    );
  }

    /************************************USO ESPECIFICO SUBDEPARTAMENTO*************************************/

  // GET SUBDEPARTAMENTO POR ID
  //departamentos/{idPadre}/subDepartamento/{id}
  getMicroDepartamento(idHijo:number,setter: (data: any) => void, errorHandler: (error: any) => void): void {
    const ruta = this.apiUrlSubDepartamento + `/${idHijo}`;
    this.http.get(ruta).subscribe(
      (data) => {
        setter(data);// Llama a la función "setter" para guardar los datos
      },
      (error) => {
        // En caso de error, Llama a la función "errorHandler" si se proporciona
        if (errorHandler) {
          errorHandler(error);
        }
        // Establece una lista vacía como respuesta
        setter([]);
      }
    );
  }

  //EDITAR SUBDEPARTAMENTO
  editarDepartamento(id : number, data: any, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const ruta = this.apiUrlSubDepartamento + `/${id}`
    this.http.put(ruta, data).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  //ELIMINAR DEPARTAMENTO
  eliminarDepartamento(id : number, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const ruta = this.apiUrlSubDepartamento + `/${id}`
    this.http.delete(ruta).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  agregarIcono(id : number, data : FormData, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.http.post(this.apiUrlSubDepartamento + `/${id}/imagen` , data).subscribe(
        response => {
          if (successCallback) { successCallback(response); 
            
           }
           console.log(response);
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

    // POST CREAR SUBDEPARTAMENTO EN GROUPO ID
  //Post crear microDepartamento
  crearDepartamento(id: number, data: any, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const ruta = this.apiUrlDepartamentos + `/${id}/subDepartamento`;
    this.http.post(ruta, data).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }
    /************************************USO ESPECIFICO PARA GRUPOS*************************************/
  //GET GRUPO
  getGrupo(id : number, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
      //const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      const ruta = this.apiUrlDepartamentos + `/${id}`
      this.http.get(ruta).subscribe(
          response => {
            if (successCallback) { successCallback(response); }
            return;
          },
          error => {
            console.log(error);
            if (errorCallback) { errorCallback(error); }
            return;
          }
        );
    }  
  // POST GRUPO
  //Post crear GRUPO
  crearGrupo(data: any, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    this.http.post(this.apiUrlDepartamentos, data).subscribe(
        response => {
          if (successCallback) { successCallback(response); 
            
           }
           console.log(response);
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  //EDITAR GRUPO
  editarGrupo(id : number, data: any, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const ruta = this.apiUrlDepartamentos + `/${id}`
    this.http.put(ruta, data).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  //ELIMINAR GRUPO
  eliminarGrupo(id : number, successCallback?: (response: any) => void, errorCallback?: (error: any) => void ): void {
    const ruta = this.apiUrlDepartamentos + `/${id}`
    this.http.delete(ruta).subscribe(
        response => {
          if (successCallback) { successCallback(response); }
          return;
        },
        error => {
          console.log(error);
          if (errorCallback) { errorCallback(error); }
          return;
        }
      );
  }

  public agregarAutoridadAGrupo(idGrupo : number, idUsuario: number, idRol : number): Observable<any> { 
    const url = `${this.apiUrlDepartamentos}/${idGrupo}/autoridad`;
    const data = {usuarioId: idUsuario, rolId: idRol};
    return this.http.post<any>(`${this.apiUrlDepartamentos}/${idGrupo}/autoridad`, data);
  }

  public agregarAutoridadASubdepartamento(idSubDepto : number, idUsuario: number, idRol : number): Observable<any> { 
    
    const data = {usuarioId: idUsuario, rolId: idRol};
    return this.http.post<any>(`${this.apiUrlSubDepartamento}/${idSubDepto}/autoridad`, data);
  }

  public agregarUsuarioASubdepartamento(idSubDepto : number, idUsuario:number): Observable<Object> {  
    return this.http.post<any>(`${this.apiUrlSubDepartamento}/${idSubDepto}/usuario/${idUsuario}`, null);
  }

  public eliminarAutoridad(idAutoridad: number): Observable<Object> {  
    return this.http.delete<any>(`${this.base}/autoridad/${idAutoridad}`);
  }

  public eliminarUsuarioASubdepartamento(idSubDepto : number, idUsuario:number): Observable<Object> {  
    return this.http.delete<any>(`${this.apiUrlSubDepartamento}/${idSubDepto}/usuario/${idUsuario}`);
  }
}
