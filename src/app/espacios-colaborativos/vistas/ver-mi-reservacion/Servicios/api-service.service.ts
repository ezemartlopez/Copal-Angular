import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private produccion: boolean = true;//variable que modifica la base
  private baseApi: string;
  
  constructor(private http: HttpClient) {
    this.baseApi = this.produccion? 'https://acc-squad-m1s2-back-dev.dds.disilab.cpci.org.ar': 'https://localhost:8080';
  }

  private getReserva(codigo:string): Observable<any> {
    let url = this.baseApi + `/espacios-colaborativos/reservas/${codigo}/estados`
    return this.http.get<any>(url);
  }

  obtenerReservacion(codigo:string, setter: (data: any) => void, setterError: () => void){
    this.getReserva(codigo).subscribe({
      next: data => {
        // Callback para datos
        console.log('data: ',data);
        setter(data);
      },
      error: error => {
        // Callback para errores
        console.error('Error: ', error);
        setterError();
      },
      complete: () => {
        // Callback para la finalización
        console.log('Finalizacion de la llamada del codigo');
        
      }
    });
    
  }
}
