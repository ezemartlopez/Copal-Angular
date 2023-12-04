import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if (!value) return null;
    if (!args) return value;

    return value.filter((item:any) => { //Args es el texto que se ingresa en el input de búsqueda.
      console.log(args)
      return item.nombreDeEmpresa.toLowerCase().includes(args)
    })
  }

}
