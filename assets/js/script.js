
//boton para mostrar el contenido
const traerDatosBtn = document.querySelector('#traerDatosBtn');

//contenedor a actualizar
const contenedorPadre = document.querySelector('#contenedorPadre');

//API
dragonBallAPI = 'https://dragonball-api.com/api/characters';

//esta funcion trae los datos de la API
const cargarDatos = async (url) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Error en la API');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        alert(error)
    }
};





//guarda los todos los personajes
const totalPersonajes = async() => {
     const data = await cargarDatos(dragonBallAPI);

    //para verificar que lleguen los datos correctamente
    if (!data) {
        throw new Error('error al traer los datos')
        console.log(Error)
    }
    //accede a los items 
    const dataPersonajes = data.items;
    return dataPersonajes;
};

//funcion para mostrar los personajes aparte para poder reutilizarla
const mostrarPersonajes = async (personajes) => {

    personajes.forEach((personaje) => {
        contenedorPadre.innerHTML += `
         <div class="col-6 pb-2 d-flex justify-content-center" data-id=${personaje.id} style="width: 18rem;">
            <div>
                    <div class=" pb-2 d-flex justify-content-center">
                        <img  height="300px" class= 'card-img-top' src="${personaje.image}" >
                    </div>
                    <div class="card-body">
                        <p id="nombre" class="card-text"> ${personaje.name}  </p>
                        <p id="raza" class="card-text"> ${personaje.race} </p>
                        <p id="genero" class="card-text"> ${personaje.gender} </p>
                        <button  id="botonVerMas" class="btn btn-outline-dark"> Ver Más </button>
                    </div>
                </div>
            </div>
        
        
        `
        
    });
};

//muestra todos los personajes 
traerDatosBtn.addEventListener( 'click', async () => {
    const personajes = await totalPersonajes();
     mostrarPersonajes(personajes);
});


   
   

    

//retorna los escrito en el buscador
const buscador = async () => {

     const busqueda = await document.querySelector('#buscador').value;
    
     return busqueda;
};

const buscarBtn = document.querySelector('#buscarBoton');
const limpiarBtn = document.querySelector('#limpiarBoton');


//crea un array, recorre todos los nombres buncando coincidencias y las pushea al array
//invoca la funcion para mostrar y le pasa de argumento el array asi solo mustra las coincidencias
buscarBtn.addEventListener('click', async (e) => {
    e.defaultPrevented(true);

    const personajes = await totalPersonajes();
    const cantidadPersonajes =  await personajes.length;
    const busqueda = await buscador();
    const nombre = '';
    const  personajesBuscados = [];

     for (let i = 0; i< cantidadPersonajes ; i++) 
        nombre = await personajes[i].name.toLowerCase()
    ;
        if (nombre.includes(busqueda.toLowerCase())){
            personajesBuscados.push(personajes[i]);

        };
        console.log(personajesBuscados)

    mostrarPersonajes(personajesBuscados);


     });


//evento para limpiar busqueda
limpiarBtn.addEventListener('click', async() => {
    //cambia el valor de el imput y lo deja vacio
    document.querySelector('#buscador').value = '';
    const personajes = await totalPersonajes();
     mostrarPersonajes(personajes);

    });
