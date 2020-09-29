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

class Curriculo extends Model {
  static init(sequelize) {
    super.init({
      linguagem: DataTypes.STRING(45),
      ano: DataTypes.STRING(2),
      habilidadeCod: DataTypes.STRING(15),
      habilidadeDesc: DataTypes.TEXT,
      conhecimento: DataTypes.STRING(45),
    }, {
      freezeTableName: true,
      tableName: 'curriculoArte',
      sequelize
    })
  }
}

module.exports = Curriculo;