// -------------------------------------------------
// CONTROLE = Módulo com as funções para acesso 
// aos registros da tabela:
// listar; buscar; editar e apagar 
// -------------------------------------------------

'use strict'

//const bdconect = require("../database/conexao");
const Aluno = require('../modelos/mdAluno');
//const Tarefa = require('../modelos/mdTarefa');
const TarefaAluno = require('../modelos/mdTarefaAluno');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    async listaAlunos(req, res) {
        try {
            const alunos = await Aluno.findAll({
                raw: true,
            });
            return res.render('tabelaAlunosAll', {
                dadosDosAlunos: alunos,
            });
        } catch (error) {
            console.log("alunos NAO listados");
            console.log(error);
            return res.json("Erro ao listar alunos");
        }
    },

    async listaAlunosNome(req, res) {
        try {
            let busca = '%'+ req.params.id + '%';
            const alunos = await Aluno.findAll({ raw: true, where: { nome: { [Op.like]: busca } } });
            return res.render('tabelaAlunosAll', {
                dadosDosAlunos: alunos,
            });
        } catch (error) {
            console.log("alunos NAO listados");
            console.log(error);
            return res.json("Erro ao listar alunos");
        }
    },

    async listaAlunosTurma(req, res) {
        try {
            let busca = req.params.id;
            const alunos = await Aluno.findAll({
                raw: true,
                where: {
                    idTurma: busca
                }
            });

            //const tarefas = await TarefaDia.findAll({where:{idAluno: busca}});
            const tarefas = await TarefaAluno.findAll();

            return res.render('tabelaAlunos2', {
                dadosDosAlunos: alunos,
                dadosDasTarefas: tarefas,
                btt: "%><h1>teste</h1><%"
            });
        } catch (error) {
            console.log("alunos NAO listados");
            console.log(error);
            return res.json("Erro ao listar alunos");
        }
    },

    async listaNumero(req, res) {
        try {
            let busca = req.params.id;


            // erro -> const alunos = await TarefaDia.findAll({raw: true, attributes: ["idAluno","dataPedida"], include: [Aluno.findAll({raw: true, attributes: ["id","nome","numero","idTurma"]})], order: [["dataPedida"]]});
            const alunos = await TarefaAluno.findAll({
                raw: true,
                attributes: ["idAluno", "dataPedida"],
                include: [Aluno],
                order: [
                    ["idAluno"],
                    ["dataPedida"]
                ]
            });
            //const alunos = await TarefaDia.findAll({raw: true, include: [Aluno], order: [["dataPedida"]]});


            console.log("LISTEI por NUMERO DO ALUNO");
            console.log(req.params.id);
            let listaAlunos = res.json(alunos);
            return listaAlunos;
            //return res.render('tabelaAlunos', {dadosDosAlunos: alunos });
        } catch (error) {
            console.log("alunos NAO listados");
            console.log(error);
            return res.json("Erro ao listar alunos");
        }
    },

    async gravaAluno(req, res) {
        try {
            console.log("gravei aluno");
            const {
                nome,
                numero,
                idTurma
            } = req.body;
            // Aluno.create cria um novo registro na tabela aluno, 
            // baseado nos parametros indicados no arquivo mdAluno 
            // e nos dados vindos de req.body
            const alunor = await Aluno.create({
                nome,
                numero,
                idTurma
            });
            console.log(nome, numero);
            console.log(req.body);
            return res.json(alunor);
        } catch (error) {
            console.log("aluno NAO Gravado");
            console.log(error);
            return res.json("Erro ao gravar aluno");
        };
    }
};

