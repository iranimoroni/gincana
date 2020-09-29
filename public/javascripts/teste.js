// -------------------------------------------------
// CONTROLE = Módulo com as funções para acesso 
// aos registros da tabela:
// listar; buscar; editar e apagar 
// -------------------------------------------------

//var conectar = require('../database/conexao');
import conectar from ('../database/conexao');

//import TarefaAluno from '../../src/controles/ctTarefaAluno';

function atencao_teste(){
    alert("olá estou aqui no teste xxx");


    try {
        const dataEntrega = "2020-01-01";
        const conceito = 5;
        const obs = " gravado pelo app";
        const idAluno = 20;
        const idTarefa = 1;
        
        conectar.conect.query("UPDATE tarefas SET descricao = 'tarefa nova' WHERE id = 1", function(err,result){
            if(!err){
                console.log("operação bem sucedida");
            } else {
                console.log("ERRO na alteração");
            }
        });
        // const tarefasAlunoz = await TarefaAluno.create({
        //     dataEntrega,
        //     conceito,
        //     obs,
        //     idAluno,
        //     idTarefa,                
        // });
        console.log("gravei tarefa do aluno");
        return "gravado ok";
    } catch (error) {
        console.log(error);
        return error;
    };



}

// function gravaTarefa(){
//     console.log("gravando");
//     var dataEntrega = new Date();
//     var conceito = 6;
//     var obs ="pelo sistema";
//     var idAluno = 22;
//     var idTarefa = 6;
//     //alert("*** gravarei -> " + dataEntregax +" - "+ conceitox +" - "+ obsx +" - "+ idAlunox +" - "+ idTarefax);
//     try {
//         const tarefasAlunor = await TarefaAluno.create({
//             dataEntrega,
//             conceito,
//             obs,
//             idAluno,
//             idTarefa              
//         });
//         console.log('gravei');
//         return "ok";
//     } catch (error) {
//         console.log('deu erro');            
//         return error;
//     };
// };

// // async function gravaTarefa2(dataEntrega, conceito, obs, idAluno, idTarefa) {

// //     //    alert("vou gravar -> " + dataEntrega +" - "+ conceito +" - "+ obs +" - "+ idAluno +" - "+ idTarefa);
        
// //         try {
// //             const tarefasAlunor = await TarefaAluno.create({
// //                 dataEntrega,
// //                 conceito,
// //                 obs,
// //                 idAluno,
// //                 idTarefa              
// //             });
// //             alert('gravei');
// //             return "ok";
// //         } catch (error) {
// //             alert('deu erro');            
// //             return error;
// //         };
// //     };
    
// // async function gravaTarefa(req, res) {
// //     try {
// //         console.log("gravei tarefa do aluno");
// //         const {
// //             dataEntrega,
// //             conceito,
// //             obs,
// //             idAluno,
// //             idTarefa,
// //         } = req.body;
// //         const tarefasAlunor = await TarefaAluno.create({
// //             dataEntrega,
// //             conceito,
// //             obs,
// //             idAluno,
// //             idTarefa,                
// //         });
// //         return res.json(tarefasAlunor);
// //     } catch (error) {
// //         console.log("aulas NAO Gravadas");
// //         console.log(error);
// //         return res.json("Erro ao gravar aulas");
// //     };
// // }


