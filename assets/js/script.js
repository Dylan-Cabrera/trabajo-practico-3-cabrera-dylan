
//boton para mostrar el contenido
const traerDatos = document.querySelector('#traerDatosBtn');

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





//inicia el evento cuando se hace click en ese boton
traerDatos.addEventListener( 'click', async () => {

    //invoca a la funcion y guarda lo que retorna
    const data = await cargarDatos(dragonBallAPI);

    //para verificar que lleguen los datos correctamente
    if (!data) {
        throw new Error('error al traer los datos')
        console.log(Error)
    }
    //accede a los items 
    const dataPersonajes = data.items;

    console.log(dataPersonajes)

    dataPersonajes.forEach((personaje) => {
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








} )