// Variables Globales
const productosBase = [
    { codigo: 'PROD001', nombre: 'TV', categoria: 'Tecno', precio: 250000 },
    { codigo: 'PROD002', nombre: 'Olla', categoria: 'Cocina', precio: 13000 },
    { codigo: 'PROD003', nombre: 'Cacerola', categoria: 'Cocina', precio: 10000 },
    { codigo: 'PROD004', nombre: 'Auriculares', categoria: 'Tecno', precio: 7000 },
    { codigo: 'PROD005', nombre: 'Microfono', categoria: 'Tecno', precio: 17000 },
    { codigo: 'PROD006', nombre: 'Escritorio', categoria: 'Muebles', precio: 10000 }
];

const productos = [];

let codigo;
let nombre;
let categoria;
let precio;

// Clases definidas, constructo para los productos
class Producto {
    constructor(codigo, nombre, categoria, precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
    }

    calcIva() {
        return this.precio * 1.21;
    }
}

function mostrarProductos() {
    const container = document.getElementById('resultadoValor');
    container.innerHTML = ''; 

    productos.forEach(producto => {
        const productoInfo = document.createElement('p');
        productoInfo.textContent = `Cód.: ${producto.codigo} | ${producto.nombre} (${producto.categoria}) | $${producto.calcIva()} (iva incl.)`;
        container.appendChild(productoInfo);
    });
}

function guardarEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function cargarDesdeLocalStorage() {
    const storedProductos = localStorage.getItem('productos');
    if (storedProductos) {
        productos = JSON.parse(storedProductos);
    }
}
// FUNCIONES
const nuevoCodigo = () => {
    let x = prompt(`Por favor ingrese el código del producto. Máximo 8 caracteres.`).toUpperCase();

    while (x.length > 8 || !x) {
        if (x.length > 8) {
            x = prompt(`recuerde que su código debe tener un máximo de 8 carácteres. 
            Ingrese su código de nuevo:`);    
        } else if (!x) {
            x = prompt(`este campo es obligatorio, por favor ingrese un código para el producto que desea registrar.
            Ingrese su código nuevamente:`);    
        }
    }

    return x;
}

const notNull = val => {
    if(val) {
        return val;
    } else {
        while (!val) {
            val = prompt(`Este campo es obligatorio. Por favor, llénelo.`);
        }
        return val;
    }
}

const notNumber = val => {
    while (isNaN(val) || val <= 0) {

        if (isNaN(val)) {
            val = Number(prompt(`Este campo solo acepta valores numéricos, inténtelo de nuevo:`));
        } else {
            val = Number(prompt(`El valor del producto debe ser mayor a $0 ! Inténtelo de nuevo:`));
        }
    }
    return val;
}

const agregarProducto = (codigo, nombre, categoria, precio) => {
    let nuevo = new Producto(codigo, nombre, categoria, precio);
    productos.push(nuevo);
    console.log('agregaste un nuevo producto'); //debug
}

productosBase.forEach(producto => {
    agregarProducto(producto.codigo, producto.nombre, producto.categoria, producto.precio);
});


// funciones del menu y agregado de productos
const menuNuevoProducto = () => {
    console.log('ingresaste a menu nuevo producto'); 
    let continuar = true;
    while (continuar) {

        agregarProducto(codigo, nombre, categoria, precio);
        
        guardarEnLocalStorage(); 
    }
    menuPrincipal();
}

//BUSQUEDAS
const menuBuscarPorNombre = () => {
    console.log('ingresaste a buscar producto por nombre'); 
    let continuar = true;
    while (continuar) {
        let selector = prompt(`   Ingrese el nombre del producto que desea buscar:`).toLowerCase();
        let resultado = productos.find((e) => e.nombre.toLowerCase() === selector);
        
        if (!resultado) {
            selector = prompt(`   El producto que está buscando no se encuentra en nuestra base de datos.
            Desea buscar de nuevo? (si / no)`);
            selector == 'si' ? continuar = true : continuar = false;
        } else {
            selector = prompt(`   Encontramos tu producto:
            Nombre: ${resultado.nombre}
            Codigo de referencia: ${resultado.codigo}
            Categoría: ${resultado.categoria}
            Precio: $${resultado.calcIva()} (iva incluído)
            - - - - - - - - -
            Desea buscar otro producto? (si / no)`);
            selector == 'si' ? continuar = true : continuar = false;
        }
    }
    menuPrincipal();
}

