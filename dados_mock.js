function Popular(){
	db.transaction(function (tx)
	{
		tx.executeSql('CREATE TABLE IF NOT EXISTS movimentacao (id integer PRIMARY KEY ASC, data TEXT, valor decimal(8,2), categoria bigint)', []);
		//tx.executeSql('INSERT INTO movimentacao (data, valor, categoria) VALUES (?, ?, ?)', ['data', 'valor','categoria']);
	});    
	
	db.transaction(function (tx)
	{
		tx.executeSql('SELECT * FROM movimentacao', [], function (tx, results)
		{
			var len = results.rows.length, i;          
			alert("Total: "+len);
		});
	}); 	
}
