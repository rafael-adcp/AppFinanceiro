 $(function () {
  $('.js-popover').popover()
  $('.js-tooltip').tooltip()  
  $('[data-toggle="tooltip"]').tooltip()
})


function ocultar(){
	document.getElementById('home').style.display = 'none';
	document.getElementById('add').style.display = 'none';
	document.getElementById('extrato').style.display = 'none';
	document.getElementById('graficos').style.display = 'none';
	document.getElementById('resumo').style.display = 'none';
	
	
	
}
function mostrar(el){
	ocultar();
	document.getElementById(el).style.display = 'block';
}

function RetornaIndexSelect(select,el){
	var select = document.getElementById(select);
	for (var i = 0; i < select.length; i++) {
		if(select.options[i].value == el){
			//alert("Valor: "+select.options[i].value+"   -  Texto: "+select.options[i].text);
			return i;
		}
	}		
}

function RetornaTextSelect(el){
	var select = document.getElementById("mySelect");
	for (var i = 0; i < select.length; i++) {
		if(select.options[i].value == el){
			//alert("Valor: "+select.options[i].value+"   -  Texto: "+select.options[i].text);
			return select.options[i].text;
		}
	}		
}
function RetornaValueSelect (){
	var x = document.getElementById("mySelect").selectedIndex;
	var y = document.getElementById("mySelect").options;
	return (y[x].value);
}
var select =
'<select id = "mySelect" class="form-control">'+
	'<option value = "-1"> -- Select the value -- </option>'+
	'<optGroup label = "Entradas">'+
		'<option value = "1">Salário</option>'+
		'<option value = "2">13º</option>'+
		'<option value = "3">PLR</option>'+
		'<option value = "4">Reembolso</option>'+
	'</optGroup>'+
	
	'<optGroup label = "Saídas">'+
		'<option value = "400">Água</option>'+
		'<option value = "401">Luz</option>'+
		'<option value = "402">Gás</option>'+
		'<option value = "403">aluguel</option>'+
		'<option value = "404">celular</option>'+
		'<option value = "405">compras</option>'+
		'<option value = "406">condominio</option>'+
		'<option value = "407">entretenimento</option>'+
		'<option value = "408">estacionamento</option>'+
		'<option value = "409">fatura cartão de crédito</option>'+
		'<option value = "410">faxineira</option>'+
		'<option value = "411">gasolina</option>'+
		'<option value = "412">Internet + tv</option>'+
		'<option value = "413">livros</option>'+
		'<option value = "414">mercado</option>'+
		'<option value = "415">outros</option>'+
		'<option value = "416">presente</option>'+
		'<option value = "417">transporte público</option>'+
		'<option value = "418">benefícios - taxa</option>'+
		'<option value = "419">comida</option>'+
		'<option value = "420">farmacia</option>'+
		'<option value = "421">lavanderia</option>'+
		'<option value = "422">Roupa</option>'+
		'<option value = "423">Saque</option>'+
		'<option value = "424">Seguro</option>'+
		'<option value = "425">Transporte Público</option>'+
		'<option value = "426">Casa</option>'+

		
		
	'</optGroup>'+
	
	'<optGroup label = "Investimentos">'+
		'<option value = "800">Compromissada DI</option>'+
		'<option value = "801">Resgate Poupança</option>'+
		'<option value = "802">PIC</option>'+
		'<option value = "803">Compromissada DI Plus</option>'+
			'<option value = "804">Poupança</option>'+
	'</optGroup>'+
'</select>';

function mostrarSelect(onde){
	document.querySelector(onde).innerHTML = select;
}

function marcarSelect(select,el){
		document.getElementById(select).selectedIndex = RetornaIndexSelect(select,el);
}

function corLinha(id){
	var cor;
	if(id >= 1 && id <= 200){cor = "rgb(92,184,92)";}
	else if(id >= 400 && id <= 600){cor = "rgb(217,83,79)";}
	else if(id >= 800 && id <= 1000){cor = "rgb(51,122,183)";}
	return cor;
}