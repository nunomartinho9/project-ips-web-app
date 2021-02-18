/**
 * Função para separar de um objeto as keys e seus valores e retornar os valores e colunas,
 * por exemplo: "key = ?, key2 = ?, ..." para facilitar as funções da base de dados.
 * BY NUNOZERA 
 * @param {Object} object
 */

function multipleColumnSet(object) {
    if (typeof object !== "object") {
      throw new Error("Invalid Input");
    }
  
    const keys = Object.keys(object);
    const values = Object.values(object);
  
    columnSet = keys.map((key) => `${key} = ?`).join(", ");
  
    return {
      columnSet,
      values,
    };
  }
  
  module.exports.multipleColumnSet = multipleColumnSet;