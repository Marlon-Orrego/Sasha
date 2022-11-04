
const entidades=async()=>{
  let entidad = await getEntidadesFalse();
  let contenido=document.getElementById("contenido");
  
  contenido.innerHTML
  =`
  <center><h2>Entidades pendientes de aprobación </h2></center>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Nombre Entidad</th>
          <th scope="col">Descripción de la Entidad</th>
          <th scope="col">Aprobar</th>
          <th scope="col">No Aprobar</th>

        </tr>
    </thead>
    <tbody id="table1">
    </tbody>
    </table>
  `;
  let table1=document.getElementById("table1");
  entidad.forEach(element=>{
    let datos=element.data();
    table1.innerHTML+=`
    <tr>
      <td>${datos.nombreEntidad}</td>
      <td>${datos.DescripcionEntidad}</td>
      <td><button id="${element.id}" type="button" onclick="AprobarEntidad(this)" class="borderBoton btn btn-success">Aprobar Entidad</td>
      <td><button type="button" onclick="TerminarConvenio(this)" class="borderBoton btn btn-danger">No Aprobar Entidad</td>

    </tr>
  `
  })
}
entidades();

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
  entidades();

}

const AprobarEntidad = async(objeto) => {
  event.preventDefault();
  Swal.fire({
    position: 'top-end',
    title: 'Aprobando entidad',
    showConfirmButton: false,

  })
  let id=objeto.id;

  let entidad=await getEntidad(id);
  entidad=entidad.data();
  let nombreEntidad=entidad.nombreEntidad;
  let DescripcionEntidad=entidad.DescripcionEntidad;
  let CiudadEntidad=entidad.CiudadEntidad;
  let aprobacion=true;
  db.collection("entidad").doc(id).set({
    nombreEntidad, DescripcionEntidad, CiudadEntidad, aprobacion
  })
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Entidad aprobada',
    showConfirmButton: false,
    timer: 1500
  })

  entidades();

}