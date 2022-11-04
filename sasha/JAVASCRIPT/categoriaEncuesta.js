const cargarCategoria=async ()=>{
    let categorias=await getCategorias();
    let select1=document.getElementById("Categoria1")
    let select2=document.getElementById("Categoria2")
    categorias.forEach(element => {
        let datos=element.data();
        let opcion=document.createElement("option")
        opcion.value=element.id;
        opcion.text=datos.nombre;
        
        select2.appendChild(opcion)
    });
    categorias.forEach(element => {
        let datos=element.data();
        let opcion=document.createElement("option")
        opcion.value=element.id;
        opcion.text=datos.nombre;
        select1.appendChild(opcion)
        
    });
}
cargarCategoria();