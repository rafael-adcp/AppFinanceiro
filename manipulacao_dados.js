var db, dbSize;
dbSize = 5 *1024 *1024 ; // 5MB, o limite das implementações atuais
db = openDatabase('app', '1.0', 'app', dbSize );

function SelectAll(){
	mostrarSelect('#select');
	db.transaction(function (tx)
    {
        tx.executeSql('SELECT * FROM movimentacao order by data DESC', [], function (tx, results)
        {
			document.getElementById('tabela_extrato').value = "";
			var msg = "";
			msg += '<table class="table table-striped">'+
						'<thead>'+
							'<tr>'+
								//'<th>#</th>'+
								'<th>Data</th>'+
								'<th>Valor</th>'+
								'<th>Descrição</th>'+
								'<th>id</th>'+
							'</tr>'+
						'</thead><tbody>';
			
            var len = results.rows.length, i;          
			var cor;
			var data;
			var dia;
			var mes;
			var ano;
            for (i = 0; i < len; i++){
				cor = corLinha(results.rows.item(i).categoria);
				msg +='<tr style = "color:'+cor+'">';
				data = results.rows.item(i).data;
				
				dia = data.substring(8,10);
				mes = data.substring(5,7);
				ano = data.substring(0,4);
				
				
				
		
				
				msg +='<td>'+ dia+'-'+mes+'-'+ano + '</td>';
				msg +='<td>' + results.rows.item(i).valor+ '</td>';
				msg +='<td>' + RetornaTextSelect(results.rows.item(i).categoria) + '</td>';
			//	msg +='<td>'+ results.rows.item(i)['id']+'<td>';
				//var x = results.rows.item(i)['id'];
				var x = results.rows.item(i).id;
				
				
				msg +='<td><a onClick="preencherEditar('+x+')" href="#Editar" data-toggle ="modal" data-target="#Editar"><span style="color:black;"class ="glyphicon glyphicon-pencil"></span></a></td>';
				msg +='</tr>';
			}
			msg += '</tbody></table></div>';
            document.getElementById('tabela_extrato').innerHTML= msg;
		});
    }); 
}
function preencherEditar(id){
		document.getElementById('idMovimentacaoSendoEditada').value = id;
		mostrarSelect('#selectEditar');
		
    db.transaction(function (tx)
    {
        tx.executeSql('SELECT * FROM movimentacao where id ='+document.getElementById('idMovimentacaoSendoEditada').value, [], function (tx, results)
        {
				 //  msg +='<option value = "'+results.rows.item(i).categoria+'">';	
				   
				   document.getElementById('valorEditar').value = results.rows.item(0).valor;
				   document.getElementById('dataEditar').value = results.rows.item(0).data;
				  // marcarSelect(results.rows.item(0).categoria);
				//  marcarSelect(6);
				marcarSelect('mySelect',results.rows.item(0).categoria);
				   
				   
				});
    }); 
}

function Update(){
	if(document.getElementById('dataEditar').value != "" && document.getElementById('valorEditar').value != "" && RetornaValueSelect()!= "-1"){
		db.transaction(function (tx)
		{
			var valor_original = document.getElementById('valorEditar').value;
			var valor2 = valor_original.replace(",",".");
		//	var query = 'update movimentacao set data = "'+document.getElementById('data').value+'", valor = '+valor2+', categoria = "'+RetornaValueSelect()+'" where id ='+document.getElementById('idMovimentacaoSendoEditada').value;
		//	alert(query);
			tx.executeSql('update movimentacao set data = ?, valor = ?, categoria = ? where id = ?',[document.getElementById('dataEditar').value, valor2, RetornaValueSelect(),document.getElementById('idMovimentacaoSendoEditada').value]);		
				alert("Movimentação alterada com sucesso");
		  	location.reload();
		});    
		
		}
	
	else{
		alert("Preencha os campos obrigatórios");
	}
}

function Delete(){
    db.transaction(function (tx)
    {
        if(confirm("Essa movimentação será deletada, deseja realmente fazer isso?")==true){
			tx.executeSql('delete from movimentacao where id = '+document.getElementById('idMovimentacaoSendoEditada').value);
			alert("Movimentação deletada");
			location.reload();
		}
    });    
}


