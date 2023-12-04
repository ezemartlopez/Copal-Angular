import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './Servicios/api-service.service'
import { retry } from 'rxjs';

@Component({
  selector: 'app-ver-mi-reservacion',
  templateUrl: './ver-mi-reservacion.component.html',
  styleUrls: ['./ver-mi-reservacion.component.css']
})
export class VerMiReservacionComponent implements OnInit{
  exitoBusqueda: boolean;
  errorBusqueda: boolean;
  loadding: boolean;
  //inputs
  inputCodigo: Campo;
  //data obtenida api
  reserva: any | null;
  constructor(private api: ApiServiceService) {
    this.exitoBusqueda = false;
    this.errorBusqueda = false;
    this.loadding = false;
    this.inputCodigo = new Campo('');
    this.reserva = null;
  }
  ngOnInit(): void {
      
  }
  colsutarReserva(){
    this.loadding = true;
    if(this.inputCodigo.esValido()){
      this.loadding = false;
      this.obtenerReservacion();
    }
    this.loadding = false;
  }
  resetearVista(){
    this.exitoBusqueda = false;
    this.errorBusqueda = false;
    this.loadding = false;
    this.inputCodigo.reiniciarValor();
    this.reserva = null;
  }
  closeError(){ this.errorBusqueda = false;}
  personalizarFecha(fecha:string){
    const [anio, mes, dia] = fecha.split('-')
    return `${dia}/${mes}/${anio}`
  }

  //Llamadas a la API
  obtenerReservacion(){
    this.api.obtenerReservacion(
      this.inputCodigo.obtenerValor(),
      (data)=>{ this.reserva = data; this.exitoBusqueda = true; this.errorBusqueda = false;},
      ()=>{ this.errorBusqueda = true; }
      );
  }
  mensajePorEstado(id: number): string {
    return mensaje[id];
  }
}

interface MensajesPorEstado {
  [key: number]: string;
}

const mensaje: MensajesPorEstado = {
  1: 'Actualmente, estamos procesando tu solicitud y la estamos revisando cuidadosamente.',
  2: '¡Enhorabuena! Tu reserva ha sido Aceptada y estamos emocionados de tenerte con nosotros.',
  3: '¡Buenas Noticias! Tu reserva ha sido Aceptada, pero parcialmente..',
  4: 'Lamentablemente... Tu reserva ha sido Rechazada.',
  5: 'Esta reserva ha sido cancelada...'
};

export class Campo {
  touched: boolean;
  valor: string;

  constructor(valorInicial: string = '') {
    this.touched = false;
    this.valor = valorInicial;
  }

  fieldTouched() {
    this.touched = true;
  }

  reiniciarValor() {
    this.valor = '';
    this.touched = false;
  }

  tieneError(): boolean {
    return this.touched && this.valor.trim() === '';
  }
  mensajeError(){
    return this.touched && this.valor ==='' ? 'El Campo es Requerido': this.tieneError()? 'Codigo de Reserva Invalido' :'';
  }

  obtenerValor(): string {
    return this.valor;
  }
  cambiarValor(nuevo: string){
    this.valor = nuevo;
  }
  esValido(){
    this.fieldTouched();
    return !this.tieneError();
  }
}
