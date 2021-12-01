
var output = document.querySelector("#time");
var milisegundos;
var aceptacion = true;

const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

function obtenerSimbolos(){
	var cell = document.getElementById("cambiandocolor");
	if ( cell.hasChildNodes() )
	{
	while ( cell.childNodes.length >= 1 )
	{
	cell.removeChild( cell.firstChild );
	}
	}
	document.getElementById("validar").disabled = true;

	let simbolos=[];
	var slider = document.querySelector("#myRange");
	milisegundos = slider.value*5;
	output.innerHTML = milisegundos/1000;
	let inputText = document.querySelector("#palabra").value;
	for (var i = 0; i < inputText.length; i++)
		simbolos[i]=inputText[i];
	//document.querySelector("#inputCinta").value = simbolos;
	reemplazarLetras(simbolos);
}

async function reemplazarLetras(simbolos){
	for (var i = 0; i < simbolos.length; i++) {
		let x=document.createElement("div");
		x.id=i;
		x.className="negro enlinea"
		x.textContent=simbolos[i];
		document.querySelector("#cambiandocolor").appendChild(x);
	}
	for (var i = 0; i < simbolos.length; i++) {
		let x=document.getElementById(i);
		x.className="rojo enlinea"
		await sleep(milisegundos);
		if(x.textContent=="b")
			x.textContent="a";
		else if(x.textContent==" ")
			x.textContent=" ";
		else if(x.textContent=="a")
			x.textContent="a";
		else{
			aceptacion=false;
			break;
		}
		x.className="negro enlinea"
	}
	irAlEstadoDeAceptacion(simbolos);
/* 	for (var i = 0; i < simbolos.length; i++) {
		await sleep(milisegundos);
		if(simbolos[i]=="b")
			simbolos[i]="a";
		else if(simbolos[i]==" ")
			simbolos[i]=" ";
		else if(simbolos[i]=="a")
			simbolos[i]="a";
		else{
			aceptacion=false;
			break;
		}
		
		document.querySelector("#inputCinta").value = simbolos;
	}
	irAlEstadoDeAceptacion(simbolos); */
}

async function irAlEstadoDeAceptacion(simbolos){
	for (var i = simbolos.length-1; i >= 0; i--) {
		let y=document.getElementById(i);
		y.className="rojo enlinea";
		await sleep(milisegundos);		
		if(y.textContent=="a" || y.textContent==" "){
			//
		}else{
			aceptacion=false;
			break;
		}
		if(i>0){
		y.className="negro enlinea";
		}
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