function DropTable(){
    db.transaction(function (tx)
    {
        if(confirm("Todos os dados serão deletados, deseja realmente fazer isso?")==true){
			tx.executeSql('DROP TABLE IF EXISTS movimentacao');
			alert("Tudo foi deletado");
			location.reload();
		}
    });    
}

function Inserir(){
	if(document.getElementById('data').value != "" && document.getElementById('valor').value != "" && RetornaValueSelect()!= "-1"){
		db.transaction(function (tx)
		{
			var valor_original = document.getElementById('valor').value;
			var valor2 = valor_original.replace(",",".");
			tx.executeSql('CREATE TABLE IF NOT EXISTS movimentacao (id integer PRIMARY KEY ASC, data TEXT, valor decimal(8,2), categoria bigint)', []);
			tx.executeSql('INSERT INTO movimentacao (data, valor, categoria) VALUES (?, ?, ?)', [
				document.getElementById('data').value, valor2,RetornaValueSelect()
			]);
				alert("Movimentação cadastrada com sucesso");
			location.reload();
		});    
		
		}
	
	else{
		alert("Preencha os campos obrigatórios");
	}
}

function tabelaHome(inicio,fim){
	mostrarSelect('#select');
	
	
 
    
    calculaPeriodo(1  ,200 ,inicio,fim,'entrada'); 
    calculaPeriodo(400,600 ,inicio,fim,'saida'); 
    calculaPeriodo(800,1000,inicio,fim,'investimento'); 
    
    
    
    
    
    
	
	db.transaction(function (tx)
    {
		tx.executeSql('select sum(valor) as valor, categoria from movimentacao  where data between "'+inicio+'"and "'+fim+'"group by categoria order by valor DESC', [], function (tx, results)
        {
			document.getElementById('tabela_home').value = "";
			msg ="";
			msg += '<table class="table table-striped">'+
						'<thead>'+
							'<tr>'+
								'<th>Categoria</th>'+
								'<th>Valor</th>'+
								
							'</tr>'+
						'</thead><tbody>';
			
            var len = results.rows.length, i;          
			var cor;
            for (i = 0; i < len; i++){
				cor = corLinha(results.rows.item(i).categoria);
				msg +='<tr style = "color:'+cor+';">';
				msg +='<td>' + RetornaTextSelect(results.rows.item(i).categoria) + '</td>';
				msg +='<td>' + results.rows.item(i).valor.toFixed(2) + '</td>';
				msg +='</tr>';
			}
			msg += '</tbody></table>';
            document.getElementById('tabela_home').innerHTML= msg;
		});
    }); 
}

function atualizaTabelaHome(){
	tabelaHome(document.getElementById('inicio').value,document.getElementById('fim').value);
}

  function calculaPeriodo(catini,catfim,datini,datfim,divnome){
    
     var query = 'select total(valor) as total from movimentacao where categoria between "'+catini+'" and "'+catfim+'" and data between "'+datini +'" and "'+datfim+'"';	
	
	db.transaction(function (tx)
    {
		tx.executeSql(query, [], function (tx, results)
        {
				
            var len = results.rows.length, i;          
	
            for (i = 0; i < len; i++){
            //alert(    document.getElementById(divnome).innerHTML = results.rows.item(i).total);
    		      document.getElementById(divnome).innerHTML = results.rows.item(i).total.toFixed(2);
    		         
    		           document.getElementById(divnome).style.color = corLinha(catini);
						}
			
       
		});
    }); 

}



