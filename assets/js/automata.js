
var output = document.querySelector("#time");
var milisegundos;
var aceptacion = true;

const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

function obtenerSimbolos(){
	var cell = document.getElementById("cambiandocolor");
	if ( cell.hasChildNodes() ){
		while ( cell.childNodes.length >= 1 ){
			cell.removeChild( cell.firstChild );
		}
	}

	document.getElementById("validar").disabled = true;
	iniciarColorGrafo();
	let simbolos=[];
	var slider = document.querySelector("#myRange");
	milisegundos = slider.value*5;
	output.innerHTML = milisegundos/1000;
	let inputText = "#"+document.querySelector("#palabra").value+"#";
	for (var i = 0; i < inputText.length; i++)
		simbolos[i]=inputText[i];
	reemplazarLetras(simbolos);
}

async function reemplazarLetras(simbolos){
	let x;
	let idNodo=1;
	let idArista;
	crearDivs(simbolos);

	for (var i = 1; i < simbolos.length; i++) {
		x=document.getElementById(i);
		x.className="rojo enlinea"
		if(x.textContent=="b"){
			idArista=2;
			x.textContent="a";
		}
		else if(x.textContent==" "){
			idArista=3;
			x.textContent=" ";
		}
		else if(x.textContent=="a"){
			idArista=1;
			x.textContent="a";
		}
		else if(x.textContent=="#"){
			idNodo=2;
			idArista=4;
			x.textContent="#";
			x.className="negro enlinea";
			cambiarColorGrafo(idNodo,idArista);
			irAlEstadoDeAceptacion(simbolos);
			break;
		}else{
			aceptacion=false;
			validarAceptacion(aceptacion);
			break;
		}

		cambiarColorGrafo(idNodo,idArista);
		await sleep(milisegundos);
		x.className="negro enlinea";
		resetColorGrafo(idNodo,idArista);
	}
}

function crearDivs(simbolos){
	let x;
	for (var i = 0; i < simbolos.length; i++) {
		x=document.createElement("div");
		x.id=i;
		x.className="negro enlinea";
		x.textContent=simbolos[i];
		document.querySelector("#cambiandocolor").appendChild(x);
	}
}

async function irAlEstadoDeAceptacion(simbolos){
	let y;
	let idNodo=2;
	let idArista;
	for (var i = simbolos.length-2; i >= 0; i--) {
		y=document.getElementById(i);
		y.className="rojo enlinea";
		if (y.textContent=="a"){
			idArista=5;
			cambiarColorGrafo(idNodo,idArista);
		}else if(y.textContent==" "){
			idArista=6;
			cambiarColorGrafo(idNodo,idArista);
		}else if(y.textContent=="#"){
			idNodo=3;
			idArista=7;
			cambiarColorGrafo(idNodo,idArista);
			y.textContent="#";
			y.className="negro enlinea";
			i++;
			y=document.getElementById(i);
			y.className="rojo enlinea";
			break;
		}

		await sleep(milisegundos);	
		y.className="negro enlinea";
		resetColorGrafo(idNodo,idArista);
	}	
	validarAceptacion(aceptacion);
}

function validarAceptacion(aceptada){
	if(aceptada){
		modal.style.display = "block";
		document.querySelector("#parrafoValidacion").innerText = "Palabra Aceptada";
	}else{
		modal.style.display = "block";
		document.querySelector("#parrafoValidacion").innerText = "Palabra no válida";
	}
	document.getElementById("validar").disabled = false;
}

function googleTranslateElementInit(){
	new google.translate.TranslateElement({pageLanguage: 'es',
		layout: google.translate.TranslateElement.InlineLayout.SIMPLE},
		'google_translate_element');
}

function cambiarColorGrafo(idNodo, idArista){

	nodos.update({
		id: idNodo,
		color:{background: "#F38080"},
		shadow: true
	})

	aristas.update({
		id: idArista,
		shadow: true,
		color:{color: "#F73E3E"}

	})
}

function iniciarColorGrafo(){
	for (var i = 1; i <= 7; i++) {
		if(i<4)
			resetColorGrafo(i,i);
		else
			resetColorGrafo(1,i);
	}
}

function resetColorGrafo(idNodo,idArista){

	nodos.update({
		id: idNodo,
		color:{background: "#D8D3DA"},
		shadow: true
	})

	aristas.update({
		id: idArista,
		shadow: true,
		color:{color: "#A8A1A9"}

	})

}