import { HttpClient } from "@angular/common/http";
import { SocioService } from "../SocioService/socioService.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AfterContentInit,AfterViewInit, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-dialog-body",
  templateUrl: "./dialog-body.component.html",
  styleUrls: ["./dialog-body.component.css"],
})
export class DialogBodyComponent implements OnInit, OnDestroy {
  constructor(
    private socioService: SocioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.parametro="";
  }
  allSocios: any[] = [];
  provinciasArray: any[] = [];
  localidadesArray: any[] = [];
  tipoDeSociosArray: any[] = [];
  tipoDeUsuariosArray: any[] = [];
  areasArray: any[] = [];
  disableSaveButton: boolean = false;
  fileName = '';
  imagenAEnviar: any
  modoEditar : boolean = this.socioService.editMode;
  parametro: string;

  ngOnInit() {
    //Tengo la sensación de que el array NO se vacia.
    //this.obtenerTipoDeUsuario();
    if(this.modoEditar){
      this.obtenerId();
    }
    this.obtenerTipoDeSocio();
    this.obtenerAreas();
    this.obtenerProvincias();

    this.socioService.prueba.emit(this.formData);
  }

  public obtenerId(){
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.parametro = id? id: "" ; // 'id' es el nombre del parámetro definido en la ruta
      console.log("Parametro: ", this.parametro);
    });
    //se llama al proximo - llamar evento por su ID
    this.getSocio();
  }

  getSocio(){
    this.socioService.getUserById(this.parametro).subscribe((usuario: any) => {
      this.socioService.patchearFormulario(this.formData, usuario);
    });
  }

  private obtenerTipoDeUsuario() {
    if (this.tipoDeUsuariosArray.length == 0)
      this.socioService
        .getTipoDeUsuario()
        .subscribe((tipoDeUsuarioJSON: any) => {
          tipoDeUsuarioJSON.forEach((tipoDeUsuario: any) => {
            this.socioService.tipoDeUsuariosArray.push({
              nombre: tipoDeUsuario.nombreTipoUsuario,
              id: tipoDeUsuario.id,
            });
          });
          this.tipoDeUsuariosArray = this.socioService.tipoDeUsuariosArray;
        });
  }

  private obtenerTipoDeSocio() {
    
    this.socioService.getTipoDeSocio().subscribe((tipoDeSocioJSON: any) => {
      
      this.socioService.tipoDeSociosArray = [];
      tipoDeSocioJSON.forEach((tipoDeSocio: any) => {
        this.socioService.tipoDeSociosArray.push({
          nombre: tipoDeSocio.nombreTipoSocio,
          id: tipoDeSocio.id,
        }); //nombreTipoSocio viene del back, asi se llama en el JSON.
      }); //Por algun motivo me los está trayendo duplicados, REVISAR.
      
      this.tipoDeSociosArray = this.socioService.tipoDeSociosArray;
      this.formData.get('tipoDeSocio').setValue(this.setearSelect(this.formData.get('tipoDeSocio').value, this.tipoDeSociosArray));
    });
  }

  private obtenerAreas() {
    this.socioService.areasArray = [];
    this.socioService.getAreas().subscribe((areasJSON: any) => {
      areasJSON.forEach((area: any) => {
        this.socioService.areasArray.push({ nombre: area.area, id: area.id });
      });
      this.areasArray = this.socioService.areasArray;
      this.formData.get('area').setValue(this.setearSelect(this.formData.get('area').value, this.areasArray));
    });
  }
  
  private obtenerProvincias() {
    let listado: any[] = [];
    this.socioService.getProvincias().subscribe((provinciasJSON: any) => {
      provinciasJSON.forEach((provincia: any) => {
        listado.push({
          nombre: provincia.nombre,
          id: provincia.id,
        });
      });
      this.socioService.provincias = listado;
      this.provinciasArray = this.socioService.provincias;
      this.formData.get('provincia').setValue(this.setearSelect(this.formData.get('provincia').value, this.provinciasArray));
      if(this.formData.get('provincia').value){
        this.obtenerLocalidades(this.formData.get('provincia').value.id)
      }
    });
    
  }

  obtenerLocalidades(idProvincia: any) {
    
    this.socioService.getLocalidades(idProvincia).subscribe((data: any) => {
      this.socioService.localidades = [];
      data.forEach((localidad: any) => {
        this.socioService.localidades.push({
          nombre: localidad.nombre,
          id: localidad.id,
        });
      });
      this.localidadesArray = this.socioService.localidades;
      this.formData.get('localidad').setValue(this.setearSelect(this.formData.get('localidad').value, this.localidadesArray));
    });
    
  }

  ngOnDestroy(): void {
    this.allSocios = [];
    this.provinciasArray = [];
    //this.tipoDeSociosArray = [];
    this.tipoDeUsuariosArray = [];
    this.areasArray = [];
  }
  
  //Los campos del array son NOMBRE y ID para polimorfismo.

  formData: any = new FormGroup({
    id: new FormControl(null, null), //Ponemos el campo idTipoDeSocio y eso o no vale la pena? Saque el idProvincia
    /*username: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
      Validators.pattern(/[a-zA-Z0-9]/g),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    tipoDeUsuario: new FormControl(null, Validators.required),*/
    nombreEmpresa: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern(/[a-zA-Z ]/g),
    ]), //Siglas
    razonSocial: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(70),
      Validators.pattern(/[a-zA-Z \.]/g),
    ]), //Nombre completo
    telefono: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(300)
    ]), //DUDOSA EXPRESION
    mail: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(90),
      Validators.email,
    ]),
    cuit: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(13),
      Validators.pattern(
        /(20|23|24|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g,
      ),
    ]),
    tipoDeSocio: new FormControl(null, Validators.required),
    urlSocio: new FormControl(null, [
      Validators.minLength(1),
      Validators.maxLength(500),
      Validators.pattern(/^(https?:\/\/|www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=%]+\.([A-Za-z]{2,}|xn--[A-Za-z0-9]+)/g)
    ]),
    area: new FormControl(null, Validators.required),
    calle: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.pattern(/[a-zA-Z ]/g),
    ]),
    altura: new FormControl(null, [
      Validators.required,
      Validators.minLength(1),
      Validators.min(1),
      Validators.max(200000),
    ]),
    piso: new FormControl(null, [
      
      Validators.min(1),
      Validators.max(165),
    ]),
    codigoPostal: new FormControl(null, [
      Validators.required, //todo quitar esto
      Validators.minLength(1),
      Validators.maxLength(10),
    ]),
    provincia: new FormControl(null, Validators.required),
    localidad: new FormControl(null, Validators.required),
    urlLogo: new FormControl(null,null)
  }); // Este form es el que esta vinculado al HTML.

  saveData(): void {
    // Creating the variable of each form control
    const id = this.formData.get("id").value;

    if (id == null) {
      this.socioService.saveUser(this.formData).subscribe(
        response => { 
          console.log(response);
          if(this.imagenAEnviar){
            console.log("voy a enviar imagen");
            this.saveImagen(this.imagenAEnviar, response.id);
          }

        }
        
      );
    } else if (this.socioService.editMode) {
      
      if(this.imagenAEnviar){
        console.log("voy a enviar imagen");
        this.saveImagen(this.imagenAEnviar, id);
      }
      this.socioService.guardado.emit(id);
    } else {
      this.socioService.editMode = true;
    }
    //this.router.navigate([""]); //TODO crear modal antes de redirigir
  }

  saveImagen(imagen : File, id : number){
    const formData = new FormData();
    formData.append('imagen', imagen);

    this.socioService.saveImagen(formData, id).subscribe()
  }

  private isCuitValid(cuit: string): boolean {
    const regexCuit = /^(20|23|24|27|30|33|34)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
    return regexCuit.test(cuit);
  }

  private isValid() { //No lo voy a usar, Kevin arreglalo
    let username: string = this.formData.get("username").value;
    let password = this.formData.get("password").value;
    let tipoDeUsuario = this.formData.get("tipoDeUsuario").value; // nombre, id
    let nombreEmpresa: string = this.formData.get("nombreEmpresa").value;
    let razonSocial = this.formData.get("razonSocial").value;
    let telefono: string = this.formData.get("telefono").value;
    let mail = this.formData.get("mail").value;
    let cuit: string = this.formData.get("cuit").value;
    let tipoDeSocio = this.formData.get("tipoDeSocio").value; // nombre, id
    let urlSocio = this.formData.get("urlSocio").value;
    let area = this.formData.get("area").value; // nombre, id
    let calle: string = this.formData.get("calle").value;
    let altura: number = this.formData.get("altura").value;
    let piso: number = this.formData.get("piso").value;
    let codigoPostal: number = this.formData.get("codigoPostal").value;
    let provincia = this.formData.get("provincia").value; // nombre, id
    // let urlLogo = this.formData.get("urlLogo").value;

    // telefono: +54? (11)|11 1234-5678, +54? (11)|11 1234-?5679
    // const telefonoRegex = /^(011|11|15|015)\d{8}(?:,(011|11|15|015)\d{8})*$/g;
    // Se eliminan todo menos los numeros, el + y la ,
    // luego se matchea con el regex y se vuelve a unir
    // telefono = telefono.trim().replace(/[^0-9,\+]/g, '').match(telefonoRegex)?.join('') || '';

    const mailRegex =
      /[a-zA-Z0-9][a-zA-Z0-9\.\+]*@([a-zA-Z\-0-9]+[\.]){1,6}[\.][a-zA-Z]{1,5}/g;
    //mail = mail.trim().match(mailRegex)?.join("") || "";

    //const urlRegex =
      ///^(https?:\/\/|www\.)[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=%]+\.([A-Za-z]{2,}|xn--[A-Za-z0-9]+)$/g;
   // urlSocio = urlSocio.trim().match(urlRegex)?.join("") || "";

    // Nota: faltan tildes, y la ñ
    return !(username === undefined ||
      username === null ||
      username === "" ||
      username.length < 1 ||
      username.length > 30 ||
      //username.trim().match(/[^a-zA-Z0-9]/g) ||
      // password
        password === undefined ||
      password === null ||
      password.length < 8 ||
      password.length > 30 ||
      // tipoDeUsuario
      tipoDeUsuario === null ||
      tipoDeUsuario === "" ||
      tipoDeUsuario === undefined ||
      //this.tipoDeUsuariosArray.includes(tipoDeUsuario) === false ||
        //!this.tipoDeUsuariosArray.some(user => user.nombre === tipoDeUsuario.nombre && user.id === tipoDeUsuario.id) ||
      // nombreEmpresa
      nombreEmpresa === null ||
      nombreEmpresa === "" ||
      nombreEmpresa === undefined ||
      nombreEmpresa.length < 3 ||
      nombreEmpresa.length > 50 ||
      //nombreEmpresa.trim().match(/[^a-zA-Z ]/g) || // pepsi
      // razonSocial
      razonSocial === null ||
      razonSocial === "" ||
      razonSocial === undefined ||
      razonSocial.length < 1 ||
      razonSocial.length > 70 ||
      //razonSocial.trim().match(/[^a-zA-Z \.]/g) || // pepsi co SRL
      // telefono
      telefono === null ||
      telefono === "" ||
      telefono === undefined ||
      telefono.length < 1 ||
      telefono.length > 300 || // ~13
      // !telefono.trim().match(telefonoRegex)?.join('') ||
      // mail
      mail === null ||
      mail === "" ||
      mail === undefined ||
      mail.length < 10 ||
      mail.length > 90 ||
      // cuit
      cuit === null ||
      cuit === "" ||
      cuit === undefined ||
      cuit.length < 11 ||
      cuit.length > 13 ||
      !this.isCuitValid(cuit) ||
      // tipoDeSocio
      tipoDeSocio === null ||
      tipoDeSocio === "" ||
      tipoDeSocio === undefined ||
      //this.tipoDeSociosArray.includes(tipoDeSocio) === false ||
       // !this.tipoDeSociosArray.some(user => user.nombre === tipoDeSocio.nombre && user.id === tipoDeSocio.id) ||
      // urlSocio
      urlSocio === null ||
      urlSocio === "" ||
      urlSocio === undefined ||
      urlSocio.length < 1 ||
      urlSocio.length > 500 ||
      // area
      area === null ||
      area === "" ||
      area === undefined ||
      //this.areasArray.includes(area) === false ||
       // !this.areasArray.some(user => user.nombre === area.nombre && user.id === area.id) ||
      // calle
      calle === null ||
      calle === "" ||
      calle === undefined ||
      calle.length < 1 ||
      calle.length > 100 ||
      //calle.trim().match(/[^a-zA-Z ]/g) ||
      // altura
      altura === null ||
      altura === undefined ||
      altura < 1 ||
      // piso
      piso === null ||
      piso === undefined ||
      piso < 1 ||
      piso > 165 ||
      // codigoPostal
      codigoPostal === null ||
      codigoPostal === undefined ||
      codigoPostal < 1000 ||
      codigoPostal > 9999 ||
      // provincia
      provincia === null ||
      provincia === "" ||
      provincia === undefined // ||
      //this.provinciasArray.includes(provincia) === false ||
      //  !this.provinciasArray.some(user => user.nombre === provincia.nombre && user.id === provincia.id) // ||
      // urlLogo
      // urlLogo === null ||
      // urlLogo === "" ||
      // urlLogo === undefined ||
      // urlLogo.length < 1 ||
      // urlLogo.length > 90
    );
  }

  /*onFileSelected(event: any) {

    const file:File = event.target.files[0];

        this.fileName = file.name;
        this.imagenAEnviar = file; //Le asigno el file y despues el formatear le da la forma de

       /* const fReader = new FileReader();
    fReader.readAsDataURL(this.formData.get('urlLogo').value);
    fReader.onloadend = (event) => {
    this.logo = event.target!.result;* El mostrar será para otro momento}*/

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.imagenAEnviar = selectedFile;
  }

  setearSelect(string : string, array : any) {
    return array.find((item : any ) => item.nombre === string);
  }
  

  mostrar(){
    console.log(this.socioService.editMode);
  }

}
