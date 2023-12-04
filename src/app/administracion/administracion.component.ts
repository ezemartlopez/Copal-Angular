import { AfterViewInit, HostListener, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocioService } from './../SocioService/socioService.service';
import { Component,OnInit} from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { catchError, tap, of, forkJoin, pipe } from 'rxjs';
import {concatMap, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators'


@Component({
  selector: "app-administracion",
  templateUrl: "./administracion.component.html",
})
export class AdministracionComponent implements OnInit, OnDestroy {
  searchText: string = '';
  cantElementosPorPagina: number = 4; //Default. Puede cambiarse si se quiere para mostrar más o menos elementos por página.
  paginaActual: number = 0;
  sociosTotales: number = 0;
  socios: any[] = [];
  usuarioAEditar: any;
  formData: any;
  editMode: boolean;
  areas: any[] = [];
  constructor(
    private socioService: SocioService,
    private http: HttpClient,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.editMode = false;
  }
  ngAfterViewInit(): void {
  }

  ngOnInit() {


    this.socioService.getSociosPorPagina(this.paginaActual, this.cantElementosPorPagina).subscribe((socios: any) => {
      this.socios = socios.content
    })

    this.socioService.findAll().subscribe((socios: any) => 
      { this.sociosTotales = socios.content.length}) //Socios totales de la DB.

    this.socioService.prueba.subscribe((data: any) => {
      this.formData = data
    })

    this.socioService.guardado.subscribe( (id) => 
      this.socioService.updateUser(id, this.formData).subscribe()
    )

    this.obtenerAreas()
  }

  isActiveArea: boolean = false;

  toggleActiveArea(): void {
    this.isActiveArea = !this.isActiveArea;
  }

  isActiveSocio: boolean = false;

  toggleActiveSocio(): void {
    this.isActiveSocio = !this.isActiveSocio;
  }

  private obtenerAreas() {
    this.socioService.getAreas().subscribe((areasJSON: any) => {
      this.socioService.areasArray = [];
      areasJSON.forEach((area: any) => {
        this.socioService.areasArray.push({ area: area.area, id: area.id });
      });
      this.areas = this.socioService.areasArray;
    });
  }

  ngOnDestroy(): void {
    //this.socioService.prueba.unsubscribe(); No entiendo por qué rompe si me desuscribo.
    this.socios = [];
    this.areas = [];
  }

  agregarSocio(): void {
    this.router.navigate(["/gestion-de-socios/agregar-socio"]);
  }

  updateUser(id: String): void {
    this.socioService.editMode = true;
    this.router.navigate([`/gestion-de-socios/editar-socio/${id}`]);
    // this.socioService.getUserById(id).subscribe((usuario: any) => {
    //   this.socioService.editMode = true;
    //   this.usuarioAEditar = usuario;
    //   this.socioService.patchearFormulario(this.formData, this.usuarioAEditar);
    // });
  }

  borrarSocio(id: String): void {
    this.matDialog.open(DialogConfirmDeleteComponent, { data: id });
  }

  verSocio(id: String) {
    // this.socioService.editMode = false
    // this.socioService.getUserById(id).subscribe((item: any) => {
    //   this.usuarioAEditar = item; //Guardo el item que me devuelve el servicio en editdata
    //   this.socioService.notificarVistaSocio.emit(this.usuarioAEditar)
    //   this.socioService.patchearFormulario(this.formData, this.usuarioAEditar);
    // });
	  this.router.navigate([`/gestion-de-socios/ver-socio/${id}`]);
  }

  public insertarUsuarioDePrueba(): void {
    //El concatMap con el pipe es para que ejecute secuencialmente los métodos HTTP. Si no, se ejecutan todos al mismo tiempo. Luego el tap es para recargar la página si tuvo
    // éxito la solicitud. El catchError es para manejar el error.

    // Verificar si los tipos de usuario, socio y área ya existen en la base de datos
    const verificaciones = forkJoin([
      this.http.get(`${environment.APIURL}/area`),
      this.http.get(`${environment.APIURL}/tipoDeSocio`),
      this.http.get(`${environment.APIURL}/tipoDeUsuario`),
    ]);

    verificaciones.subscribe(([area, tipoSocio, tipoUsuario]) => {
   
      if (
        (area as Array<any>).length > 0 &&
        (tipoSocio as Array<any>).length > 0 &&
        (tipoUsuario as Array<any>).length > 0 
      ) {
        //Los casteo a array porque se devuelve un array vacio si no hay datos
        // Los tipos de usuario, socio y área existen en la base de datos, no es necesario hacer las solicitudes POST
        console.log(
          "Los tipos de usuario, socio y área ya existen en la base de datos. Solo se insertará el socio",
        );
        this.http
          .post(`${environment.APIURL}/socios`, {
            usuario: {
              nombre: "CapusottoOficiAL2",
              contrasenia: "123456789",
              tipoDeUsuarioId: 1,
            },
            ubicacion: {
              calle: "AV SIEMPREVIVA",
              altura: 32,
              piso: 10,
              codigoPostal: 3030,
              idProvincia: 6,
              nombreProvincia: "BUENOS AIRES",
            },
            contacto: {
              numeroTelefono: ["1132722718", "1566241007"],
              mail: "uanchope@gmail.com",
            },
            nombreDeEmpresa: "ElMessias2", //Siglas
            razonSocial: "Un nombre random", //Nombre completo
            cuit: 23941305679,
            tipoDeSocioId: 1,
            urlSocio: "https://www.google.com/",
            areaId: 1,
            urlLogo: "imgref",
          }).pipe(
            catchError((error) => {
              console.error("Error al insertar el socio:", error);
              return of(null); // Continuar con otras acciones
            }),
          ).subscribe(() => {
            console.log("Socio insertado con éxito.");
            // Continuar con otras acciones
          });
      } else {
        // Al menos uno de los tipos de usuario, socio o área no existe en la base de datos, es necesario hacer las solicitudes POST
        console.log(
          "Al menos uno de los tipos de usuario, socio o área no existe en la base de datos. Se insertarán los tres tipos y el socio",
        );
        forkJoin([
          this.http.post(`${environment.APIURL}/tipoDeUsuario`, {
            nombreTipoDeUsuario: "ADMINISTRADOR",
          }),
          this.http.post(`${environment.APIURL}/tipoDeSocio`, {
            nombreTipoSocio: "PLENARIO",
          }),
          this.http.post(`${environment.APIURL}/area`, {
            nombreArea: "EMPRESAS",
          }),
        ]).pipe(
            concatMap(() => {
              return this.http.post(`${environment.APIURL}/socios`, {
                usuario: {
                  nombre: "CapusottoOficial2",
                  contrasenia: "123456789",
                  tipoDeUsuarioId: 1,
                },
                ubicacion: {
                  calle: "AV SIEMPREVIVA",
                  altura: 742,
                  piso: 10,
                  codigoPostal: 3030,
                  idProvincia: 6,
                  nombreProvincia: "BUENOS AIRES",
                },
                contacto: {
                  numeroTelefono: ["1132722718", "1566241007"],
                  mail: "uanchope@gmail.com",
                },
                nombreDeEmpresa: "ElMessias33", //Siglas
                razonSocial: "Un nombre random", //Nombre completo
                cuit: 253540,
                tipoDeSocioId: 1,
                urlSocio: "https://www.google.com/",
                areaId: 1,
                urlLogo: "imgref",
              });
            }),
            catchError((error) => {
              console.error("Error al insertar el socio:", error);
              return of(null); // Continuar con otras acciones
            }),
          ).subscribe(() => {});
      }
    });
  }

  showModal(): void {
    document.getElementById("nuevo-socio-modal")?.classList.remove("hidden");
  }

  /*@HostListener('window:beforeunload', ['$event']) 
  doSomething($event: any) {
    $event.returnValue='Your data will be lost!'
    console.log($event) //Nada
  } o sea se ve que esto hace algo pero no es lo que busco*/

  buscarPorArea(seleccionado: string) {
    if (seleccionado !== 'Filtrar por area') {
      return this.socioService.buscarSegun(this.paginaActual, this.cantElementosPorPagina,'', seleccionado).subscribe((socios) =>
        {
          this.socios = socios.content
          //this.ngAfterViewInit()
        } //Llamo al afterView para skipear la asignacion de socios que hace en el onInit y quedarme con los que ya tengo
    );} else {
        return this.socioService.getSociosPorPagina(this.paginaActual, this.cantElementosPorPagina).subscribe((socios: any) => {
          this.socios = socios.content
        })
    }
  }

  buscarPorNombre() {
    if(this.searchText !== ""){
      return this.socioService.buscarSegun(this.paginaActual, this.cantElementosPorPagina,this.searchText, '').subscribe(
        (socios) => {
          this.socios = socios.content
          this.ngAfterViewInit()
        } //Llamo al afterView para skipear la asignacion de socios que hace en el onInit y quedarme con los que ya tengo
      );
    } else {
      return this.socioService.getSociosPorPagina(this.paginaActual, this.cantElementosPorPagina).subscribe((socios: any) => {
        this.socios = socios.content
      })
    }
  }
  
  

  cambiarPagina(isNext: boolean) {
    //Funciona, NO SE TOCA. Si se pasa de página (tanto de menos como de mas) lo vuelvo a la pagina 0.
    let cantPaginas = Math.ceil(
      this.sociosTotales / this.cantElementosPorPagina,
    );
    if (isNext) {
      if (this.paginaActual < cantPaginas - 1) {
        this.paginaActual = this.paginaActual + 1;
        this.ngOnInit();
      } else {
        this.paginaActual = 0;
        location.reload();
      }
    } else {
      if (this.paginaActual >= 1) {
        this.paginaActual = this.paginaActual - 1;
        this.ngOnInit();
      } else {
        this.paginaActual = 0;
        location.reload();
      }
    }
  }

}
