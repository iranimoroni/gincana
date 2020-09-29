// -------------------------------------------------
// MODELO = Módulo para a "formatação" da tabela 
// indicando seu nome, respectivos campos, suas 
// características (nome, tipo, tamanho, etc) 
// e relacionamentos com outras tabelas 
// -------------------------------------------------

'use strict'

//const Turma = require("../modelos/mdTurma");

const {
  Model,
  DataTypes
} = require('sequelize');

class Tarefa extends Model {
  static init(sequelize) {
    super.init({
      dataPedida: DataTypes.DATEONLY,
      descricao: DataTypes.STRING(50),
      habilidade: DataTypes.STRING(10),
      obs: DataTypes.STRING(250),
      idTurma: DataTypes.INTEGER,
    }, {
      freezeTableName: true,
      tableName: 'tarefas',
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
    this.hasMany(TarefaAluno, {
      foreignKey: "idTarefa"
    });
    
  }

}

module.exports = Tarefa;