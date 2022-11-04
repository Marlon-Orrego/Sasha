const vistaFormulario = async (objeto) => {
    let id = objeto.id
    let contenido = document.getElementById("contenido");
    let evento = await getEvento(id)
    evento = evento.data();
    contenido.innerHTML = `<center>
    <div class="col-md-6">
    <div class="card">
        <div class="card-body">
            <h3>Asistir al evento ${evento.nombre}</h3>
            <form>
                <div class="form-gruop">
                    <img width="70%" id="image" width="300">
                    <br>
                    <hr>
                </div>
                <div class="form-group" id="box">
                   
                    <input type="text" id="nombre" class="form-control"
                        placeholder="Nombre*" autofocus>
                </div>
                <div class="form-group" id="box">
                    
                    <input type="text" id="apellido" class="form-control"
                        placeholder="Apellido*">
                </div>
                <div class="form-group" id="box">
                    
                    <input type="text" id="cedula" class="form-control"
                        placeholder="Cédula*">
                </div>


                <hr>
                <div id="Sugerencias" class="form-gruop">

                </div>
                <button id="${id}" onclick="confirmarAsistencia(this)" class="btn btn-primary"
                    id="btn-task-form">
                    confirmar asistencia
                </button>

            </form>
        </div>
    </div>
</div>
</center>
    `
}
const vistaReserva = async(objeto) => {
    let id = objeto.id
    let contenido = document.getElementById("contenido");
    let evento = await getEspacio(id)
    evento = evento.data();
    contenido.innerHTML = `<center>
    <div class="col-md-6">
    <div class="card">
        <div class="card-body">
            <h3>Realizar reserva de ${evento.nombre}</h3>
            <form>
                <div class="form-gruop">
                    <img width="70%" id="image" width="300">
                    <br>
                    <hr>
                </div>
                <div class="form-group" id="box">
                    
                    <input type="text" id="nombre" class="form-control"
                        placeholder="Nombre*" autofocus>
                </div>
                <div class="form-group" id="box">
                    
                    <input type="text" id="apellido" class="form-control"
                        placeholder="Apellido*">
                </div>
                <div class="form-group" id="box">
                    
                    <input type="text" id="cedula" class="form-control"
                        placeholder="Cédula*">
                </div>
                <div class="form-group" id="box">
                    
                    <input type="date" id="fecha" class="form-control">
                </div>
                <div class="form-group" id="box">
                    
                    <select id="Hora" class="form-control">
                        <option value="">Seleccione la hora</option>                
                    </select>
                </div>
                <div class="form-group" id="box">
                    
                    <input type="number" id="cantidadHoras" class="form-control" placeholder="cantidad de horas*">
                </div>


                <hr>
                
                <button id="${id}" onclick="reservar(this)" class="btn btn-primary"
                    id="btn-task-form">
                    confirmar reserva
                </button>

            </form>
        </div>
    </div>
</div>
</center>
    `
    let select=document.getElementById("Hora");
    for (let i=8;i<=18;i++){
        let option=document.createElement("option");
        option.value=i
        option.text=i
        select.appendChild(option)
    }
}
