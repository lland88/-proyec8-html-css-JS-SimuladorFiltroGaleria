//el siguiente arreglo puede ser considerado como la "base de datos" de la pagina de practica
const items = [
  {
    imagen: "assets/t shirts/tshirt 1 camiseta de manga corta gris 16.jpg",
    tipo: "Camiseta",
    descripcion: "Manga corta",
    color: "Gris",
    precio: 16,
  },
  {
    imagen:
      "assets/dress shirt/dress shirt 1  camisa de vestir informal manga corta de rayas blanco y azul17.jpg",
    tipo: "Camisa de vestir",
    descripcion: "Informal manga corta de rayas",
    color: "Blanco",
    precio: 16,
  },
  {
    imagen: "assets/pants/pantalon 1 pantalones jean elasticos negro 23.80.jpg",
    tipo: "Pantalones",
    descripcion: "Jean elásticos",
    color: "Negro",
    precio: 24,
  },
  {
    imagen: "assets/sweaters/sweater 1 sueter casual cuello en v caqui 13.jpg",
    tipo: "Súeter",
    descripcion: "Casual cuello en V",
    color: "Caqui",
    precio: 13,
  },
  {
    imagen: "assets/t shirts/T-Shirt 2 camiseta de algodon rosada 22.jpg",
    tipo: "Camiseta",
    descripcion: "De algodón",
    color: "Rosado",
    precio: 22,
  },
  {
    imagen: "assets/sweaters/sweater 4 sueter de cremallera azul 57.jpg",
    tipo: "Súeter",
    descripcion: "Casual de cremallera",
    color: "Azul",
    precio: 57,
  },
  {
    imagen:
      "assets/dress shirt/dress shirt 2 camisa de vestir formal negra 28_.jpg",
    tipo: "Camisa de vestir",
    descripcion: "Camisa de vestir formal",
    color: "Negro",
    precio: 28,
  },
  {
    imagen: "assets/pants/pantalon 2 pantalones caqui de corte ajustado 19.jpg",
    tipo: "Pantalones",
    descripcion: "De corte ajustado",
    color: "Caqui",
    precio: 19,
  },
  {
    imagen:
      "assets/sweaters/sweater 2 suerter casual cuello redondo blanco 23 .jpg",
    tipo: "Súeter",
    descripcion: "Casual cuello redondo",
    color: "Blanco",
    precio: 23,
  },
  {
    imagen:
      "assets/t shirts/t-shirt 3 camiseta resistente a las arrugas de secadao rapido verde 27.jpg",
    tipo: "Camiseta",
    descripcion: "Resistente a las arrugas",
    color: "Verde",
    precio: 27,
  },
  {
    imagen:
      "assets/dress shirt/dress shirt 3 camisa de vestir formal blanca 37.jpg",
    tipo: "Camisa de vestir",
    descripcion: "Camisa de vestir formal",
    color: "Blanco",
    precio: 37,
  },
  {
    imagen: "assets/pants/pantalon3 pantalones classic formales negros 47_.jpg",
    tipo: "Pantalones",
    descripcion: "Classic formales",
    color: "Negro",
    precio: 47,
  },
  {
    imagen:
      "assets/sweaters/sweater 3 suerter de cuello redondo de algodon negro 37.jpg",
    tipo: "Súeter",
    descripcion: "Casual cuello redondo de algodón",
    color: "Negro",
    precio: 37,
  },
  {
    imagen: "assets/t shirts/t-shirt 4 camiseta unisex de algodon negra 9 .jpg",
    tipo: "Camiseta",
    descripcion: "Unisex de algodón",
    color: "Negro",
    precio: 9,
  },
  {
    imagen:
      "assets/dress shirt/dress shirt 4 camisa de vestir casual blanca sin arrugas 21.jpg",
    tipo: "Camisa de vestir",
    descripcion: "Camisa de vestir casual",
    color: "Blanco",
    precio: 21,
  },
  {
    imagen: "assets/pants/pantalon 4 pantalones deportivos azules 13_.jpg",
    tipo: "Pantalones",
    descripcion: "deportivos strech",
    color: "Azul",
    precio: 13,
  },
];
//seleccionamos el contenedor de los items para insertarlos dinamicamente
const contenedor = document.querySelector(`.items`);
//DOMcontentLoaded quiere decir que apenas la pagina se abra y cargue los elementos llamara a la funcion mostrarItems
document.addEventListener("DOMContentLoaded", mostrarItems(items));
//La funcion mostraritems iterará sobre sobre cada uno de los objetos del arreglo insertandolos en el html para así mostrar los resultados
function mostrarItems(items) {
  items.forEach((item) => {
    const itemhtml = document.createElement(`DIV`);
    itemhtml.classList.add(`item`);
    itemhtml.innerHTML = `
             <img
             src="${item.imagen}"
             alt=""
              />
          <h4>${item.tipo}</h4> <p>${item.descripcion} <span>${item.color}</span></p> <p>precio $<span>${item.precio} </span></p>
          `;
    contenedor.appendChild(itemhtml);
  });
}

