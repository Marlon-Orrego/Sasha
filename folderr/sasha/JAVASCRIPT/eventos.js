const mostrarEventos = async () => {
  let contenido = document.getElementById("container");
  let eventos = await getEventos();
  eventos.forEach(async element => {
    firebase.auth().onAuthStateChanged(async (idUsuario) => {
      let uid = idUsuario.uid
      let usuario = await getUsuario(uid);
      usuario=usuario.data();
      if(usuario.tipoUsuario=="HjaE9JmZaSXTKQVVGjR1"){
      let datos = element.data();
      contenido.innerHTML += `
            <div id="proyecto${element.id}" class="proyectoMain">
              <center>
                <div class="imgProyecto">
                  <img width=200 src=${datos.urlFoto} ><br>
                </div>
                ${datos.nombre}<br>
                ${datos.informacion}<br><br>
                ${datos.fecha}<br><br> 
                <button id="${element.id}" onclick="vistaFormulario(this)" class="borderBoton btn btn-warning">Asistir</button><br><br>
                <button id="${element.id}" onclick="asistentes(this)" class="borderBoton btn btn-warning">Asistentes</button>

                <br><br>
              </center>
            </div>
          `;
      }
      else{
        let datos = element.data();
      contenido.innerHTML += `
            <div id="proyecto${element.id}" class="proyectoMain">
              <center>
                <div class="imgProyecto">
                  <img width=200 src=${datos.urlFoto} ><br>
                </div>
                ${datos.nombre}<br>
                ${datos.informacion}<br><br>
                ${datos.fecha}<br><br> 
                <button id="${element.id}" onclick="vistaFormulario(this)" class="borderBoton btn btn-warning">Asistir</button><br><br>
                

                <br><br>
              </center>
            </div>
          `;
      }
    })
  
  });
}
mostrarEventos();
const confirmarAsistencia = async(objeto) => {
  event.preventDefault();
  Swal.fire({
    position: 'top-end',
    title: 'Guardando datos',
    showConfirmButton: false,
  })
  let id=objeto.id;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let cedula = document.getElementById("cedula").value;
  let evento=id
  await db.collection("asistenciaEvento").doc(cedula+id).set({
    nombre,
    apellido,
    cedula,
    evento
  })
  mostrarFormulario();
}
const asistentes=async(objeto)=>{
  let reservas = await getAsistencia(objeto.id);
  let evento=await getEvento(objeto.id);
  evento=evento.data();

  let contenido=document.getElementById("contenido");
  contenido.innerHTML
  =`
  <center><h2>Asistentes para el evento ${evento.nombre}</h2></center>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
        </tr>
    </thead>
    <tbody id="table1">
    </tbody>
    </table>
  `;
  let table1=document.getElementById("table1");
  reservas.forEach(element=>{
    let datos=element.data();
    
    table1.innerHTML+=`
    <tr>
      <td>${datos.cedula}</td>
      <td>${datos.nombre}</td>
      <td>${datos.apellido}</td>
  </tr>
    `
  })
}


const mostrarFormulario = async () => {
  let formulario = document.getElementById("contenido");
  formulario.innerHTML
    = `
    <svg style="display: none">
    <symbol id="star" viewBox="0 0 1024 1024">
      <polygon points="512 0 627 354 999 354 698 572 813 926 512 708 211 926 326 572 25 354 397 354 512 0" />
    </symbol>
  </svg>
  
  <div id="modal">
    <div class="overlay">
      <div class="feedback container--small align--center">
        <h1 class="feedback__title">Ayudanos a Mejorar</h1>
        
        <p class="feedback__description">¡Por favor mediante la siguiente encuesta responde de acuerdo a tu experiencia utilizando nuestros servicios.!</p>
        <form class="feedback__form">
          <fieldset class="rating rating__food">
            <legend> ¿Te sientes en un ambiente agradable al hacer uso de nuestros servicios?</legend>
            <div class="flex-container">
              <input type="radio" id="food-5" name="rating__food" value="5" >
              <label for="food-5"><svg>
                  <title>Five Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="food-4" name="rating__food" value="4" border=10px solid black>
              <label for="food-4"><svg>
                  <title>Four Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="food-3" name="rating__food" value="3">
              <label for="food-3"><svg>
                  <title>Three Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="food-2" name="rating__food" value="2">
              <label for="food-2"><svg>
                  <title>Two Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="food-1" name="rating__food" value="1">
              <label for="food-1"><svg>
                  <title>One Star</title>
                  <use xlink:href="#star"></use>
                </svg></label>
            </div>
          </fieldset>
  
          <fieldset class="rating rating__q2">
            <legend>¿Sientes que Jupiter permite relacionarte con nuevos espacios que antes no tenías acceso o conocimiento en la Universidad?</legend>
            <div class="flex-container">
              <input type="radio" id="driver-5" name="rating__q2" value="5">
              <label for="driver-5"><svg>
                  <title>Five Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="driver-4" name="rating__q2" value="4">
              <label for="driver-4"><svg>
                  <title>Four Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="driver-3" name="rating__q2" value="3">
              <label for="driver-3"><svg>
                  <title>Three Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="driver-2" name="rating__q2" value="2">
              <label for="driver-2"><svg>
                  <title>Two Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="driver-1" name="rating__q2" value="1">
              <label for="driver-1"><svg>
                  <title>One Star</title>
                  <use xlink:href="#star"></use>
                </svg></label>
            </div>
          </fieldset>
  
          <fieldset class="rating rating__q3">
            <legend>¿Cómo calificas la experiencia de navegar en Jupiter?</legend>
            <div class="flex-container">
              <input type="radio" id="experience-5" name="rating__q3" value="5">
              <label for="experience-5"><svg>
                  <title>Five Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="experience-4" name="rating__q3" value="4">
              <label for="experience-4"><svg>
                  <title>Four Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="experience-3" name="rating__q3" value="3">
              <label for="experience-3"><svg>
                  <title>Three Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="experience-2" name="rating__q3" value="2">
              <label for="experience-2"><svg>
                  <title>Two Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
              <input type="radio" id="experience-1" name="rating__q3" value="1">
              <label for="experience-1"><svg>
                  <title>One Stars</title>
                  <use xlink:href="#star"></use>
                </svg></label>
            </div>
          </fieldset>
        </form>
        <button onclick="window.location.href="eventos.html"" type="submit" class="feedback__submit">Enviar Respuestas</button>
      </div>
    </div>
  </div>
  ` 
  
  }


  