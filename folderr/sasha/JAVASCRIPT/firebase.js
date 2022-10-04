
const firebaseConfig = {
  apiKey: "AIzaSyCloGS9NeZdcPlX5CwxM51Khno8BqH1WZA",
  authDomain: "sashajupiter-8131f.firebaseapp.com",
  projectId: "sashajupiter-8131f",
  storageBucket: "sashajupiter-8131f.appspot.com",
  messagingSenderId: "484539604069",
  appId: "1:484539604069:web:a5392e09ef6bb13d5aba8c",
  measurementId: "G-JXQBW03NMX"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const ref = firebase.storage().ref();
const observador=()=>{
  try{
    firebase.auth().onAuthStateChanged((user)=>{
      
      if(user==null && window.location.pathname!="/index.html"){
        window.location.href="index.html"
      }
      sideBarcontent(user);    
  })
  }catch{
    
  }
    
}
observador()
const currentUser=()=>{
  firebase.auth().onAuthStateChanged((user)=>{
      return user.uid   
  })
}
const CerrarSesion=()=>{
  firebase.auth().signOut().then(() => {
    window.location.href="index.html"
  }).catch((error) => {
    
  });
}
const getUsuario =(id)=>db.collection("usuarios").doc(id).get();
const getUsuarios =()=>db.collection("usuarios").get();
const getPermisos=(id)=>db.collection("tipoDeUsuario").doc(id).get();
const getCategorias=()=>db.collection("categorias").get();
const getCategoria=(id)=>db.collection("categorias").doc(id).get();
const getEventos=()=>db.collection("eventos").get();
const getEvento=(id)=>db.collection("eventos").doc(id).get();
const getEspacios=()=>db.collection("espacios").get();
const getProyectos=()=>db.collection("proyectos").where("estado","==",true).get();
const getEncuestas=()=>db.collection("encuesta").get();
const getPreguntas=(numeroEncuesta)=>db.collection("encuesta").where("numeroEncuesta","==",numeroEncuesta).get();
const getArticulos=()=> db.collection("articulos").get();
const getProyecto=(id)=>db.collection("proyectos").doc(id).get();
const getEntidadesFalse=()=>db.collection("entidad").where("aprobacion","==",false).get();
const getEntidad=(id)=>db.collection("entidad").doc(id).get();
const getEntidadesTrue=()=>db.collection("entidad").where("aprobacion","==",true).get();
const getServicios=()=>db.collection("servicios").get();
const getEspacio=(id)=>db.collection("espacios").doc(id).get();
const getReserva=(id)=>db.collection("reservaEspacio").where("espacio","==",id).where("estado","==",false).get();
const getReservaAprobada=(id)=>db.collection("reservaEspacio").where("espacio","==",id).where("estado","==",true).get();
const getReservaTrue=(id)=>db.collection("reservaEspacio").doc(id).get();
const getAsistencia=(id)=>db.collection("asistenciaEvento").where("evento","==",id).get();
const getServicio=(id)=>db.collection("servicios").doc(id).get();
const getAvancesProyecto=()=>db.collection("evidenciaProyecto").where("estado","==",false).get();
const getAvance=(id)=>db.collection("evidenciaProyecto").doc(id).get();