/*import { Component } from '@angular/core';
//import { Rol, roles } from './roles';
import { OnInit } from '@angular/core';
import { APIService } from '../ServiciosApi/services-api.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';




export interface Rol{ id:number; rol:string;} 
export interface Usuario { id: number; nombre: string; }
export interface Autoridades {rolId:number; usuarioId:number}

export interface FormularioEnviar{
  nombreDeDepartamento:string;
  descripcion:string;
  autoridades:Array<Autoridades>;
}


@Component({
  selector: 'app-formulario-grupo-departamento',
  templateUrl: './formulario-grupo-departamento.component.html',
  styleUrls: ['./formulario-grupo-departamento.component.css']
})
export class FormularioGrupoDepartamentoComponent implements OnInit {
  opcionesRol:Array<Rol>;
  opcionesUsuarios:Array<Usuario>;//usuarios

  inputGrupoNombre:string;
  inputGrupoDescripcion:string;

  inputUsuarioNombre:string;
  inputUsuarioRol:Rol;
  inputUsuario:Usuario;

  usuariosDepartamento:Array<any>;

  usuarioDefecto:Usuario = {id:0, nombre:"NINGUNO"};//usuarios 
  rolDefecto:Rol = {id:0, rol:"Seleccione el Rol"};

  formularioEnviarDefecto:FormularioEnviar={
    nombreDeDepartamento:"",
    descripcion:"",
    autoridades:[]
  }

  formularioEnviar:FormularioEnviar={
    nombreDeDepartamento:this.formularioEnviarDefecto.nombreDeDepartamento,
    descripcion: this.formularioEnviarDefecto.descripcion,
    autoridades:[]
  }

  constructor(private apiService:APIService) {
    
    this.opcionesRol = [this.rolDefecto];
    this.opcionesUsuarios = [this.usuarioDefecto];
   

    this.inputGrupoNombre="";
    this.inputGrupoDescripcion="";

    this.inputUsuarioNombre ="";
    this.inputUsuarioRol = this.opcionesRol[0];
    this.inputUsuario = this.opcionesUsuarios[0];
   
    this.usuariosDepartamento = [];
  }
  ngOnInit(): void {
    this.ObtenerUsuariosApi();
    this.ObtenerRolesApi();
  }
  private ObtenerRolesApi(){
    // Llamar a la función getRoles del servicio y obtener los datos
    this.apiService.getRoles().subscribe(
      (data:any) => {
        // Aquí asumes que data es un array de objetos con propiedades 'value' y 'label'
        this.opcionesRol = this.opcionesRol.concat(data);
        console.log(this.opcionesRol);
      },
      (error:any) => {
        console.error('Error al obtener opciones:', error);
      }
    );
  }

   //usuarios
   private ObtenerUsuariosApi(){
    // Llamar a la función getRoles del servicio y obtener los datos
    this.apiService.getUsuarios().subscribe(
      (data:any) => {
        // Aquí asumes que data es un array de objetos con propiedades 'value' y 'label'
        this.opcionesUsuarios = this.opcionesUsuarios.concat(data);
        
      },
      (error:any) => {
        console.error('Error al obtener opciones:', error);
      }
    );
  }


  listarUsuarios(){
    return this.usuariosDepartamento;
  }

  resetearInputUsuario(){
    this.inputUsuario = this.usuarioDefecto;
    this.inputUsuarioRol=this.rolDefecto;
  }

  agregarUsuario(){
    this.usuariosDepartamento.push({name:this.inputUsuario.nombre, rol:this.inputUsuarioRol});
    console.log("Opciones rol: ",this.opcionesRol);
    console.log("Opciones rol - id : ",this.inputUsuarioRol.id);
    console.log("lISTA:",this.inputUsuarioRol.rol);
    console.log("Usuarios Departamentos: ",this.usuariosDepartamento);
    
    this.formularioEnviar.autoridades.push({rolId:this.inputUsuarioRol.id, usuarioId:this.inputUsuario.id});
    console.log(this.formularioEnviar.autoridades);
    this.resetearInputUsuario();
  }

  eliminarUsuarioCargado(id:string){
    this.usuariosDepartamento = this.usuariosDepartamento.filter(usuario => usuario.name !== id);
    console.log("Se elimino el usuario: ", id);
  }

  enviarGrupo(){
    console.log("DATOS PARA ENVIAR ");
    this.formularioEnviar.nombreDeDepartamento=this.inputGrupoNombre;
    this.formularioEnviar.descripcion=this.inputGrupoDescripcion;
    console.log(this.formularioEnviar);
  }
  
}

*/