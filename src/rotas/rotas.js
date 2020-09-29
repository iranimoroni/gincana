//  ---------------------------------------------------
//   módulo de configuração das rotas
//   .
//  ---------------------------------------------------
 
'use strict'

const express = require('express');

const ctAluno = require("../controles/ctAluno");
const ctTurma = require("../controles/ctTurma");
const ctAula = require("../controles/ctAula");
const ctTarefaAluno = require("../controles/ctTarefaAluno");
const ctTarefa = require('../controles/ctTarefa');
const ctCurriculo = require('../controles/ctCurriculo');

const rotas = express.Router();


rotas.get("/alunos", ctAluno.listaAlunos);
rotas.get("/alunos/:id", ctAluno.listaAlunosNome);
rotas.get("/turma/:id", ctAluno.listaAlunosTurma);
rotas.get("/aluno/:id", ctAluno.listaNumero);
rotas.post("/aluno", ctAluno.gravaAluno);

rotas.get("/aulas", ctAula.listaAula);
rotas.post("/aulas", ctAula.gravaAula);

rotas.get("/turmas", ctTurma.listaTurma);
rotas.post("/turmas", ctTurma.gravaTurma);

rotas.get("/tarefasAlunos/:id", ctTarefaAluno.listaTarefasAlunos);
rotas.post("/tarefaAluno", ctTarefaAluno.tarefaAlunoNova);
rotas.post("/tarefaAluno/:id", ctTarefaAluno.tarefaAlunoEdita);
rotas.delete("/tarefaAluno/:id", ctTarefaAluno.tarefaAlunoExclui);

rotas.get("/tarefas/", ctTarefa.tarefasLista);
rotas.get("/tarefa/:id", ctTarefa.tarefaMostra);
rotas.post("/tarefaNova", ctTarefa.tarefaNova);
rotas.post("/tarefaEdita/:id", ctTarefa.tarefaEdita);
rotas.delete("/tarefaExclui/:id", ctTarefa.tarefaExclui);

rotas.get("/habilidades/", ctCurriculo.listaCurriculo);
rotas.get("/habilidades/descricao/:id", ctCurriculo.buscaCurriculoDesc);
rotas.get("/habilidades/codigo/:id", ctCurriculo.buscaCurriculoCod);
rotas.get("/habilidades/linguagem/:id", ctCurriculo.buscaCurriculoLing);
rotas.get("/habilidades/conhecimento/:id", ctCurriculo.buscaCurriculoConhec);


rotas.get("/", (req, res) => {res.render('turmas')});

//rotas.get("/tarefas", ctTarefaAluno.gravaTarefa('2020-01-01',7,'observa',21,8));


//rotas.delete("/turmas", ctTurma.apaga);

//rotas.get('/report', ReportController.show);

module.exports = rotas;

