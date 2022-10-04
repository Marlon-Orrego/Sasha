const cargarArticulos = async () => {
    let Articulos = await getArticulos();
    let contenido = document.getElementById("container");
    Articulos.forEach(element => {
        let datos = element.data();
        contenido.innerHTML+=`
        <div id="proyecto${element.id}" class="proyectoMain">
        <center>
          <div class="imgProyecto">
            <img width=200 src=${datos.urlFoto} ><br>
          </div>
          ${datos.nombre}<br>
          ${datos.informacion}<br><br>
          <button class="borderBoton btn btn-warning">${datos.nombre}</button>
          <br><br>
        </center>
      </div>
        `
    });
}
cargarArticulos();