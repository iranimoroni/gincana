// -------------------------------------------------
// CONTROLE = Módulo com as funções para acesso 
// aos registros da tabela:
// listar; buscar; editar e apagar 
// -------------------------------------------------

'use strict'

const Tarefa = require('../modelos/mdTarefa');
const TarefaAluno = require('../modelos/mdTarefaAluno');

module.exports = {

    async tarefasLista(req, res) {
        try {
            const tarefas = await Tarefa.findAll({ raw: true });
            return res.json(tarefas);
        } catch (error) {
            console.log("tarefas NAO listadas");
            console.log(error);
            return res.json("Erro ao listar tarefas");
        }
    },

    async tarefaMostra(req, res) {
        let busca = req.params.id;
        try {
            const tarefaMt = await Tarefa.findAll({ raw: true, where: { id: busca}} );
            return res.json(tarefaMt);
        } catch (error) {
            console.log("tarefa NAO Encontrada");
            console.log(error);
            return res.json("Erro ao mostrar tarefa");
        };
    },
    
    async tarefaNova(req, res) {
        try {
            console.log("gravei tarefa");
            const {
                dataPedida,
                descricao,
                habilidade,
                obs,
                idTurma
            } = req.body;
            const tarefaNv = await Tarefa.create({
                dataPedida,
                descricao,
                habilidade,
                obs,
                idTurma
            });
            return res.json(tarefaNv);
        } catch (error) {
            console.log("tarefa NAO Gravada");
            console.log(error);
            return res.json("Erro ao gravar tarefa");
        };
    },

    async tarefaEdita(req, res) {
        let busca = req.params.id;
        try {
            console.log("gravei tarefa");
            const {
                dataPedida,
                descricao,
                habilidade,
                obs,
                idTurma
            } = req.body;
            const tarefaNv = await Tarefa.update({
                dataPedida,
                descricao,
                habilidade,
                obs,
                idTurma
            }, {where: { id: busca}} );
            return res.json(tarefaNv);
        } catch (error) {
            console.log("tarefa NAO Gravada");
            console.log(error);
            return res.json("Erro ao gravar tarefa");
        };
    },
    
    async tarefaExclui(req, res) {
        let busca = req.params.id;
        
        const tarefasAluno = await TarefaAluno.findAll({ raw: true, where: { idTarefa: busca } });
        if (tarefasAluno.length > 0) {
            return res.status(400).send({ error: "temTarefa" });
        } else {
            try {
                const tarefasEx = await Tarefa.destroy({where: { id: busca}} );
                return res.json(tarefasEx);
            } catch (error) {
                console.log("tarefa NAO Excluida");
                console.log(error);
                return res.json("Erro ao excluir tarefa");
            };
                
        }
        
    },

};