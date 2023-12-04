export function construirParametrosURL(selectDepartamento: number, selectModalidad: string, selectEstado: number): string {
    const parametros = [];
  
    if (selectDepartamento !== 0) {
      parametros.push(`departamentoId=${selectDepartamento}`);
    }
  
    if (selectModalidad !== 'Por Modalidad') {
      parametros.push(`tipoEvento=${selectModalidad}`);
    }
  
    if (selectEstado !== 0) {
      parametros.push(`estadoId=${selectEstado}`);
    }
  
    return parametros.join('&');
  }