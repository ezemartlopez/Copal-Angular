export interface atributosUsuario{
    id:number;
    rol:string;
    nombre:string;
}


export interface atributosGrupo {
    id: number;
    name:string;
    description:string;
    usuarios: atributosUsuario[];
}


export const grupo: atributosGrupo = {
    id: 0,
    name: "Departamento Tecnico",
    description:"desco tecnico",
    usuarios: [
        { id: 1, rol: "Presidente" ,nombre:"asdsad"},
        { id: 2, rol: "Vicepresidente",nombre:"alexander" },
        { id: 3, rol:"Tesorero",nombre:"flores"},
        { id: 4, rol:"Tesorero", nombre:"Rodrigo"}
    ]
};
