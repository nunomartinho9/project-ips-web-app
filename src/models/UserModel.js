const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const commonUtils = require("../utils/common.utils");

dotenv.config();
var conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

class UserModel {

  /**
   * Função para ir buscar á base de dados todos os users.
   * @param {*} callback retorna as rows
   */
  find(callback) {
    conn.connect(function (err) {
      let sql = "SELECT * FROM users";

      conn.query(sql, function (err, rows) {
        callback(err, rows);
      });
    });
  }

  /**
   * Função para ir buscar á base de dados um user.
   * @param {Object} params
   * @param {*} callback retorna as rows/result
   */
  findOne(params, callback) {
    const { columnSet, values } = commonUtils.multipleColumnSet(params);
    conn.connect(function (err) {
      let sql = mysql.format(`SELECT * FROM users WHERE ${columnSet}`, [
        ...values]);
      conn.query(sql, function (err, rows) {
        callback(err, rows);
      });
    });
  }

  create(name, email, password, callback) {
    conn.connect(function (err) {
      //Encriptar a password com o bcryptjs.
      bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err;
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) throw err;
          let sql = mysql.format(
            "INSERT INTO users(name, email, password) VALUES (?,?,?)",
            [name, email, hash]
          );

          conn.query(sql, function (err, rows) {
            if(typeof rows !== 'undefined' && rows) {
              callback(err, rows.affectedRows);
            }
          });
        });
      });
    });
  }

}

module.exports = new UserModel();