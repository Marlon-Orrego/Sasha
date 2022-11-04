const verficha = async (element) => {
    let id = element.id;
    let contenido = document.getElementById("container");
    contenido.innerHTML = "";
    contenido = document.getElementById("contenido");
    contenido.innerHTML = "";
    firebase.auth().onAuthStateChanged(async(idUsuario)=>{


    let proyecto = await getProyecto(id);
    proyecto = proyecto.data();
    
  if(idUsuario.uid==proyecto.dueño){
    contenido.innerHTML = `
    <div class="ficha">
                <center><img src="${proyecto.urlFoto}" width=100></center>
                <h3>Nombre del proyecto</h3>
                <p>${proyecto.nombre}</p>
                <h3>Descripción</h3>
                <p>${proyecto.descripcion}</p>
                <h3>Programa</h3>
                <p>${proyecto.Programa}</p>
                <h3>Público</h3>
                <p>${proyecto.Publico}</p>
                <h3>Contenido Innovador</h3>
                <p>${proyecto.contenidoInnovador}</p>
                <h3>Área Aplicación</h3>
                <p>${proyecto.areaAplicacion}</p>
                <h3>Impacto</h3>
                <p>${proyecto.impacto}</p>
                <h3>Solución Brindada</h3>
                <p>${proyecto.solucionBrindada}</p>
                <h3>Objetivo</h3>
                <p>${proyecto.objetivo}</p>
                <h3>Participantes</h3>
                <p>${proyecto.Participantes}</p>
                <h3>Metodología</h3>
                <p>${proyecto.Metodologia}</p>
                <h3>Palabras</h3>
                <p>${proyecto.palabras}</p>
                <h3>Idioma</h3>
                <p>${proyecto.idioma}</p>
                <h3>Licencia</h3>
                <p>${proyecto.licencia}</p>
                <h3>Asesores</h3>
                <p>${proyecto.Asesores}</p>
                <div id="formEvidencia">
                <center><button id="${element.id}" onclick="abrirEvidencia(this)" class="borderBoton btn btn-warning">Actualizar avance</button></center>
                </div>
                
            
        `;
  }else{
    contenido.innerHTML = `
    <div class="ficha">
                <center><img src="${proyecto.urlFoto}" width=100></center>
                <h3>Nombre del proyecto</h3>
                <p>${proyecto.nombre}</p>
                <h3>Descripción</h3>
                <p>${proyecto.descripcion}</p>
                <h3>Programa</h3>
                <p>${proyecto.Programa}</p>
                <h3>Público</h3>
                <p>${proyecto.Publico}</p>
                <h3>Contenido Innovador</h3>
                <p>${proyecto.contenidoInnovador}</p>
                <h3>Área Aplicación</h3>
                <p>${proyecto.areaAplicacion}</p>
                <h3>Impacto</h3>
                <p>${proyecto.impacto}</p>
                <h3>Solución Brindada</h3>
                <p>${proyecto.solucionBrindada}</p>
                <h3>Objetivo</h3>
                <p>${proyecto.objetivo}</p>
                <h3>Participantes</h3>
                <p>${proyecto.Participantes}</p>
                <h3>Metodología</h3>
                <p>${proyecto.Metodologia}</p>
                <h3>Palabras</h3>
                <p>${proyecto.palabras}</p>
                <h3>Idioma</h3>
                <p>${proyecto.idioma}</p>
                <h3>Licencia</h3>
                <p>${proyecto.licencia}</p>
                <h3>Asesores</h3>
                <p>${proyecto.Asesores}</p>
                
                
            
        `;
  }
    })
}
const abrirEvidencia = (element) => {
    let id = element.id;
    let formEvidencia = document.getElementById("formEvidencia");
    formEvidencia.innerHTML = `
    <h3>Seleccionar Evidencia de avance</h3>
    <input type="file" id="archivoPDF" class="form-control" accept=".pdf">
    <center><button id="${id}" class="btn btn-info" onclick="enviarEvidencia(this)">Enviar</button></center>
    `;
}

const enviarEvidencia = (id) => {
    Swal.fire({
        position: 'top-end',
        title: 'Guardando Pdf',
        showConfirmButton: false,

    })
    event.preventDefault();
    try {

        let file = document.getElementById('archivoPDF').files[0];
        let hoy = new Date();
        hora = hoy.getHours() + ':' + hoy.getSeconds() + ':' + hoy.getMinutes();
        horaFecha = hoy.getDate() + ':' + (hoy.getMonth() + 1) + ':' + hoy.getFullYear() + ':' + hora;
        const name = file.name + ':' + horaFecha;
        if (file == null) {

        } else {
            const
            metadata = {
                contentType: file.type
            }
            const task = ref.child(name).put(file, metadata);

            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {



                    registrarDatos(id.id, url, hoy);
                });


        }
    } catch (E) {
        console.log(E)
    }

}

const registrarDatos = async (id, urlPDF, hoy) => {
    let estado = false;
    let fecha = `${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`
    let proyecto = await getProyecto(id);
    proyecto = proyecto.data();
    let etapa = proyecto.etapa+1;
    await db.collection("evidenciaProyecto").doc().set({
        estado,
        fecha,
        etapa,
        urlPDF,
        id

    })
    Swal.fire({
        position: 'top-end',
        title: 'PDF guardado',
        showConfirmButton: false,
        timer:1500
    })
}