//hasta lo anterior, es la pagina original cuando se carga de aquí en adelante, declararemos las variables y funciones necesarias para hacer los filtrados correspondientes.
//Seleccionamos los inputs y los almacenamos en variables
const tipo = document.querySelector(`.tipo`);
const color = document.querySelector(`.color`);
const preciomin = document.querySelector(`.preciominv`);
const preciomax = document.querySelector(`.preciomaxv`);

//creamos eventlisteners que llamen a una funcion cuando se modifique un parametro de busqueda
tipo.addEventListener("input", parametrosBusqueda);
color.addEventListener("input", parametrosBusqueda);
preciomin.addEventListener("input", parametrosBusqueda);
preciomax.addEventListener("input", parametrosBusqueda);
//creamos un objeto para almacenar los parametros de busqueda
const parametros = {
  tipo: "",
  color: "",
  preciomin: "",
  preciomax: "",
};
//Con la funcion parametrosbusqueda llenamos el objeto cada vez que se seleccione un parametro
function parametrosBusqueda(e) {
  if (e.target.classList.contains(`tipo`)) {
    parametros.tipo = e.target.value;
  } else if (e.target.classList.contains(`color`)) {
    parametros.color = e.target.value;
  } else if (e.target.classList.contains(`preciominv`)) {
    parametros.preciomin = e.target.value;
  } else if (e.target.classList.contains(`preciomaxv`)) {
    parametros.preciomax = e.target.value;
  }
  filtro();
}
// el arreglo de objetos puede ser iterado multiples veces y podemos llamar a distintas funciones que apliquen las distintas condiciones.
function filtro() {
  const resultados = items
    .filter(filtrarTipo)
    .filter(filtrarColor)
    .filter(filtrarPrecioMin)
    .filter(filtrarPrecioMax);
  eliminarHtml();
  resultadoHtml(resultados);
}

function filtrarTipo(item) {
  //verificamos si existe el parametro porque si esta vacio no debemos igualar nuestro arreglo a él.
  if (parametros.tipo) {
    //colocamos la condicion que queremos que se cumpla para ir formando nuestro nuevo arreglo, con el return regresamos los valores que cumplen a resultado
    return item.tipo === parametros.tipo;
  } else {
    //si el parametro esta vacio entonces simplemente regresamos el arreglo como estaba originalmente,
    return item;
  }
}
//la misma logica de filtrartipo aplica para todos los demas filtros.
function filtrarColor(item) {
  if (parametros.color) {
    return item.color === parametros.color;
  } else {
    return item;
  }
}

function filtrarPrecioMin(item) {
  if (parametros.preciomin) {
    return item.precio >= parametros.preciomin;
  } else {
    return item;
  }
}

function filtrarPrecioMax(item) {
  if (parametros.preciomax) {
    return item.precio <= parametros.preciomax;
  } else {
    return item;
  }
}
//eliminamos el html del contenedor cada vez que se modifquen los parametros de busqueda
function eliminarHtml() {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}
//insertamos el resultado obtenido por los fitler en el contendor
function resultadoHtml(resultados) {
  //si resultado tiene valores entonces se ejecuta:
  if (resultados) {
    //debemos volver a insertar la clase que le coloca el Grid en css antes de colocar el arreglo.
    const clasegrid = document.querySelector(`.items`);
    if (clasegrid == null) {
      contenedor.classList.remove(`center`);
      contenedor.classList.add(`items`);
    }
    //iteramos en cada uno de los objetos del arreglo y los imprimimos en el html
    resultados.forEach((resultado) => {
      const itemhtml = document.createElement(`DIV`);
      itemhtml.classList.add(`item`);
      itemhtml.innerHTML = `
               <img
               src="${resultado.imagen}"
               alt=""
                />
            <h4>${resultado.tipo}</h4> <p>${resultado.descripcion} <span>${resultado.color}</span></p> <p>precio $<span>${resultado.precio} </span></p>
            `;
      contenedor.appendChild(itemhtml);
    });
  }
  //si el arreglo está vacio entonces mostramos una alerta y aca simplemente asignamos clases para quitar el grid para la alerta
  if (resultados.length === 0) {
    contenedor.classList.remove(`items`);
    contenedor.classList.add(`center`);
    const alerta = document.createElement(`H4`);
    alerta.innerHTML = `No se encuentran resultados, por favor modifique los parametros de busqueda.`;
    contenedor.appendChild(alerta);
  }
}
