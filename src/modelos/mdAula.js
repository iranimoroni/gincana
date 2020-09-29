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

class Aula extends Model {
    static init(sequelize) {
        super.init({
            data: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            codHabilidade: {
                type: DataTypes.STRING(12)
            },
            descricao: {
                type: DataTypes.STRING
            },
            entrega: {
                type: DataTypes.BOOLEAN
            }
        }, {
            freezeTableName: true,
            tableName: 'aulas',
            sequelize
        })
    }

    // belongsTo adiciona a relação à tabela na qual 
    // você está chamando o método, 
    // hasOne adiciona na tabela que é dada como argumento.

    // static associate(models) {
    //     this.belongsTo(models.Turma, {
    //         foreignKey: "idTurma"
    //     });
    // }

}

module.exports = Aula;