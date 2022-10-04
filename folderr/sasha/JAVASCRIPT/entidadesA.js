const mostrarEntidadA = async () => {
    let contenido = document.getElementById("container");
    let entidades = await getEntidadesTrue();
    entidades.forEach(async element => {
      let datos = element.data();
      contenido.innerHTML += `
      
              <div id="entidad${element.id}" class="entidad">
              <center>
                ${datos.nombreEntidad}<br>
                ${datos.DescripcionEntidad}<br>
                ${datos.nombreEntidad}<br><br>
                <button id="${element.id}" onclick="TerminarConvenio(this)" class="borderBoton btn btn-warning">Terminar convenio</button>
                <br><br>
              </center>
            </div>
          `;
  
  
    });
  }
  mostrarEntidadA();
  const TerminarConvenio=async (objeto)=>{
    event.preventDefault();
    Swal.fire({
      position: 'top-end',
      title: 'Terminando convenio',
      showConfirmButton: false,
  
    })
    let id=objeto.id;
    let entidad=await getEntidad(id);
    entidad=entidad.data();
    let nombreEntidad=entidad.nombreEntidad;
    let DescripcionEntidad=entidad.DescripcionEntidad;
    let CiudadEntidad=entidad.CiudadEntidad;
    let aprobacion=false;
    db.collection("entidad").doc(id).set({
      nombreEntidad, DescripcionEntidad, CiudadEntidad, aprobacion
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Convenio terminado',
      showConfirmButton: false,
      timer: 1500
    })
  }