function select_grafico(){
	mostrarSelect('#select');
	db.transaction(function (tx)
    {
        tx.executeSql('SELECT distinct categoria FROM movimentacao order by categoria ASC', [], function (tx, results)
        {
			document.getElementById('select_grafico').value = "";
			var msg = "";
			msg += '<select id = "categoriaEscolhida" class="form-control" onchange = "atualizaGrafico()">'
			msg += '<option value = "-1"> -- Select the value -- </option>';
						
			
            var len = results.rows.length, i;          
			for (i = 0; i < len; i++){
				msg +='<option value = "'+results.rows.item(i).categoria+'">' + RetornaTextSelect(results.rows.item(i).categoria) + '</option>';
			}
			msg += '</select>';
            document.getElementById('select_grafico').innerHTML= msg;
		});
    }); 
}
function atualizaGrafico(){
	
	var dataPoints = [{x:new Date(2015,0), y:0 }];
	var chart = new CanvasJS.Chart("chartContainer",
    {
		title:{
        text: RetornaTextSelect(document.getElementById('categoriaEscolhida').value),
      },
		
		
      theme: "theme2",
      animationEnabled: true,
      axisX: {
		valueFormatString: "MM/YYYY",
		title: "Mês/Ano",
		interval: 3,
        intervalType: "month"
	},
      axisY:{
		  title: "Valor",
      },
	  
      data: [
      {        
        type: "line",
        lineThickness: 3,        
        dataPoints: dataPoints
	  }]
    });

	chart.render();
	
	db.transaction(function (tx)
    {
	var menor;
	var maior = 0;
	var média = 0;
	var total = 0;
	var qtde = 0;
        tx.executeSql("select max(id) as id_max,sum(valor)as valor, substr(data,6,2)||'/'||substr(data,1,4)as data  from movimentacao "+
		"where categoria = "+document.getElementById('categoriaEscolhida').value+
		" group by substr(data,1,4)||'/'||substr(data,6,2)"+
		"order by substr(data,1,4)||'/'||substr(data,6,2) ASC"
		
		, [], function (tx, results)
        {
			var gambiarra = dataPoints.pop();//só pra remover o valor que uso pra criar o gráfico
			var len = results.rows.length, i;         
			
			document.getElementById('tabela_grafico').value = "";
			var msg = "";
				
				
				msg += '<table class="table table-striped">'+
						'<thead>'+
							'<tr>'+
								'<th>Mês/Ano</th>'+
								'<th>Valor</th>'+
								
							'</tr>'+
						'</thead><tbody>';
			
			for (i = 0; i < len; i++){
				if(i==0){menor = results.rows.item(i).valor;}
				qtde = qtde+ 1;;
				total = total + results.rows.item(i).valor;
				if(results.rows.item(i).valor < menor){
					menor = results.rows.item(i).valor;
				}
				
				if(results.rows.item(i).valor > maior){
					maior = results.rows.item(i).valor; 
				}
				//alert('Valor: '+results.rows.item(i).valor+ "     ----- Data: "+results.rows.item(i).data);
				var str = results.rows.item(i).data;
				var ano = str.substring(3, 7);
				var mes = str.substring(0, 2)-1;
				
           
				//tabela contendo os dados do grafico
				msg +='<tr>';
				msg +='<td>' + (1+mes) +'/'+ano + '</td>';
				msg +='<td>' + results.rows.item(i).valor.toFixed(2) + '</td>';
				msg +='</tr>';
			
			
				
				//colocando os pontos no grafico
				
				dataPoints.push({
			
					
					x: new Date(ano,mes),
					y: results.rows.item(i).valor
				});
				chart.render();
			}
			msg += '</tbody></table></div>';
            document.getElementById('tabela_grafico').innerHTML= msg;
			
			document.getElementById('menor').innerHTML = menor.toFixed(2);
			document.getElementById('media').innerHTML = (total / qtde).toFixed(2);
			document.getElementById('maior').innerHTML = maior.toFixed(2);
		});
    }); 
	
	chart.render();
}

