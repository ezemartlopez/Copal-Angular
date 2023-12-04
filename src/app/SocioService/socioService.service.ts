import { OnDestroy, OnInit, Optional } from "@angular/core";
import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class SocioService implements OnInit,OnDestroy{
  prueba: EventEmitter<any>= new EventEmitter();
  guardado: EventEmitter<any>= new EventEmitter();
  notificarVistaSocio: EventEmitter<any> = new EventEmitter();
  provincias: any[] = []
  localidades: any[] = []
  tipoDeSociosArray: any[] = []
  editMode = false;
  tipoDeUsuariosArray:any[] = []
  areasArray: any[] = []
  sociosYProvincias: any[] = []
  constructor(private http: HttpClient) {
   }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.provincias = [];
    this.localidades = [];
    this.tipoDeSociosArray = [];
    this.tipoDeUsuariosArray = [];
    this.areasArray = [];
  }

  public saveUser(formData: any): Observable<any> {
    let formJSON = this.formatearJSON(formData);
    return this.http.post<any>(`${environment.APIURL}/socios`, formJSON); //Cuando haya auth vamos a tener que cambiar esto y mandar los headers de la auth
  }

  public saveImagen(formData: any, id : number): Observable<Object> {
    return this.http.post<any>(`${environment.APIURL}/socios/${id}/imagen`, formData); //Cuando haya auth vamos a tener que cambiar esto y mandar los headers de la auth
  }

  public updateUser(id: String, formData: any,): Observable<Object> {
    let formJSON = this.formatearJSON(formData);
    return this.http.put<any>(`${environment.APIURL}/socios/${id}`, formJSON);
  }

  public getUserById(id: String): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/socios/${id}`);
  }

  public findAll(): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/socios`);
  }

  public deleteSocio(id: String): Observable<Object> {
    return this.http.delete<any>(`${environment.APIURL}/socios/${id}`);
  }

  public formatearJSON(formData: any) {
    const nuevoFormData = new FormData()
    
    const telefonos = formData.get('telefono').value.toString(); // Obtener la cadena de entrada
    const telefonoArray = telefonos.split(','); // Dividir la cadena en un arreglo

    // Eliminar espacios en blanco de cada valor y agregarlos a la lista de correos electrónicos
    let telefonoList: string[] = telefonoArray.map((email: string) =>
      email.trim(),
    );
    return {
      nombreDeEmpresa: formData.get('nombreEmpresa').value,
      razonSocial: formData.get('razonSocial').value,
      cuit: formData.get('cuit').value.replace(/[^\d]/g, ''), // << llena aca
      urlSocio: formData.get('urlSocio').value,
      //urlLogo: formData.get('urlLogo').value,
      areaId: formData.get('area').value.id,
      tipoDeSocioId: formData.get('tipoDeSocio').value.id,
      // usuario: {
      //   tipoDeUsuarioId: formData.get('tipoDeUsuario').value.id,
      //   nombre: formData.get('username').value,
      //   contrasenia: formData.get('password').value,
      // },
      ubicacion: {
        calle: formData.get('calle').value,
        altura: formData.get('altura').value,
        piso: formData.get('piso').value,
        codigoPostal: formData.get('codigoPostal').value,
        provincia: formData.get('provincia').value.nombre,
        localidad: formData.get('localidad').value.nombre,
      },
      contacto: {
        mail: formData.get('mail').value,
        numeroTelefono: telefonoList, //ingresar los valores de telefono separados por coma. Por ej 5555555, 666666
      },
    };
    /*const combinedFormData = new FormData();
    combinedFormData.append('logo', imagenAEnviar); // Asegúrate de que 'thumbnail' sea el nombre correcto
    combinedFormData.append('socios', JSON.stringify(jsonFormateado)); // Asegúrate de que 'socios' sea el nombre correcto
    return combinedFormData*/
  }

  patchearFormulario(formData: any, usuarioAEditar: any) {
    //Si NO es del desplegable nunca te va a mostrar nada.
    //Hice una funcion custom porque sino no me mostraba el valor con el find.
    //O sea que tenes que asignarle un valor del array de provincias SI O SI*/


    formData.patchValue({
      id: usuarioAEditar.id,
      //idProvincia: usuarioAEditar.ubicacion.idProvincia,
      nombreEmpresa: usuarioAEditar.nombreDeEmpresa,
      razonSocial: usuarioAEditar.razonSocial,
      cuit: usuarioAEditar.cuit, //Tiene que ser un CUIT valido y real
      //username: usuarioAEditar.usuario.nombre, //La contraseña no se muestra
      calle: usuarioAEditar.ubicacion.calle,
      altura: usuarioAEditar.ubicacion.altura,
      piso: usuarioAEditar.ubicacion.piso,
      codigoPostal: usuarioAEditar.ubicacion.codigoPostal,
      mail: usuarioAEditar.contacto.mail,
      telefono: usuarioAEditar.contacto.numeroTelefono,
      urlSocio: usuarioAEditar.urlSocio,
      urlLogo: usuarioAEditar.urlLogo,
      tipoDeSocio: usuarioAEditar.nombreTipoSocio,
      area: usuarioAEditar.area,
      provincia : usuarioAEditar.ubicacion.provincia,
      localidad : usuarioAEditar.ubicacion.localidad,
    });

    //return this.formatearJSON(formData); //Por el momento dejalo asi
  }

  getProvincias(): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/provincias`);
  }

  getLocalidades(idProvincia : number): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/provincias/${idProvincia}/localidades`);
  }

  getAreas(): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/area`);
  }

  getTipoDeUsuario(): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/tipoDeUsuario`); //No usar si el back no lo pusheo, sino va a romper
  }

  getTipoDeSocio(): Observable<Object> {
    return this.http.get<any>(`${environment.APIURL}/tipoDeSocio`);
  }

  getSociosPorPagina(numeroPagina: number, cantSociosPorPagina: number) {

      return this.http.get<any>(
        `${environment.APIURL}/socios?page=${numeroPagina}&size=${cantSociosPorPagina}`,
      );
  }

  buscarSegun(
    numeroPagina: number,
    tamanioPagina: number,
    nombre: string,
    area: string,
  ) {
    if (area == "") {
      return this.http.get<any>(
        `${environment.APIURL}/socios/search?page=${numeroPagina}&size=${tamanioPagina}&nombre=${nombre}`,
      );
    } else if (nombre == "") {
      return this.http.get<any>(
        `${environment.APIURL}/socios/search?page=${numeroPagina}&size=${tamanioPagina}&area=${area}`,
      );
    } else {
      return this.http.get<any>(
        `${environment.APIURL}/socios/search?page=${numeroPagina}&size=${tamanioPagina}&nombre=${nombre}&area=${area}`,
      );
    }
  }
  iterarArray(array: any, id: any) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return array[i];
      }
    }
  }

}


