const cargarUsuarios=async()=>{
    let tabla=document.getElementById("lista");
    let usuarios=await getUsuarios();
    usuarios.forEach(async element => {
        let datos=element.data();
        let tipoDeUsuario=await getPermisos(datos.tipoUsuario);
        tipoDeUsuario=tipoDeUsuario.data();
        tabla.innerHTML+=`
            <td>${datos.nombre}</td>
            <td>${datos.apellido}</td>
            <td>${datos.email}</td>
            <td>${tipoDeUsuario.nombre}</td>`;
    });
}
cargarUsuarios();