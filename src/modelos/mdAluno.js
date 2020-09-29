// -------------------------------------------------
// MODELO = Módulo para a "formatação" da tabela 
// indicando seu nome, respectivos campos, suas 
// características (nome, tipo, tamanho, etc) 
// e relacionamentos com outras tabelas 
// -------------------------------------------------

'use strict'

const Turma = require("../modelos/mdTurma");

const {
  Model,
  DataTypes
} = require('sequelize');

class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING(55),
      numero: DataTypes.INTEGER,
      turma: DataTypes.STRING(15), 
    }, {
      freezeTableName: true,
      tableName: 'alunos',
      sequelize
    })
  }

  // belongsTo adiciona a relação à tabela na qual 
  // você está chamando o método, 
  // hasOne adiciona na tabela que é dada como argumento.

  static associate(models) {
    this.belongsTo(Turma, {
      foreignKey: "idTurma"
    });
  }

}

module.exports = Aluno;