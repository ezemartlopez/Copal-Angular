import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StringifyOptions } from 'querystring';
import {ApiServiceService} from '../../../servicios/api-service.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() showModalDelete: boolean = false;
  @Input() infoReservas:any;
  @Output() closeModal = new EventEmitter<void>();

  estado:number;
  fechaFormateada:string;


  constructor(private apiService:ApiServiceService){
    this.estado=0;
    var fechaString = "2023-11-30";
    this.fechaFormateada = this.formatearFecha(fechaString);
  }
  
  ngOnInit() {
   
  }

  cerrarModal(): void {
    this.showModalDelete = false;
    this.closeModal.emit();
  }
  getClasePorEstado(estado: number): string {
    switch (estado) {
      case 1:
        return 'estado-pendiente';
      case 2:
        return 'estado-aceptado';
      case 3:
        return 'estado-aceptado-parcial';
      case 4:
        return 'estado-rechazado';
      case 5:
        return 'estado-cancelado';
      default:
        return 'estado-desconocido';
    }
  }
  public formatearFecha(fechaString:string) {
    // Convertir la cadena de fecha a un objeto Date
    var fecha = new Date(fechaString);

    // Días de la semana y meses en español
    var diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    // Obtener el día de la semana, el día del mes y el mes
    var diaSemana = diasSemana[fecha.getDay()];
    var diaMes = fecha.getDate();
    var mes = meses[fecha.getMonth()];
    var anio = fecha.getFullYear();

    // Construir la cadena de fecha formateada
    var fechaFormateada = diaSemana + ', ' + diaMes + ' de ' + mes + ' ' + anio;

    return fechaFormateada;
  }

  deleteReserva(id: number){
    this.apiService.eliminarReserva(
      id,
      (response) => {
        // Maneja la respuesta exitosa aquí
        console.log("Se elimino la reserva:", id);
      },
      () => {
        // Maneja el error aquí
      }
    );
  }
  recargarPagina() {
    window.location.reload();
  }
  eliminarReserva(){
    this.deleteReserva(this.infoReservas.id);
    this.cerrarModal()
    this.recargarPagina();
  }
}
