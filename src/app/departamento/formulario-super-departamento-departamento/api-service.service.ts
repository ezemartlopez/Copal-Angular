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
  private postReserva(depto: any){
    let url = this.baseModulo;
    return this.http.post<any>(url,{...depto});
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
    // POST RESERVA
    public crearDepartamento(depto: any, successHandler: (res: any) => void, errorHandler: () => void){
      this.postReserva(depto).subscribe({
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
}
