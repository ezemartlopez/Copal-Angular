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

    this.baseModulo = this.apiUrl + '/espacios-colaborativos'; //Base de este servicio
  }
  //Observables cada uno configurado con su ruta
  private getEspacios(): Observable<any> {
    let url = this.baseModulo + '/espacios';
    return this.http.get<any>(url);
  }
  private getRecursos(): Observable<any[]>{
    let url = this.baseModulo + '/recursos';
    return this.http.get<any[]>(url);
  }
  private getDepartamentos(): Observable<any[]>{
    let url = this.apiUrl + '/subDepartamento?formato=basico';
    return this.http.get<any[]>(url);
  }
  private postReserva(reserva: any){
    let url = this.apiUrl + '/espacios-colaborativos/reservas';
    return this.http.post<any>(url,{...reserva});
  }

  //Funciones para obtener datos en el servicio
  //GET ESPACIOS
  public obtenerEspacios(setter: (data: any[]) => void, setterError: () => void){
    this.getEspacios().subscribe({
        next: res => {// Callback para datos
          console.log('Exito llamada: ', res.content);
          setter(res.content);//setter la data
        },
        error: error => {// Callback para errores
          console.log('Error: ', error);
         setterError(); //setter funcion error
        },
        complete: () => {// Callback para la finalización
          console.log('Termino la llamada Espacios');
        }
      }); 
  }
  //GET RECURSOS
  public obtenerRecursos(setter: (data: any[]) => void, setterError: () => void){
    this.getRecursos().subscribe({
        next: data => {// Callback para datos
          console.log('Exito llamada: ', data);
          setter(data);
        },
        error: error => {// Callback para errores
          console.log('Error: ', error);
          setterError();
        },
        complete: () => {// Callback para la finalización
          console.log('Termino la llamada Recursos');
        }
      });  
  }
  // GET DEPARTAMENTOS
  public obtenerDepartamentos(setter: (data: any[]) => void, setterError: () => void){
    this.getDepartamentos().subscribe({
        next: data => {// Callback para datos
          console.log('Exito llamada: ', data);
          setter(data);
        },
        error: error => {// Callback para errores
          console.log('Error: ', error);
          setterError();
        },
        complete: () => {// Callback para la finalización
          console.log('Termino la llamada Departamentos');
        }
      });  
  }
  // POST RESERVA
  public crearReserva(reserva: any, successHandler: (res: any) => void, errorHandler: () => void){
    this.postReserva(reserva).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);// Puedes realizar acciones adicionales aquí
        successHandler(response);
      },
      error: (response) => {
        console.log('status error: ', response.status);
        console.log('codigo: ', response.error.text);
        
        
        console.error('Error en la solicitud POST:', response);// Puedes manejar errores aquí
        console.error('Mensaje de error:', response.message);
        errorHandler();
      }
    });  
  }

}
