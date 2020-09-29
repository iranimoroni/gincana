// -------------------------------------------------
// MODELO = Módulo para a "formatação" da tabela 
// indicando seu nome, respectivos campos, suas 
// características (nome, tipo, tamanho, etc) 
// e relacionamentos com outras tabelas 
// -------------------------------------------------

'use strict'

const Aluno = require("./mdAluno");
const Tarefa = require("./mdTarefa");

const {
  Model,
  DataTypes
} = require('sequelize');

class TarefaAluno extends Model {
  static init(sequelize) {
    super.init({
      dataEntrega: DataTypes.DATEONLY,
      conceito: DataTypes.FLOAT,
      obs: DataTypes.STRING(250),
    }, {
      freezeTableName: true,
      tableName: 'tarefaAluno',
      sequelize
    })
  }

  // belongsTo adiciona a relação à tabela na qual 
  // você está chamando o método, 
  // hasOne adiciona na tabela que é dada como argumento.

  static associate(models) {
    this.belongsTo(Aluno, {
      foreignKey: "idAluno"
    });
    this.belongsTo(Tarefa, {
      foreignKey: "idTarefa"
    });
  }

}

module.exports = TarefaAluno;

// A ordem em que a associação é definida é relevante. Em outras palavras, a ordem é importante, para os quatro casos.
//  Em todos os exemplos acima, Aé chamado de modelo de origem e Bé chamado de modelo de destino . 
//  Essa terminologia é importante.

// A A.hasOne(B)associação significa que existe um relacionamento Um para Um entre Ae B, 
// com a chave estrangeira sendo definida no modelo de destino ( B).

// A A.belongsTo(B)associação significa que existe um relacionamento Um para Um entre A e B, 
// com a chave estrangeira sendo definida no modelo de origem ( A).

// A A.hasMany(B)associação significa que existe um relacionamento Um-para-Muitos entre A e B, 
// com a chave estrangeira sendo definida no modelo de destino ( B).

// Essas três chamadas farão com que o Sequelize adicione automaticamente chaves estrangeiras 
// aos modelos apropriados (a menos que já estejam presentes).

// A A.belongsToMany(B, { through: 'C' })associação significa que existe um relacionamento 
// muitos-para-muitos entre Ae B, usando a tabela Ccomo tabela de junção , 
// que terá as chaves estrangeiras ( aIde bId, por exemplo). 
// Sequelize irá criar automaticamente este modelo C(a menos que já exista) 
// e definir as chaves estrangeiras apropriadas nele.
