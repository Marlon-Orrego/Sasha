const consultarServicios = async () => {
    let contenido = document.getElementById("container");
    let servicios = await getServicios();
    servicios.forEach(async element => {
        let datos = element.data();
        let categoria = await getCategoria(datos.categoria)
        categoria = categoria.data();
        contenido.innerHTML += `
              <div id="proyecto${element.id}" class="proyectoMain">
                <center>
                  <div class="imgProyecto">
                    <img width=200 src=${datos.urlFoto} ><br>
                  </div>
                  ${categoria.nombre}<br>
                  ${datos.descripcion.substr(0,125)}<br><br>
                  <button id="${element.id}" onclick="servicio(this)" id="${element.id}" class="borderBoton btn btn-warning">${datos.nombre}</button>
                  <br><br>
                </center>
              </div>
            `;

    });
}
consultarServicios();

const servicio=async(objeto)=>{
  let id=objeto.id;
  let servicio=await getServicio(id);
  servicio=servicio.data();
  let categoria = await getCategoria(servicio.categoria)
  categoria=categoria.data()
  let contenido=document.getElementById("contenido");
  contenido.innerHTML=`
    <div class="servicio">
    <center><img src="${servicio.urlFoto}" width="300">
      <h2>${servicio.nombre}</h2></center>
      <p>Categoría: ${categoria.nombre}</p>
      <p>${servicio.descripcion}</p>
    </div>
  `
}