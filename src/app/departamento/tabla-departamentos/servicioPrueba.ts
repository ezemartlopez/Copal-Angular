const departamentos = [
  { nombre:"Departamento Tecnico",
    id:1,
    subDepartamentos:[{
      id:1,
      nombre:"Asuntos Institucionales y Comunicación",
      description:"Su objetivo es desarrollar la estrategia institucional y de comunicación para posicionar la agenda de propuestas de política pública para la mejora de los sectores de la IAB ante el Gobierno Nacional, los Gobiernos Provinciales y los Gobiernos Municipales.",
      icono:"/assets/logos/logo-ejemplo.png"
    },
    {
      id:2,
      nombre:"Economía, Desarrollo Regional y PyME",
      description:"Su objetivo es el diseño de propuestas y seguimiento en materia de políticas de desarrollo productivo, acceso al financiamiento y mejora de la competitividad de los sectores de la industria de alimentos y bebidas, en particular las economías regionales y el entramado PyME.",
      icono:"/assets/logos/logo-ejemplo.png"
    },
    {
      id:3,
      nombre:"Normativa Alimentaria",
      description:"Su objetivo principal consiste en el seguimiento y análisis de las regulaciones alimentarias vigentes y proyectos de las mismas, sean estos de carácter regional (MERCOSUR), nacional, provincial o municipal, dando cobertura a distintas instancias de discusión normativa.",
      icono:"/assets/logos/logo-ejemplo.png"
    },
    {
      id:4,
      nombre:"Política Fiscal y Tributaria",
      description:"Su objetivo principal es analizar, evaluar y proponer las mejoras del sistema tributario que alcanza a la IAB, con intención de disminuir la carga tributaria y simplificar los regímenes correspondientes.",
      icono:"/assets/logos/logo-ejemplo.png"
    }],
    descripcion: "COPAL cuenta con 7 Departamentos técnicos exclusivos para socios. Cada Departamento se encuentra dirigido porprofesionales altamente capacitados y con reconocida trayectoria en cada una de estas áreas, dichos Departamentos están compuestos por representantes de nuestros socios quienes se reúnen periódicamente para analizar y elevar propuestas sobre diferentes problemáticas inherentes.",
    autoridades:[{rol:"Coordinación Departamentos Técnicos",nombre:"Darinka Anzulovich"}, {rol:"Asistente de Departamentos Técnicos",nombre:"Juliana Cortez Danese"}]
  }
  ]; 

export function obtenerDepartamentos(){
    let departamentosProcesados = departamentos.map(
        function(objeto){ 
          return { 
            ...objeto, //propiedades anteriores
            mostrar: false, //nueva propiedad
            cambiarEstado:function(){this.mostrar = !this.mostrar;} //nuevo metodo
          };
        }
      );
    
    return departamentosProcesados;//finjamos que lo pide del back

}