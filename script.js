function getHistorial(){
	return document.getElementById("historial-valor").innerText;
}
function printHistorial(num){
	document.getElementById("historial-valor").innerText=num;
}
function getSalida(){
	return document.getElementById("salida-valor").innerText;
}
function printSalida(num){
	if(num==""){
		document.getElementById("salida-valor").innerText=num;
	}
	else{
		document.getElementById("salida-valor").innerText=getFormatoNumero(num);
	}	
}
function getFormatoNumero(num){
	if(num=="-"){ 
		return "";
	}
	var n = Number(num);
	var valor = n.toLocaleString("en");
	return valor;
}
function reverseNumbero(num){
	return Number(num.replace(/,/g,''));
}
var operador = document.getElementsByClassName("operador");
for(var i =0;i<operador.length;i++){
	operador[i].addEventListener('click',function(){
		if(this.id=="borrar"){
			printHistorial("");
			printSalida("");
		}
		
		else{
			var salida=getSalida();
			var historial=getHistorial();

			if(salida!="" || historial!=""){
				salida= salida==""?salida:reverseNumbero(salida);
				historial=historial+salida;
				if(this.id=="="){
					var resultado=eval(historial);
					printSalida(resultado);
					printHistorial("");
				}
				else{
					historial=historial+this.id;
					printHistorial(historial);
					printSalida("");
				}
			}
		}
		
	});
}
var numero = document.getElementsByClassName("numero");
for(var i =0;i<numero.length;i++){
	numero[i].addEventListener('click',function(){
		var salida=reverseNumbero(getSalida());
		if(salida!=NaN){ //si imprime un numero, morrrr
			salida=salida+this.id;
			printSalida(salida);
		}
	});
}
var microfono = document.getElementById('microfono');
microfono.onclick=function(){
	microfono.classList.add("grabar");
	var reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	reconocimiento.lang = 'es-CO';
	reconocimiento.start();
	operaciones =
				 {"mas":"+",
				"más":"+",
				 "menos":"-",
				 "por":"*",
				 "multiplicado":"*",
				 "entre":"/",
				 "sobre":"/",
				 "mod":"%",
				 "chao":"»"
				}
	
	reconocimiento.onresult = function(event){
		var salida = event.results[0][0].transcript;
		for(propiedad in operaciones){
			salida= salida.replace(propiedad, operaciones[propiedad]);
		}
		document.getElementById("salida-valor").innerText = salida;
		setTimeout(function(){
			evaluar(salida);
		},4000);
		microfono.classList.remove("grabar");
	}
	
}
function evaluar(salida){
	try{
		var resultado = eval(salida);
		document.getElementById("salida-valor").innerText = resultado;
	}
	catch(e){
		console.log(e);
		document.getElementById("salida-valor").innerText = "";
	}
}