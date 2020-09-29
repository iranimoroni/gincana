// -------------------------------------------------
// MODELO = Módulo para a "formatação" da tabela 
// indicando seu nome, respectivos campos, suas 
// características (nome, tipo, tamanho, etc) 
// e relacionamentos com outras tabelas
// -------------------------------------------------

'use strict'

const {
  Model,
  DataTypes
} = require('sequelize');

class Turma extends Model {
  static init(sequelize) {
    super.init({
      turma: DataTypes.STRING(10),
    }, {
      freezeTableName: true,
      tableName: 'turmas',
      sequelize
    })
  }

}

module.exports = Turma;