import { Component, Input , SimpleChanges, OnChanges} from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent{
  @Input() mensaje:string;
  @Input() titulo: string;
  @Input() showModal: boolean;
  constructor(){
    this.mensaje = "";
    this.titulo = "";
    this.showModal = true;
  }

  public closeModal(){
    this.showModal = false;
    console.log("cerrando");
    
  }
}
