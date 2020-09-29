// -------------------------------------------------
// Este módulo cria as tabelas de acordo com seus 
// MODELOS, caso elas não existam (.sync());
// as inicializam (.init());
// faz as associações (.associate);
// faz a conexão do db por meio do sequelize
// usando os dados de configuraçlão presentes
// no arquivo ../config/database.js
// e exporta esta conexão em conect.
//
// -------------------------------------------------

//'use strict'

// -------- Importa os módulos necessários ---------
const Sequelize = require("sequelize");          
const dbConfig = require("../config/database");  

const Turma = require("../modelos/mdTurma");
const Aluno = require("../modelos/mdAluno");
const Aula = require("../modelos/mdAula");
const Tarefa = require("../modelos/mdTarefa");
const TarefaAluno = require("../modelos/mdTarefaAluno");
const Curriculo = require("../modelos/mdCurriculo");
// -------------------------------------------------

const conect = new Sequelize(dbConfig); // "ativa" a conexão 

Tarefa.init(conect);
Turma.init(conect);
Aluno.init(conect);
Aula.init(conect);
TarefaAluno.init(conect);
Curriculo.init(conect);

Aluno.associate(conect);
TarefaAluno.associate(conect);

Tarefa.sync(conect);
Turma.sync(conect);
Aluno.sync(conect);
Aula.sync(conect);
TarefaAluno.sync(conect);
Curriculo.sync(conect);

 module.exports = {
     Sequelize: Sequelize,
     conect: conect
 }