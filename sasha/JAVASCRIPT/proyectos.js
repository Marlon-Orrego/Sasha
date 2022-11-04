const mostrarProyectos = async () => {
  try{
    let contenido = document.getElementById("container");
  let proyectos = await getProyectos();
  proyectos.forEach(async element => {
    
    let datos = element.data();
    let categoria = await getCategoria(datos.categoria)
    categoria = categoria.data();
    contenido.innerHTML += `
              <div id="proyecto${element.id}" class="proyectoMain">
                <center>
                  <div class="imgProyecto">
                    <img width=140px src=${datos.urlFoto} ><br>
                  </div>
                  ${categoria.nombre}<br>
                  ${datos.Publico}<br>
                  Etapa: ${datos.etapa}<br><br>
                  <button id="${element.id}" onclick="verficha(this)" class="borderBoton btn btn-warning">Ver ficha</button>
                  <br><br>
                </center>
              </div>
            `;

  });
  }catch(e){
    
  }
  
}
mostrarProyectos();


function agregarComentario(element) {
  let proyectoId = element.id;
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Finalizar comentario;',
    showCancelButton: true,
    progressSteps: ['1']
  }).queue([
    {
      title: 'Comentario',
      text: 'Ingresa tu comentario'
    }
  ]).then((result) => {
    if (result.value) {
      let comentario = result.value;
      db.collection("comentarios").doc().set({
        comentario,
        proyectoId
      })
      Swal.fire({
        title: '¡Comentario Registrado!',
        html:
          'Tu comentario es: <pre><code>' +
          result.value +
          '</code></pre>',
        confirmButtonText: 'Ok'

      })
    }
  });
}

const actualizarAvance = async (objeto) => {
  
  Swal.fire({
    position: 'top-end',
    title: 'Actualizando proyecto',
    showConfirmButton: false,
  })
  let id = objeto.id;
  let avance= await getAvance(id);
  await actualizarEvidencia(avance);
  avance=avance.data();
  let proyecto = await getProyecto(avance.id);
  id=proyecto.id;
  proyecto=proyecto.data();
  let nombre=proyecto.nombre;
  let categoria=proyecto.categoria;
  let descripcion=proyecto.descripcion;
  let urlFoto=proyecto.urlFoto;
  let Programa=proyecto.Programa;
  let Publico=proyecto.Publico;
  let contenidoInnovador=proyecto.contenidoInnovador;
  let areaAplicacion=proyecto.areaAplicacion;
  let impacto=proyecto.impacto;
  let solucionBrindada=proyecto.solucionBrindada;
  let objetivo=proyecto.objetivo;
  let Participantes=proyecto.Participantes;
  let Metodologia=proyecto.Metodologia;
  let palabras=proyecto.palabras;
  let idioma=proyecto.idioma;
  let licencia=proyecto.licencia;
  let Asesores=proyecto.Asesores;
  let dueño=proyecto.dueño;
  let etapa=proyecto.etapa+1;
  let estado=proyecto.estado;
  if(etapa>4){
    estado=false;
    Swal.fire({
      position: 'top-end',
      title: 'Su proyecto ha terminado su ciclo...',
    })
  }
  await db.collection("proyectos").doc(id).set({
    nombre,
    categoria,
    descripcion,
    urlFoto,
    Programa,
    Publico,
    contenidoInnovador,
    areaAplicacion,
    impacto,
    solucionBrindada,
    objetivo,
    Participantes,
    Metodologia,
    palabras,
    idioma,
    licencia,
    Asesores,
    dueño,
    etapa,
    estado
  });
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Proyecto actualizado',
    showConfirmButton: false,
    timer: 1500
  })

  mostrarFormulario();
  window.location.reload();
}


const actualizarEvidencia=async (avance)=>{
  console.log(avance);
  let datos=avance.data();
  let estado=true;
  let fecha=datos.fecha;
  let etapa=datos.etapa;
  let urlPDF=datos.urlPDF;
  let id=datos.id;
  await db.collection("evidenciaProyecto").doc(avance.id).set({
    estado,
    fecha,
    etapa,
    urlPDF,
    id

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
    <div class="overlay calificacion">
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
        <button type="submit" class="feedback__submit">Enviar Respuestas</button>
      </div>
    </div>
  </div>
  ` 
  }
  