const menuFiltrarCategoria = () => {
    console.log('incresaste a filtrar por categoria'); 
    let continuar = true;
    while (continuar) {
        let selector = prompt(`Ingrese la categoria a filtrar:`);

        let resultado = productos.filter(producto => producto.categoria.toLowerCase() === selector.toLowerCase());

        if (resultado.length == 0) {
            selector = prompt(`La categoría que está buscando no se encuentra en nuestra base de datos.
            Desea buscar de nuevo? (si / no)`);
            selector == 'si' ? continuar = true : continuar = false;
        } else {
            let mostrar = [];
            resultado.forEach(producto => {
                mostrar.push(`\n${producto.nombre}, valor: $${producto.precio}`);
            })
            console.log(
            );
            selector = prompt(`Los productos en la categoría "${selector}" son:
            ${mostrar}
        - - - - - - - 
        Desea buscar de nuevo? (si / no)`);
            selector == 'si' ? continuar = true : continuar = false;
        }
    }
    menuPrincipal();
}

const menuFiltrarPorPrecio = () => {
    console.log('ingresaste a filtrar por precio'); 
    let continuar = true;
    while (continuar) {
        let selector = Number(prompt(`Ingrese el precio minimo de productos a mostrar:`));

        let resultado = productos.filter(producto => producto.precio > selector);

        if (isNaN(selector) || selector < 0) {
            selector = prompt(`Por favor ingrese un numero (no negativo).
            Desea buscar de nuevo? (si / no)`);
            selector == 'si' ? continuar = true : continuar = false;
        } else {
            let mostrar = [];
            resultado.forEach(producto => {
                mostrar.push(`\n${producto.nombre}, valor: $${producto.precio}`);
            })
            selector = prompt(`Los productos con precios mayores a $${selector} son:
            ${mostrar}

        - - - - - - - 
        Desea buscar de nuevo? (si / no)`);
            selector == 'si' ? continuar = true : continuar = false;
        }
    }
    menuPrincipal();
}

const menuMostrarTodos = () => {
    console.log('ingresaste a mostrar todos los productos');
    
    let mostrar = [];

    productos.forEach(producto => {
        mostrar.push(`\nCód.: ${producto.codigo} | ${producto.nombre} (${producto.categoria}) | $${producto.calcIva()} (iva incl.)`)
    })
    
    alert(`Productos cargados en la base de datos:
    ${mostrar}`);

    menuPrincipal();
}

const menuPrincipal = () => {
    console.log('ingresaste al menu principal'); 
    let selector = Number(prompt(`   Bienvenidos a nuestra tienda!
    Cómo desea proceder?
    - - - - - - - - - - -
    1 . Agregar un producto nuevo.
    2 . Buscar un producto en específico.
    3 . Filtrar productos por categoría.
    4 . Filtrar productos por precio.
    5 . Mostrar todos los productos.
    - - - - - - - - - - -`));

    switch (selector) {
        case 1:
            menuNuevoProducto();
            break;
        
        case 2:
            menuBuscarPorNombre();
            break;

        case 3:
            menuFiltrarCategoria();
            break;

        case 4:
            menuFiltrarPorPrecio();
            break;

        case 5:
            menuMostrarTodos();
            break;

        default:
            alert('Por favor ingrese una opción valida!');
            menuPrincipal(); 
    }
}

// inicio
cargarDesdeLocalStorage(); 
alert(`Bienvenido!
Por favor, utilice las opciones del menú para navegar por el programa!`);
menuPrincipal();
