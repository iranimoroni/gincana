// -------------------------------------------------
// CONTROLE = Módulo com as funções para acesso 
// aos registros da tabela:
// listar; buscar; editar e apagar 
// -------------------------------------------------

'use strict'

const Curriculo = require('../modelos/mdCurriculo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

    async listaCurriculo(req, res) {
        try {
            var curriculox = await Curriculo.findAll({ raw: true });
            return res.render('curriculoPaulista', {
                dadosDasHabilidades: curriculox,
            });
        } catch (error) {
            console.log("Curriculo NAO listado");
            console.log(error);
            return res.json("Erro ao listar curriculo");
        }
    },

    async buscaCurriculoDesc(req, res) {
        let busca = '%'+ req.params.id + '%';
        try {
            var curriculox = await Curriculo.findAll({ raw: true, where: { habilidadeDesc: { [Op.like]: busca } } });
            return res.render('curriculoPaulista', {
                dadosDasHabilidades: curriculox,
            });
        } catch (error) {
            console.log("Curriculo NAO listado");
            console.log(error);
            return res.json("Erro ao listar curriculo");
        }
    },

    async buscaCurriculoCod(req, res) {
        let busca = '%'+ req.params.id + '%';
        try {
            var curriculox = await Curriculo.findAll({ raw: true, where: { habilidadeCod: { [Op.like]: busca } } });
            return res.render('curriculoPaulista', {
                dadosDasHabilidades: curriculox,
            });
        } catch (error) {
            console.log("Curriculo NAO listado");
            console.log(error);
            return res.json("Erro ao listar curriculo");
        }
    },

    async buscaCurriculoLing(req, res) {
        let busca = '%'+ req.params.id + '%';
        try {
            var curriculox = await Curriculo.findAll({ raw: true, where: { linguagem: { [Op.like]: busca } } });
            return res.render('curriculoPaulista', {
                dadosDasHabilidades: curriculox,
            });
        } catch (error) {
            console.log("Curriculo NAO listado");
            console.log(error);
            return res.json("Erro ao listar curriculo");
        }
    },

    async buscaCurriculoConhec(req, res) {
        let busca = '%'+ req.params.id + '%';
        try {
            var curriculox = await Curriculo.findAll({ raw: true, where: { conhecimento: { [Op.like]: busca } } });
            return res.render('curriculoPaulista', {
                dadosDasHabilidades: curriculox,
            });
        } catch (error) {
            console.log("Curriculo NAO listado");
            console.log(error);
            return res.json("Erro ao listar curriculo");
        }
    },

    async gravaCurriculo(req, res) {
        try {
            console.log("gravei aula");
            const {
                linguagem,
                habilidadeCod,
                habilidadeDesc,
                conhecimento
            } = req.body;
            const curriculor = await Curriculo.create({
                linguagem,
                habilidadeCod,
                habilidadeDesc,
                conhecimento
            });
            return res.json(curriculor);
        } catch (error) {
            console.log("curriculo NAO Gravado");
            console.log(error);
            return res.json("Erro ao gravar curriculo");
        };
    }
};