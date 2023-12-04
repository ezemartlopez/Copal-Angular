import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-agregar',
  templateUrl: './card-agregar.component.html',
  styleUrls: ['./card-agregar.component.css']
})
export class CardAgregarComponent {
  @Input() idGrupo?: number; 
  redireccionar(){
    window.location.href = "departamentos/agregar-departamento/" + this.idGrupo;
  }
}
