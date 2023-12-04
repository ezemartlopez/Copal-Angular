export function obtenerFechaYHora(cadenaFechaHora: string): [string, string] {
    const fechaHora = new Date(cadenaFechaHora);
    
    if (isNaN(fechaHora.getTime())) {
      // Manejar el caso en que la cadena de fecha y hora no sea válida
      return ['', ''];
    }
  
    const fecha = cadenaFechaHora.slice(0, 10); // Obtener "año-mes-día"
    const hora = cadenaFechaHora.slice(11, 19); // Obtener "hora:minuto:segundo"
  
    return [fecha, hora];
  }
  /*
  const cadenaFechaHora = "13-12-1415T05:30:00";
  const [fecha, hora] = obtenerFechaYHora(cadenaFechaHora);
  
  console.log('Fecha:', fecha); // Resultado: "1415-12-13"
  console.log('Hora:', hora); // Resultado: "05:30:00"
*/
interface ObjetoConIdYNombre {
    id: number;
    nombre: string;
  }
  
  export function buscarIdPorNombre(lista: ObjetoConIdYNombre[], nombreBuscado: string): number {
    const objetoEncontrado = lista.find(objeto => objeto.nombre === nombreBuscado);
  
    if (objetoEncontrado) {
      return objetoEncontrado.id;
    } else {
      return 0;
    }
  }
  /*
  const listaDeObjetos: ObjetoConIdYNombre[] = [
  { id: 1, nombre: 'Objeto 1' },
  { id: 2, nombre: 'Objeto 2' },
  { id: 3, nombre: 'Objeto 3' },
];

const nombreBuscado = 'Objeto 2';
const idEncontrado = buscarIdPorNombre(listaDeObjetos, nombreBuscado);
  */
  
 export function buscarObjetoPorId(lista: ObjetoConIdYNombre[], idBuscado: number): ObjetoConIdYNombre | undefined {
    return lista.find(objeto => objeto.id === idBuscado);
  }