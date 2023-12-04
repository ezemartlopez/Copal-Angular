import { Component, Input, OnInit } from '@angular/core';
import { ApiServicioService } from '../../servicios/api-servicio.service'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() infoEvento: any;
  @Input() estados: any = [];
  nuevoEstado: string;
  idNuevoestado: number;
  modificar: boolean;
  redireccionar(url:string):void{
    window.location.href = url;
  }
  exito = false;
  falla = false;
  constructor(private api: ApiServicioService) {
    this.nuevoEstado = "";
    this.modificar = false;
    this.idNuevoestado = 0;
  }

  ngOnInit(): void {
      
  }
  ver(){
    if(this.infoEvento){
      window.location.href = '/eventos/ver-evento/' + this.infoEvento.id;
    }
  }
  editar(){
    window.location.href = '/eventos/editar-evento/' + this.infoEvento.id
  }
  seCambioEstado(){
    if (this.nuevoEstado!== ""){
      return this.nuevoEstado !== this.infoEvento.estado;
    }
    return false;
  }
  modificarEstado(nuevo: string, id:number){
    console.log("Nuevo id: ", id);
    
    this.idNuevoestado = id;
    this.nuevoEstado = nuevo;
  }
  editarMiEstado(){
    this.modificar = !this.modificar;
  }
  timeError(){
    setTimeout(() => {
      this.falla =false;
    }, 1000);
  }
  timeSuccess(){
    setTimeout(() => {
      this.exito = false;
      this.redireccionar('/eventos');
    }, 1000);
  }
  editarEstadoEvento(){
    console.log('llamando api');
    
    this.modificar = false;
    // console.log(this.infoEvento);
    // console.log("Identificador del evento: ", this.infoEvento.id);
    // console.log("Se modificara a: ",this.idNuevoestado);
    //logica post
    this.api.putEventoEstado(
      this.infoEvento.id,
      this.idNuevoestado,
      () => { this.exito = true; this.timeSuccess(); console.log('exito');
      },
      ()=> { this.falla = true; this.timeError(); console.log('falla');
      }
    );
  }
}
