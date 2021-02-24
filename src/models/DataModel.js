const mysql = require("mysql");
const dotenv = require("dotenv");
const commonUtils = require("../utils/common.utils");

dotenv.config();
var conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
class DataModel {
  /**
   * Função para ir buscar á base de dados os dados de um monitor.
   * @param {Object} params
   * @param {*} callback retorna as rows/result
   * FALTA ELE RETORNAR A ULTIMA DATA OU SEJA OS DADOS MAIS RECENTES
   */
  findOne(params, callback) {
    const { columnSet, values } = commonUtils.multipleColumnSet(params);
    conn.connect(function (err) {
      let sql = mysql.format(`SELECT * FROM info WHERE ${columnSet}`, [
        ...values]);
      conn.query(sql, function (err, rows) {
        callback(err, rows);
      });
    });
  }

  /**
   * Função para criar uma monitor e retorna o numero de rows afetadas. 
   * @param {*} user_id 
   * @param {*} code 
   * @param {*} title 
   * @param {*} callback 
   */
  create(monitor_id, temperature, humidity, movement, callback) {
    conn.connect(function(err) {
      if (err) throw err;
      let sql = mysql.format("INSERT INTO monitors(monitor_id, temperature, humidity, movement) VALUES (?, ?, ?, ?)", 
      [monitor_id, temperature, humidity, movement]);

      conn.query(sql, function(err, rows) {
        callback(err, rows.affectedRows);
      });
    });

}

}
module.exports = new DataModel();