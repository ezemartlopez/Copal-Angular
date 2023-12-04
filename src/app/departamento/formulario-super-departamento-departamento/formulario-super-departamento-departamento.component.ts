import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Formulario, Campo, esRequerido, usuarioValido, rolValido} from './modelo'
import { ApiServiceService} from './api-service.service'


@Component({
  selector: 'app-formulario-super-departamento-departamento',
  templateUrl: './formulario-super-departamento-departamento.component.html',
  styleUrls: ['./formulario-super-departamento-departamento.component.css']
})
export class FormularioSuperDepartamentoDepartamentoComponent implements OnInit{
  formulario: Formulario;
  autoridades: Formulario;
  listaAutoridades: any[];
  usuarios: any[];
  roles: any[];
  showModal: boolean;
  exitoEnvio: boolean;
  fallaEnvio: boolean;
  constructor(private api: ApiServiceService) {
    this.formulario = new Formulario({
      nombreDeDepartamento:new Campo("nombreDeDepartamento", '', [esRequerido]),
      descripcion:new Campo("descripcion", '', [esRequerido]),
    });
    this.autoridades = new Formulario({
      usuarioId:new Campo("usuarioId", '0', [esRequerido, usuarioValido]),
      rolId:new Campo("rolId", '1', [esRequerido, rolValido]),
    });
    this.usuarios = [];
    this.roles = [];
    this.listaAutoridades = [];
    this.showModal = false;
    this.exitoEnvio = false;
    this.fallaEnvio = false;
  }
/* AUTORIDADES FUNCIONES */
  agregarAutoridad(){
    if (this.autoridades.esValido()) {
      console.log('Agregando usuario');
      this.listaAutoridades.push({usuarioId: parseInt(this.autoridades.campos['usuarioId'].valorInicial), rolId: parseInt(this.autoridades.campos['rolId'].valorInicial)})
      this.reiniciarFormularioAutoridades();
    }
  }
  buscarUsuarioPorId(idBuscado: number): string {
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.id === idBuscado);
    return usuarioEncontrado? usuarioEncontrado.nombre: 'No encontrado';
  }
  buscarRolPorId(idBuscado: number): string {
    const usuarioEncontrado = this.roles.find(rol => rol.id === idBuscado);
    return usuarioEncontrado? usuarioEncontrado.rol: 'No encontrado';
  }
  eliminarUsuarioPorIdYRol(usuarioId: number, rolId: number): void {
    const nuevaLista = this.listaAutoridades.filter(usuarioRol => !(usuarioRol.usuarioId === usuarioId && usuarioRol.rolId === rolId));
    this.listaAutoridades = nuevaLista;
  }
  reiniciarFormularioAutoridades(){
    this.autoridades.reiniciarValores();
    this.autoridades.campos['usuarioId'].valorInicial = '0';
    this.autoridades.campos['rolId'].valorInicial = '1';
  }
  /* FIN AUTORIDADES FUNCIONES */
  /* GRUPO FUNCIONES */
  enviarFormularioGrupo(){
    if(this.formulario.esValido()){
      let formulario = this.formulario.obtenerObjeto();
      formulario = {...formulario, autoridades: this.listaAutoridades}
      console.log('Esto se va a enviar: ', formulario);
      this.crearGrupoDepartamento(formulario);
    }
  }
  reinicairEstados(){ this.exitoEnvio = false; this.fallaEnvio = false; }
  /* FIN GRUPO FUNCIONES */
  /* FUNCIONES MODAL */
  ocultarModal(){ this.showModal = false; this.reinicairEstados(); }
  /* FIN FUNCIONES MODAL */
  ngOnInit(): void {
      this.obtenerUsuarios();
      this.obtenerRoles();
  }
  /* LLAMADAS API */
  obtenerUsuarios(){
    this.api.obtenerUsuarios(
      (data)=>{ this.usuarios = data;},
      ()=>{}
    );
  }
  obtenerRoles(){
    this.api.obtenerRoles(
      (data)=>{ this.roles = data; },
      ()=>{}
    );
  }
  crearGrupoDepartamento(formulario: any){
    this.api.crearDepartamento(
      formulario,
      (response)=>{ this.showModal = true; this.exitoEnvio = true; this.formulario.reiniciarValores(); },
      ()=>{ this.showModal = true; this.fallaEnvio = true; }
    );
  }
  /* FIN LLAMADAS API */
}
 