import { Fecha } from './../../../eventos/vistas/ver-evento/ver-evento.component';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService} from './Servicios/api-service.service'
@Component({
  selector: 'app-historial-espacios',
  templateUrl: './historial-espacios.component.html',
  styleUrls: ['./historial-espacios.component.css']
})
export class HistorialEspaciosComponent implements OnInit {
  espacios: any[];
  InfoEspacios: any[];
  loadding: boolean;
  espacioActual: number;
  constructor(private api: ApiServiceService) {
    this.espacioActual = 0;
    this.espacios = [];
    this.loadding = true;
    this.InfoEspacios = [];
  }
  modificarFecha(fecha: string){
    let fecha_mod = fecha.substring(0,10);
    const [anio, mes, dia] = fecha_mod.split('-');
    return `${dia}/${mes}/${anio}`
  }
  modificarHorario(incio: string, fin:string){
    let m_inicio = incio.substring(0,5);
    let m_fin = fin.substring(0,5);
    return `${m_inicio}-${m_fin}`
  }
  cambiarEspacio(id: number){
    this.espacioActual = id;
  }

  ngOnInit(): void {
    this.obtenerEspacios();
  }
  obtenerEspacios(){
    this.api.obtenerEspacios(
      (data) => {this.espacios = data; console.log('espacios: ', data); this.obtenerInformacionEspacios();},
      () => {console.error('No se pudo obtener los datos'); },
      () => {console.log("Info obtenida:\n", this.InfoEspacios); this.loadding = false;}
    );
  }
  obtenerInformacionEspacios(){
    if(this.espacios.length!==0){
      for (const espacio of this.espacios){
        this.obtenerEspacioPorId(espacio.id);
      }
    }
    else{
      console.log('Informacion vacia');
      
    }
  }
  obtenerEspacioPorId(id:number){
    this.api.obtenerEspacioPorId(
      id,
      (data)=>{ this.InfoEspacios.push(data)},
      () => {},
      () => { }
    ); 
  }
}
