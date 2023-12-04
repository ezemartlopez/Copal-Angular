export class Campo {
  touched: boolean; // Flag de control de estado touch
  constructor(
    public nombre: string,
    public valorInicial: string = '',
    public validaciones: ((valor: string) => string)[] = [],
    public campoRef: string = ''
  ) {
    this.touched = false;
  }

  fieldTouched() {
    this.touched = true;
  }

  // Setter para reiniciar el valor a una cadena vacía
  reiniciarValor() {
    this.valorInicial = '';
    this.touched = false; // Puedes reiniciar también el estado touch
  }
}

export class Formulario {
  constructor(public campos: { [key: string]: Campo }) {}

  validarCampos() {
    const errores: { [key: string]: string } = {};

    for (const nombreCampo in this.campos) {
      const campo = this.campos[nombreCampo];

      // Verifica si el campo ha sido tocado antes de aplicar validaciones
      if (campo.touched) {
        for (const validacion of campo.validaciones) {
          const mensajeError = validacion(campo.valorInicial);
          if (mensajeError) {
            errores[nombreCampo] = mensajeError;
            break;
          }
        }
      }
    }

    return errores;
  }

  esValido() {
    this.activarTouchedEnTodosLosCampos();
    const errores = this.validarCampos();
    return Object.keys(errores).length === 0;
  }

  obtenerRespuestaJSON() {
    if (this.esValido()) {
      const datos: { [key: string]: string } = {};

      for (const nombreCampo in this.campos) {
        datos[nombreCampo] = this.campos[nombreCampo].valorInicial;
      }

      return JSON.stringify(datos);
    }

    return '{}';
  }

  // Método para reiniciar los valores de todos los campos
  reiniciarValores() {
    for (const nombreCampo in this.campos) {
      this.campos[nombreCampo].reiniciarValor();
    }
  }
  mostrarMensajeError(campoNombre: string): boolean {
    const campo = this.campos[campoNombre];
    return campo.touched && Boolean(this.validarCampos()[campoNombre]);
  }
  tieneErrores(campoNombre: string): boolean {
    const campo = this.campos[campoNombre];
    return campo.touched && !!this.validarCampos()[campoNombre];
  }
  activarTouchedEnTodosLosCampos() {
    for (const nombreCampo in this.campos) {
      this.campos[nombreCampo].touched = true;
    }
  }
}
