// -------------------------------------------------
// CONTROLE = Módulo com as funções para acesso 
// aos registros da tabela:
// listar; buscar; editar e apagar 
// -------------------------------------------------

'use strict'

const TarefaAluno = require('../modelos/mdTarefaAluno');
const Aluno = require('../modelos/mdAluno');
const Tarefa = require('../modelos/mdTarefa');
const Turma = require('../modelos/mdTurma');


module.exports = {

    async listaTarefasAlunos(req, res) {
        try {
            let busca = req.params.id;

            function dataOk(date){	
	            return date.split('-').reverse().join('/');
            }
            // dica: numero = 5 -> numero.toString().padStart(2, '0') -> 05
            const turma = await Turma.findAll({raw: true, where: {id: busca}}); 

            var turmaAtual = '<div id="idTurmaATual" title="' + busca.toString().padStart(5, '0') + '">Listagem da turma: ' +  turma[0].turma + '</div>'; 

            const alunos = await Aluno.findAll({raw: true, where: {idTurma: busca}});
            const tarefas = await Tarefa.findAll({raw: true, where: {idTurma: busca}, order: [["dataPedida"]]});

            var listaTarefasTodas = "";
            var topoTarefas = '<th class="alunoNr" >Nr</th>'
            +'<th class="alunoNm" >NOME DO ALUNO</th>'
            //---- turma -------------------------------
            //+'<th class="alunoNr" >Tr.</th>'
            //---- turma -------------------------------
            +'<th class="totalTr" >T.E.</th>'
            +'<th class="pontosTr">Pts.</th>'
            +'<th class="mediaTr">Med.</th>';
            
            tarefas.forEach((elementTr, indexTr, arrayTr) => { 
                // cria um elemento "data" com id relativo a tarefa pedida a turma e o coloca no 
                // cabeçalho da tabela de tarefas da turma => idTnnnnn                                               
                topoTarefas = topoTarefas 
                + '<th class="dataTarefaTurma" id="idT' + tarefas[indexTr].id.toString().padStart(5, '0') 
                + '">' + dataOk(tarefas[indexTr].dataPedida) + '</th>'
            });   
            var tarefaLinha = "linhaClara";
            for (var i1 = 0; i1 < (alunos.length) ;i1++) {
                var mediaAluno = 0;
                var tarefasEntregues = 0;
                var totalNotas = 0;
                var tarefasPorAluno = "";
                for (var i2 = 0; i2 < (tarefas.length); i2++) {
                    const tarefasAluno = await TarefaAluno.findAll({ raw: true, where: { idAluno: alunos[i1].id, idTarefa: tarefas[i2].id } });
                    if (tarefasAluno.length > 0) {
                        tarefasPorAluno = tarefasPorAluno 
                        + '<td><text class="btTarefa btComTr" name= "btTarefa" id= "A' 
                        + alunos[i1].id.toString().padStart(5, '0') + 'T' + tarefas[i2].id.toString().padStart(5, '0') 
                        + 'i' + tarefasAluno[0].id.toString().padStart(5, '0') + 'x">'
                        + dataOk(tarefasAluno[0].dataEntrega) + ' [ '+ tarefasAluno[0].conceito +' ]</text></td>';  
                        tarefasEntregues++;
                        totalNotas = totalNotas + tarefasAluno[0].conceito;
                    }
                    else {
                        tarefasPorAluno = tarefasPorAluno 
                        + '<td><text class="btTarefa btSemTr" name= "btTarefa" id= "A' 
                        + alunos[i1].id.toString().padStart(5, '0') + 'T' + tarefas[i2].id.toString().padStart(5, '0') + 'i0000x">'
                        + ' Não Entregue </text></td>';  
                    };
                };
                mediaAluno = totalNotas / tarefasEntregues;
                if ( isNaN(mediaAluno) ) { 
                    mediaAluno = 0 
                } else {
                    mediaAluno = parseFloat(mediaAluno.toFixed(1)); // converte em float e fixa 1 casa decimal
                };
                totalNotas = parseFloat(totalNotas.toFixed(1)); // converte em float e fixa 1 casa decimal
                
                var tarefasInicio = '<tr class="'+ tarefaLinha + '">' 
                + '<td class="alunoNr" id="idANr' + alunos[i1].id.toString().padStart(5, '0') + '">'
                + alunos[i1].numero.toString().padStart(2, '0') +'</td>' 
                + '<td class="alunoNm" id="idANm' + alunos[i1].id.toString().padStart(5, '0') + '">'
                + alunos[i1].nome+'</td>' 
                //---- turma -------------------------------
                //+ '<td class="alunoNr">' + alunos[i1].turma+'</td>' 
                //---- turma -------------------------------
                + '<td class="totalTr" id="totalTr' + alunos[i1].id.toString().padStart(5, '0') +'">' 
                + tarefasEntregues + '</td>'
                + '<td class="pontosTr" id="pontosTr' + alunos[i1].id.toString().padStart(5, '0') +'">' 
                + totalNotas + '</td>'
                + '<td class="mediaTr" id="mediaTr' + alunos[i1].id.toString().padStart(5, '0') +'">' 
                + mediaAluno + '</td>';
                tarefasPorAluno = tarefasInicio + tarefasPorAluno;
                listaTarefasTodas = listaTarefasTodas + tarefasPorAluno + '</tr>';
                if (tarefaLinha == "linhaClara"){
                    tarefaLinha = "linhaEscura";
                } else {
                    tarefaLinha = "linhaClara";
                }
            };
            return res.render('tabelaAlunosTarefas', {
                dadosGerais: listaTarefasTodas,
                topoTabela: topoTarefas,
                turmaTarefas: turmaAtual,
            });
            
        } catch (error) {
            console.log(error);
            return res.json("Erro ao listar as tarefas e os alunos");
        }
    
    },

    async tarefaAlunoNova(req, res) {
        try {
            console.log("gravei tarefa do aluno");
            const {
                dataEntrega,
                conceito,
                obs,
                idAluno,
                idTarefa,
            } = req.body;
            console.log(req.body)
            const tarefasAlunor = await TarefaAluno.create({
                dataEntrega,
                conceito,
                obs,
                idAluno,
                idTarefa,                
            });
            return res.json(tarefasAlunor);
        } catch (error) {
            console.log("aulas NAO Gravadas");
            console.log(error);
            return res.json("Erro ao gravar aulas");
        };
    },
      
    async tarefaAlunoEdita(req, res) {
        let busca = req.params.id;
        try {
            console.log("gravei tarefa do aluno");
            const {
                dataEntrega,
                conceito,
                obs,
                idAluno,
                idTarefa,
            } = req.body;
            console.log(req.body)
            const tarefasAlunor = await TarefaAluno.update({
                dataEntrega,
                conceito,
                obs,
                idAluno,
                idTarefa,                
            }, {where: { id: busca}} );
            return res.json(tarefasAlunor);
        } catch (error) {
            console.log("tarefa NAO Gravada");
            console.log(error);
            return res.json("Erro ao gravar Tarefa");
        };
    },


    async tarefaAlunoExclui(req, res) {
        let busca = req.params.id;
        try {
            const tarefasAlunor = await TarefaAluno.destroy({where: { id: busca}} );
            return res.json(tarefasAlunor);
        } catch (error) {
            console.log("tarefa NAO Excluida");
            console.log(error);
            return res.json("Erro ao excluir tarefa");
        };
    },
      
};
