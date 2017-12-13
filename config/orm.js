const connection = require('./connection.js');


let orm = {
	selectAll: function (table, callback) {
		let query = 'SELECT * FROM ??';
		connection.query(query, [table], (err,result) => {
			if (err) throw err;
			callback(result);
		});
	},

	insertOne: function (table, col,value, callback) {
		let query = 'INSERT INTO ?? SET ?? = ?';
		let params = [table, col, value];
		connection.query(query, params, (err,result) => {
			if (err) throw err;
			callback(result);
		});

	},
	
	updateOne: function (table, setColumn, setValue, col, val, callback) {
		let query = 'UPDATE ?? SET ?? = ? WHERE ??=?';
		let params = [table, setColumn, setValue, col, val];
		connection.query(query, params, (err, result) =>{
			if (err) throw err;
			callback(result);
		});
	}
}

module.exports = orm;