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
  private getEspacioId(id: any): Observable<any>{
    let url = this.baseModulo + `/espacios/${id}`;
    return this.http.get<any>(url);
  }

  //Funciones para obtener datos en el servicio
  //GET ESPACIOS
  public obtenerEspacios(setter: (data: any[]) => void, setterError: () => void, endCall?: ()=> void){
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
          if(endCall){ endCall(); }
        }
      }); 
  }
  public obtenerEspacioPorId(id: any, setter: (data: any) => void, setterError: () => void, endCall?:()=>void){
    this.getEspacioId(id).subscribe({
      next: response => {// Callback para datos
        console.log('Exito llamada: ', response);
        setter(response);//setter la data
      },
      error: error => {// Callback para errores
        console.log('Error: ', error);
       setterError(); //setter funcion error
      },
      complete: () => {// Callback para la finalización
        console.log('Termino la llamada Espacios por Id: ', id);
        if(endCall){ endCall(); }
      }
    }); 
  }
}
