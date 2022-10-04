const moestrarEncuestas=async ()=>{
    let encuestas=await getEncuestas();
    let NumeroEncuesta=[]
    encuestas.forEach(element => {
        let datos=element.data();
        let existe=NumeroEncuesta.find(numero=>numero==datos.numeroEncuesta);
        if(!existe){
            NumeroEncuesta.push(datos.numeroEncuesta)
        }
    });
    let contenido=document.getElementById("contenido");
    for(let encuesta of NumeroEncuesta){
        contenido.innerHTML+=`
            <div id="${encuesta}" class="form-group cursor encuestas" onclick="realizarEncuesta(this)"><h2>Realizar encuesta: ${encuesta}</h2></div>
        `
    }
}
moestrarEncuestas();
let arrayPreguntas=[];
const realizarEncuesta=async (element)=>{
    let contenido=document.getElementById("contenido");
    contenido.innerHTML=`<h1>Encuesta ${element.id}</h1>`;
    let encuestas=await getPreguntas(element.id);
    let cont=0;
    
    encuestas.forEach(doc=>{
        let datos=doc.data();
        arrayPreguntas.push(doc.id);
        contenido.innerHTML+=`
            <div id="${doc.id}" class="form-group encuestas">
                <h3>${datos.pregunta}</h3>
                <input type="radio" id="respuesta1/${cont}"
                name="pregunta1/${cont}" value="respuesta1/${cont}">
                <label for="respuesta1/${cont}">${datos.respuesta1}</label>
                <br><br>
                <input type="radio" id="respuesta2/${cont}"
                name="pregunta1/${cont}" value="respuesta2/${cont}">
                <label for="respuesta2/${cont}">${datos.respuesta2}</label>
            </div>
        `
        cont++
    })
    contenido.innerHTML+=`<center><button id="${cont}" onclick="diligenciar(this)" class="btn btn-success">Diligenciar encuesta</button></center>`
    
}

const diligenciar=(element)=>{
    Swal.fire({
        position: 'top-end',
        
        title: 'Guardando respuestas',
        showConfirmButton: false,
        
      })
    let cantidad=element.id;
    for(let i =0; i<cantidad;+i++){
        let respuesta1=document.getElementById(`respuesta1/${i}`).checked;
        let respuesta2=document.getElementById(`respuesta2/${i}`).checked;
        firebase.auth().onAuthStateChanged((user)=>{
            usuario=user.uid
            let pregunta=arrayPreguntas[i];
            db.collection("respuestas").doc(pregunta+usuario).set({
                respuesta1,
                respuesta2,
                usuario,
                pregunta
            })   
        })
        
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Respuestas guardadas',
        showConfirmButton: false,
        timer: 1500
      })

    
}
