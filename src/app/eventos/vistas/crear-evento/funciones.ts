interface ObjetoConIdYNombre {
    id: number;
    nombre: string;
}
  
export function encontrarNombrePorId(lista: ObjetoConIdYNombre[], idBuscado: number): string {
    for (const objeto of lista) {
      if (objeto.id === idBuscado) {
        return objeto.nombre; // Devuelve el nombre si se encuentra el ID
      }
    }
    return '';
}