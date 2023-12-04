import { Component, OnInit, Input} from '@angular/core';
import { Data } from '../interfaces/data';
import { Router } from '@angular/router';
import { ApiService } from '../ServiciosApi/api.service';
@Component({
  selector: 'app-card-departamento-interno',
  templateUrl: './card-departamento-interno.component.html',
  styleUrls: ['./card-departamento-interno.component.css']
})
export class CardDepartamentoInternoComponent implements OnInit{

  urlBase = 'http://localhost:8080';
  static contador = 0;
  departamentoEliminado:boolean;
  @Input() data: any= {id: 0,nombreDeDepartamento:"",icono:"",descripcion:""};
  @Input() idPadre: any = 0;
  respuesta:any | null;
  identificador:string;
  constructor(private router: Router, private api:ApiService) { 
    this.departamentoEliminado = false;
    this.respuesta = null;
    CardDepartamentoInternoComponent.contador++;
    this.identificador = `Identificador-${CardDepartamentoInternoComponent.contador}`;
  }
  ngOnInit(): void {

  }
  

  editarDepartamento() {
    this.router.navigate(['departamentos/editar-departamento', this.data.id]);
  }
  verDepartamento(){
    this.router.navigate(['departamentos/ver-departamento', this.data.id]);
  }
  redirrecionar(url:string){
    window.location.href = url;
  }
  eliminarSubDepartamento(): void {
    this.api.eliminarDepartamento(
      this.data.id, 
      (response) => {
        // Éxito: Realiza acciones necesarias cuando la solicitud se completa correctamente
        console.log(response);
        this.respuesta = {message:"Se elimino exitosamente el Departamento: ", logo:"/assets/logos/exito.png"};
        this.departamentoEliminado = true;
        // Puedes realizar otras acciones aquí si es necesario
      },
      (error) => {
        // Error: Realiza acciones necesarias cuando ocurre un error
        console.log(error);
        this.respuesta = {message:"Error al eliminar departamento: ", logo:"/assets/logos/alert-triangle.png"};
        // Puedes realizar otras acciones aquí si es necesario
      }
    );
  }
  mostrarMensaje(){
    return this.data.nombreDeDepartamento;
  }
  modalCerrar(){
    if(this.departamentoEliminado){
      this.redirrecionar("departamentos");
    }
    else{
      this.respuesta = null;
    }
  }
}