function resumo(){
	
	var dataPointsEntrada = [{x:new Date(2015,0), y:0 }];
	var dataPointsSaida = [{x:new Date(2015,0), y:0 }];
	var dataPointsInvestimento = [{x:new Date(2015,0), y:0 }];	
	var dataPoints = [{x:new Date(2015,0), y:0 }];
	var chart = new CanvasJS.Chart("graficoResumo",
    {
		title:{
        text: "Resumo",
      },
		
		 toolTip: {
        shared: "true"
      },
      theme: "theme2",
      animationEnabled: true,
      axisX: {
		valueFormatString: "MM/YYYY",
		title: "Mês/Ano",
		interval: 3,
        intervalType: "month"
	},
      axisY:{
		  title: "Valor",
      },
	  
      data: [
      {        showInLegend: true,
		name: "Entrada",	
        type: "line",
        lineThickness: 3,        
        dataPoints: dataPointsEntrada
	  },
	  
	  {       showInLegend: true, 
		name: "Saida",	
        type: "line",
        lineThickness: 3,        
        dataPoints: dataPointsSaida
	  },
	  {    showInLegend: true,    
		name: "Investimento",	
        type: "line",
        lineThickness: 3,        
        dataPoints: dataPointsInvestimento
	  }
	  
	  
	  ]
    });

	chart.render();
	
	db.transaction(function (tx)
    {
		
	var menor;
	var maior = 0;
	var média = 0;
	var total = 0;
	var qtde = 0;
        tx.executeSql("select max(id) as id_max,sum(valor)as valor, substr(data,6,2)||'/'||substr(data,1,4)as data  from movimentacao "+
		"where categoria between 1 and 200 group by substr(data,1,4)||'/'||substr(data,6,2)"+
		"order by substr(data,1,4)||'/'||substr(data,6,2) ASC"
		
		, [], function (tx, results)
        {
			var gambiarra = dataPointsEntrada.pop();//só pra remover o valor que uso pra criar o gráfico
			var len = results.rows.length, i;         
			
			document.getElementById('tabela_entrada').value = "";
			var msg = "";
				
				
				msg += '<table class="table table-striped">'+
						'<thead>'+
						
							'<tr>'+
								'<th>Mês/Ano</th>'+
								'<th>Valor</th>'+
								
							'</tr>'+
						'</thead><tbody>';
			
			for (i = 0; i < len; i++){
				if(i==0){menor = results.rows.item(i).valor;}
				qtde = qtde+ 1;;
				total = total + results.rows.item(i).valor;
				if(results.rows.item(i).valor < menor){
					menor = results.rows.item(i).valor;
				}
				
				if(results.rows.item(i).valor > maior){
					maior = results.rows.item(i).valor; 
				}
				//alert('Valor: '+results.rows.item(i).valor+ "     ----- Data: "+results.rows.item(i).data);
				var str = results.rows.item(i).data;
				var ano = str.substring(3, 7);
				var mes = str.substring(0, 2)-1;
				
				msg +='<tr>';
				msg +='<td>' + (1+mes) +'/'+ano + '</td>';
				msg +='<td>' + results.rows.item(i).valor.toFixed(2) + '</td>';
				msg +='</tr>';
				
				//colocando os pontos no grafico
				
				dataPointsEntrada.push({
			
					
					x: new Date(ano,mes),
					y: results.rows.item(i).valor
				});
				chart.render();
			}
			msg += '</tbody></table></div>';
            document.getElementById('tabela_entrada').innerHTML= msg;
			
			document.getElementById('menorEntrada').innerHTML = menor.toFixed(2);
			document.getElementById('mediaEntrada').innerHTML = (total / qtde).toFixed(2);
			document.getElementById('maiorEntrada').innerHTML = maior.toFixed(2);
		});
    }); 
	
	db.transaction(function (tx)
    {
		
	var menor;
	var maior = 0;
	var média = 0;
	var total = 0;
	var qtde = 0;
        tx.executeSql("select max(id) as id_max,sum(valor)as valor, substr(data,6,2)||'/'||substr(data,1,4)as data  from movimentacao "+
		"where categoria between 400 and 600 group by substr(data,1,4)||'/'||substr(data,6,2)"+
		"order by substr(data,1,4)||'/'||substr(data,6,2) ASC"
		
		, [], function (tx, results)
        {
			var gambiarra = dataPointsSaida.pop();//só pra remover o valor que uso pra criar o gráfico
			var len = results.rows.length, i;         
			
			document.getElementById('tabela_saida').value = "";
			var msg = "";
				
				
				msg += '<table class="table table-striped">'+
						'<thead>'+
							'<th>Mês/Ano</th>'+
								'<th>Valor</th>'+
								
							'</tr>'+
						'</thead><tbody>';
			
			for (i = 0; i < len; i++){
				if(i==0){menor = results.rows.item(i).valor;}
				qtde = qtde+ 1;;
				total = total + results.rows.item(i).valor;
				if(results.rows.item(i).valor < menor){
					menor = results.rows.item(i).valor;
				}
				
				if(results.rows.item(i).valor > maior){
					maior = results.rows.item(i).valor; 
				}
				//alert('Valor: '+results.rows.item(i).valor+ "     ----- Data: "+results.rows.item(i).data);
				var str = results.rows.item(i).data;
				var ano = str.substring(3, 7);
				var mes = str.substring(0, 2)-1;
				
				msg +='<tr>';
				msg +='<td>' + (1+mes) +'/'+ano + '</td>';
				msg +='<td>' + results.rows.item(i).valor.toFixed(2) + '</td>';
				msg +='</tr>';
				//colocando os pontos no grafico
				
				dataPointsSaida.push({
			
					
					x: new Date(ano,mes),
					y: results.rows.item(i).valor
				});
				chart.render();
			}
			msg += '</tbody></table></div>';
            document.getElementById('tabela_saida').innerHTML= msg;
			
			document.getElementById('menorSaida').innerHTML = menor.toFixed(2);
			document.getElementById('mediaSaida').innerHTML = (total / qtde).toFixed(2);
			document.getElementById('maiorSaida').innerHTML = maior.toFixed(2);
		});
    }); 
	
	db.transaction(function (tx)
    {
		
	var menor;
	var maior = 0;
	var média = 0;
	var total = 0;
	var qtde = 0;
        tx.executeSql("select max(id) as id_max,sum(valor)as valor, substr(data,6,2)||'/'||substr(data,1,4)as data  from movimentacao "+
		"where categoria between 800 and 1000 group by substr(data,1,4)||'/'||substr(data,6,2)"+
		"order by substr(data,1,4)||'/'||substr(data,6,2) ASC"
		
		, [], function (tx, results)
        {
			var gambiarra = dataPointsInvestimento.pop();//só pra remover o valor que uso pra criar o gráfico
			var len = results.rows.length, i;         
			
			document.getElementById('tabela_investimento').value = "";
			var msg = "";
				
				
				msg += '<table class="table table-striped">'+
						'<thead>'+
								'<th>Mês/Ano</th>'+
								'<th>Valor</th>'+
								
							'</tr>'+
						'</thead><tbody>';
			
			for (i = 0; i < len; i++){
				if(i==0){menor = results.rows.item(i).valor;}
				qtde = qtde+ 1;;
				total = total + results.rows.item(i).valor;
				if(results.rows.item(i).valor < menor){
					menor = results.rows.item(i).valor;
				}
				
				if(results.rows.item(i).valor > maior){
					maior = results.rows.item(i).valor; 
				}
				//alert('Valor: '+results.rows.item(i).valor+ "     ----- Data: "+results.rows.item(i).data);
				var str = results.rows.item(i).data;
				var ano = str.substring(3, 7);
				var mes = str.substring(0, 2)-1;
				
				msg +='<tr>';
				msg +='<td>' + (1+mes) +'/'+ano + '</td>';
				msg +='<td>' + results.rows.item(i).valor.toFixed(2) + '</td>';
				msg +='</tr>';

				//colocando os pontos no grafico
				
				dataPointsInvestimento.push({
			
					
					x: new Date(ano,mes),
					y: results.rows.item(i).valor
				});
				chart.render();
			}
			msg += '</tbody></table></div>';
            document.getElementById('tabela_investimento').innerHTML= msg;
			
			document.getElementById('menorInvestimento').innerHTML = menor.toFixed(2);
			document.getElementById('mediaInvestimento').innerHTML = (total / qtde).toFixed(2);
			document.getElementById('maiorInvestimento').innerHTML = maior.toFixed(2);
		});
    }); 
	
	chart.render();
}


