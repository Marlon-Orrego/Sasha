const redirect = () => {

    try {
        firebase.auth().onAuthStateChanged((user) => {
            if(user!=null){
                window.location.href="main.html"
            }
            
        })
    } catch {
        console.log("ventana de inicio")
    }


}
redirect();