const mostrarEvidencias=async()=>{
    let tabla=document.getElementById("tabla");
    let avances=await getAvancesProyecto();
    avances.forEach(async element => {
        let datos=element.data();
        let proyecto=await getProyecto(datos.id);
        proyecto=proyecto.data();
        tabla.innerHTML=`
            <tr>
                <td>${proyecto.nombre}</td>
                <td>${datos.etapa}</td>
                <td>${datos.fecha}</td>
                <td><a href="${datos.urlPDF}" download="evidencia.pdf"><img width=30 src="IMG/documento.png"></a></td>
                <td><a id="${element.id}" onclick="actualizarAvance(this)"><img width=30 src="IMG/confirmar.png"></a></td>
            </tr>
        `;
    });
}
mostrarEvidencias();