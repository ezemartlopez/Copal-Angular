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
    this.apiUrl = this.production? 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar': 'https://localhost:8080';
    this.baseModulo = this.apiUrl + '/espacios-colaborativos'; //Base de este servicio
  }
  //Observables cada uno configurado con su ruta
  private getReservas(): Observable<any[]> {
    let url = this.baseModulo + '/reservas';
    return this.http.get<any>(url);
  }
  private getReservasEstados(): Observable<any[]>{
    let url = this.baseModulo + '/reservas/estados';
    return this.http.get<any[]>(url);
  }
  private getRecursos(): Observable<any[]>{
    let url = this.baseModulo + '/recursos';
    return this.http.get<any[]>(url);
  }
  private putReserva(id: any, data: any){
    let url = this.baseModulo + `/reservas/${id}`;
    return this.http.put<any>(url, data);
  }
  private deleteReserva(id: any){
    let url = this.baseModulo + `/reservas/${id}`;
    return this.http.delete<any>(url);
  } 
  //Funciones para obtener datos en el servicio
  //GET RESERVAS
  public obtenerReservas(setter: (data: any[]) => void, setterError: () => void){
    this.getReservas().subscribe({
        next: res => {// Callback para datos
          console.log('Exito llamada: ', res);
          setter(res);//setter la data
        },
        error: error => {// Callback para errores
          console.log('Error: ', error);
         setterError(); //setter funcion error
        },
        complete: () => {// Callback para la finalización
          console.log('Termino la llamada Reservas');
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
  // GET RESERVAS ESTADOS
  public obtenerReservasEstados(setter: (data: any[]) => void, setterError: () => void){
    this.getReservasEstados().subscribe({
        next: data => {// Callback para datos
          /* console.log('Exito llamada: ', data); */
          setter(data);
        },
        error: error => {// Callback para errores
          console.log('Error: ', error);
          setterError();
        },
        complete: () => {// Callback para la finalización
         /*  console.log('Termino la llamada Departamentos'); */
        }
      });  
  }
  // PUT RESERVA
  public editarReserva(id: any,nuevoEstado: any, successHandler: (res: any) => void, errorHandler: () => void){
    this.putReserva(id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);// Puedes realizar acciones adicionales aquí
        successHandler(response);
      },
      error: (error) => {
        console.log('status error: ', error);
        errorHandler();
      }
    });  
  }
  // DELETE RESERVA
  public eliminarReserva(id: any, successHandler: (res: any) => void, errorHandler: () => void){
    this.deleteReserva(id).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);// Puedes realizar acciones adicionales aquí
        successHandler(response);
      },
      error: (error) => {
        console.log('status error: ', error);
        errorHandler();
      }
    });  
  }
}


/*EJEMPLO DE USO 
//MANEJAR PETICION GET
obtenerDatosPorGet(){
  this.api.llamadaGetEjemplo(
    (data)=>{ this.arrayACargarData = data;},
    ()=>{ this.arrayACargarData = []; }
  );
}

//MANEJAR PETICION PUT
editarDatosPorPut(id: number, nuevoEstado: any){
  this.api.llamadaPutEjemplo(
    id,
    nuevoEstado,
    (response) => {
      // Maneja la respuesta exitosa aquí
    },
    () => {
      // Maneja el error aquí
    }
  );
}

//MANEJAR PETICION DELETE
eliminarDatosPorDelete(id: number){
  this.api.llamadaDeleteEjemplo(
    id,
    (response) => {
      // Maneja la respuesta exitosa aquí
    },
    () => {
      // Maneja el error aquí
    }
  );
}
*/