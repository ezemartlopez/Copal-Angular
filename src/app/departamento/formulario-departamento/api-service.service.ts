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
  private postSubdepartamento(id: number, depto: any): Observable<any>{
    let url = this.baseModulo  + `/${id}/subDepartamento`;
    return this.http.post<any>(url,{...depto});
  }
  private getGrupo(id: number):Observable<any>{
    let url = this.baseModulo + `/${id}`;
    return this.http.get<any>(url);
  }
  private postIcono(idSub: number, data: FormData){
    let url = this.apiUrl  + `/subDepartamento/${idSub}/imagen`;
    return this.http.post<any>(url,data); 
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
    // GET GRUPO
    obtenerNombreGrupo(id: number, successHandler: (res: any) => void, errorHandler?: () => void){
      this.getGrupo(id).subscribe({
        next: data => {// Callback para datos
          console.log('Exito llamada: ', data);
          successHandler(data);
        },
        error: error => {// Callback para errores
          console.log('Error: ', error);
          if(errorHandler){ errorHandler();}
        },
        complete: () => {// Callback para la finalización
          console.log('Termino la llamada obtener grupo');
        }
      }); 
    }
    // POST SUBDEPARTAMENTO
    public crearSubDepartamento(id: number, depto: any, successHandler: (res: any) => void, errorHandler: () => void){
      this.postSubdepartamento(id, depto).subscribe({
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
    // POST IMAGEN SUBDEPARTAMENTO
    public agregarIconoSubDepartamento(id: number, data : FormData, successHandler?: (res: any) => void, errorHandler?: () => void){
      this.postIcono(id, data).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);// Puedes realizar acciones adicionales aquí
          if(successHandler){ successHandler(response);}
        },
        error: (response) => {
          console.error('Error en la solicitud POST:', response);// Puedes manejar errores aquí
          if(errorHandler){ errorHandler();}
        }
      });  
    }
}
/*
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
*/