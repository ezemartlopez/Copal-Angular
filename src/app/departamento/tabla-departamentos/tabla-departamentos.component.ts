
import { Component, OnInit } from '@angular/core';
import { Data } from '../interfaces/data';
import { obtenerDepartamentos } from './servicioPrueba';
import { ApiService } from '../ServiciosApi/api.service';
import { Grupo } from '../formulario-departamento/formulario-departamento.component';

@Component({
  selector: 'app-tabla-departamentos',
  templateUrl: './tabla-departamentos.component.html',
  styleUrls: ['./tabla-departamentos.component.css']
})
export class TablaDepartamentosComponent implements OnInit{
  gruposDepartamentos:any; 
  gruposDep:any;
  grupos = [];
  //zona eliminar Grupo
  grupoSelecionado: any | null;
  respuesta: any | null;
  seEliminoGrupo: boolean;
  /*========================= */
  constructor(private api: ApiService){
    this.gruposDepartamentos = obtenerDepartamentos();
    this.gruposDep = [];
    this.grupoSelecionado = null;
    this.respuesta = null;  
    this.seEliminoGrupo = false;
  }
  ngOnInit(): void {
      this.ObtenerGruposDepartamentos();
  }

  private ObtenerGruposDepartamentos(){
    this.api.getDepartamentos(
      (data) => { this.gruposDep = data; this.modificarDepartamentos(); console.log('data: ', data);
      },// Maneja los datos exitosos
      (error) => { console.error(error); }// Maneja el error (opcional)
    );
  
  }
  mostrarFila(row:number){
    console.log("fila: ", row);
    let estado = this.gruposDepartamentos[row].mostrar;
    this.gruposDepartamentos[row].mostrar = !estado;
  }
  redirrecionar(url:string){
    window.location.href = url;
  }
  
 modificarDepartamentos(){
  let seMostrara = (Object.keys(this.gruposDep).length === 1);

  this.gruposDep = this.gruposDep.map(
    
    function(objeto:any){ 
      return { 
        ...objeto, //propiedades anteriores
        mostrar: seMostrara, //nueva propiedad
        cambiarEstado:function(){this.mostrar = !this.mostrar;} //nuevo metodo
      };
    }
  );
 }
 seleccionaGrupo(grupo: any){
    this.grupoSelecionado = grupo;
    
 }
 resetearSelecionado(){
    this.grupoSelecionado = null;
 }
 cerrarModal(){
  this.resetearSelecionado();

  if(this.seEliminoGrupo){
    this.seEliminoGrupo = false;
    this.redirrecionar("departamentos")
  }
  this.respuesta = null;
  
 }
 eliminarGrupo(){
  this.api.eliminarGrupo(
    this.grupoSelecionado.id, 
    (response) => {
      // Éxito: Realiza acciones necesarias cuando la solicitud se completa correctamente
      console.log(response);
      this.respuesta = {message:"Se elimino exitosamente el Grupo: ", logo:"/assets/logos/exito.png"};
      this.seEliminoGrupo = true;
      // Puedes realizar otras acciones aquí si es necesario
    },
    (error) => {
      // Error: Realiza acciones necesarias cuando ocurre un error
      console.log(error);
      this.respuesta = {message:"Error al eliminar Grupo: ", logo:"/assets/logos/alert-triangle.png"};
      // Puedes realizar otras acciones aquí si es necesario
    }
  );
 }
}
