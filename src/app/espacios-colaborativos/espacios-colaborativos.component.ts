import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ApiServiceService} from '../espacios-colaborativos/servicios/api-service.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-espacios-colaborativos',
  templateUrl: './espacios-colaborativos.component.html',
  styleUrls: ['./espacios-colaborativos.component.css'],
})
export class EspaciosColaborativosComponent implements OnInit{
  
  reservasCopal: any;
  loadding: boolean;
  infoCargada: boolean;
  seAplicoFiltro: boolean;
  //Opciones
  opcionesDepartamentos: any[];
  opcionesEstados: any[];
  opcionesTipoReserva: any;
  //Formulario
  selectDepartamento:number;
  selectEstado: number;
  selectModalidad: string;
  inputNombre: string;
  
  mostrarModal = false;
  constructor( private apiService: ApiServiceService){
    this.opcionesDepartamentos = [];
    this.opcionesEstados = [];
    this.loadding = true;
    this.infoCargada = false;
    this.loadding = true;
    this.infoCargada = false;
    this.seAplicoFiltro = false;
    this.selectDepartamento = 0;
    this.selectEstado = 0;
    this.selectModalidad = 'Por Modalidad';
    this.inputNombre = '';
  }
   
  ngOnInit(): void {
      this.getReservas();
      this.getReservasEstado();
  } 
  redireccionar(url:string){
    window.location.href = url;
  }
  hayEventos(){
    console.log(this.reservasCopal.length);
    return this.reservasCopal.length !== 0;
    
  }
  abrirModal(): void {
    this.mostrarModal = true;
    console.log("Modal abierto");
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    console.log("Modal cerrado");
  }
  abrirModalEdit(): void {
    this.mostrarModal = true;
    console.log("Modal abierto");
  }

  cerrarModalEdit(): void {
    this.mostrarModal = false;
    console.log("Modal cerrado");
  }

  //Obtener reservas API
  getReservas(){
    this.apiService.obtenerReservas(
      data => {
        // Lógica para manejar los datos exitosos
        // Aquí puedes asignar los datos a una propiedad de tu componente si es necesario
        this.reservasCopal=data;
      },
      () => {
        // Lógica para manejar errores
        console.log('Error al obtener reservas');
      }
    );
  }
  getReservasEstado(){
    this.apiService.obtenerReservasEstados(
      data => {
        // Lógica para manejar los datos exitosos
        console.log('Datos de reservas estados:', data);
        this.opcionesTipoReserva=data;
        // Aquí puedes asignar los datos a una propiedad de tu componente si es necesario
      },
      () => {
        // Lógica para manejar errores
        console.log('Error al obtener reservas estados');
      }
    );
  }
}
