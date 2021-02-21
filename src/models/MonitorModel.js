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

class MonitorModel {

  /**
   * Função para ir buscar á base de dados todos os monitores.
   * @param {*} callback retorna as rows
   */
  find(callback) {
    conn.connect(function (err) {
      let sql = "SELECT * FROM monitors";

      conn.query(sql, function (err, rows) {
        callback(err, rows);
      });
    });
  }

  /**
   * Função para ir buscar á base de dados um monitor.
   * @param {Object} params
   * @param {*} callback retorna as rows/result
   */
  findOne(params, callback) {
    const { columnSet, values } = commonUtils.multipleColumnSet(params);
    conn.connect(function (err) {
      let sql = mysql.format(`SELECT * FROM monitors WHERE ${columnSet}`, [
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
  create(user_id, code, title, callback) {
      conn.connect(function(err) {
        if (err) throw err;
        let sql = mysql.format("INSERT INTO monitors(user_id, code, title) VALUES (?, ?, ?)", 
        [user_id, code, title]);

        conn.query(sql, function(err, rows) {
          callback(err, rows.affectedRows);
        });
      });

  }

  /**
   * Função para dar update das informações sobre um monitor na base de dados.
   * @param {*} params 
   * @param {*} id 
   * @param {*} callback 
   */
  update(params, id, callback) {
    const { columnSet, values } = commonUtils.multipleColumnSet(params); 
    conn.connect(function (err) {
      if (err) throw err;
      let sql = mysql.format(`UPDATE monitors SET ${columnSet} WHERE monitor_id = ?`, [...values, id]);
      conn.query(sql, function (err, rows) {
        callback(err, rows);
      });
    }); 

  }
  /**
   * Função para remover um monitor.
   * @param {*} id 
   * @param {*} callback 
   */
  deleteOne(id, callback) {
    conn.connect(function (err) {
      if (err) throw err;
      let sql = mysql.format("DELETE FROM monitors WHERE monitor_id = ?", [id]);
      conn.query(sql, function (err, rows) {
        callback(err, rows.affectedRows);
      });
    });
  }    

}

module.exports = new MonitorModel();