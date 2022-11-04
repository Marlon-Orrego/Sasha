
const iniciarS = () => {
  event.preventDefault();
  let contraseña = document.getElementById("contraseña").value;
  let correo = document.getElementById("correo").value;

  firebase.auth().signInWithEmailAndPassword(correo, contraseña)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = "main.html"
      // ...
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Contraseña o correo inválido!',

      })
    });
}
const registrarS = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: 'Registrando usuario',
    showConfirmButton: false,
    
  })
  let contraseña = document.getElementById("contraseña").value;
  let email = document.getElementById("correo").value;
  let contraseña2 = document.getElementById("contraseña2").value;
  let tipoUsuario = "r6XsDyKp46NYQCS5zOpX"
  let apellido = document.getElementById("apellido").value;
  let nombre = document.getElementById("nombre").value;
  if (contraseña == contraseña2) {
    if (apellido != undefined && nombre != undefined && apellido != "" && nombre != "") {


      firebase.auth().createUserWithEmailAndPassword(email, contraseña)
        .then(async(userCredential) => {
          // Signed in
          var user = userCredential.user;

          await db.collection("usuarios").doc(user.uid).set({
            email,
            apellido,
            nombre,
            tipoUsuario
          })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario registrado',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.href = "main.html"
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos!',
  
      })
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'las contraseñas no coninciden!',

    })
  }

}


