const cargarCategoria=async ()=>{
    let categorias=await getCategorias();
    let select=document.getElementById("Categoria")
    categorias.forEach(element => {
        let datos=element.data();
        let opcion=document.createElement("option")
        opcion.value=element.id;
        opcion.text=datos.nombre;
        select.appendChild(opcion)
    });
}
cargarCategoria();