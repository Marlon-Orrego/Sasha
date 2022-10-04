async function sendFeedback() {
	let ambiente = document.querySelector('input[name=rating__food]:checked').value;

	let relacion = document.querySelector('input[name=rating__q2]:checked').value;
	let experiencia = document.querySelector('input[name=rating__q3]:checked').value;
	
	ambiente=parseInt(ambiente,10);
	relacion=parseInt(relacion,10);
	experiencia=parseInt(experiencia,10);
	await firebase.auth().onAuthStateChanged((user)=>{
		let usuario=user.uid
		db.collection("calificacion").doc().set({
			ambiente,
			relacion,
			experiencia,
			usuario
		})
	})
	window.location.reload()
}
function checkValues(el) {
	if (!el) {
		return null;
	} else {
		return el.value; 
	}
}
function displayFeedback(msg) {
	const feedbackEl = document.createElement('pre');
	feedbackEl.insertAdjacentHTML('afterbegin', msg);
	document.querySelector('.feedback').append(feedbackEl);
}


