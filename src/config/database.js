// exporta um {objeto} de configurações para o db

module.exports = {
     dialect: 'mysql',
     
// ===  configuração Lenovo  ===
//     host: 'localhost',
//     username: 'root',
//     password: '123456',
//     database: 'escola04',
//=== === === === === === === ===  

//// ===  configuração DeskTop  ===
//      host: 'localhost',
//      username: 'root',
//      password: '',
//      database: 'teste001',
////=== === === === === === === ===  
  
// // //// ===  configuração Heroku  ===
//     host: 'us-cdbr-east-02.cleardb.com',
//     port: 3306,
//     username: 'be341a757b563c',
//     password: 'aa85cdd0',
//     database: 'heroku_428abe55ec2ef5b',
// // ////=== === === === === === === ===  

// //// ===  configuração Umbler  ===
      host: 'mysql741.umbler.com',
      port: 41890,
      username: 'sqlallexirani',
      password: 'SQL123456irani',
      database: 'escolasirani',
// ////=== === === === === === === ===  

//// ===  configuração Umbler Gincana  ===
// host: 'mysql669.umbler.com',
// port: 41890,
// username: 'sqlallexgin',
// password: 'SQL123456',
// database: 'escola04gin',
////=== === === === === === === ===  

//// ===  configuração Amazon  ===
//  nao    host: 'database-escola.chpihgugzrnf.us-east-1.rds.amazonaws.com',
//      host: 'escola04.chpihgugzrnf.us-east-1.rds.amazonaws.com',
//      port: 3306,
//      username: 'admin',
//      password: 'SQL123456',
//      database: 'escola04',
//
//      https://948493867800.signin.aws.amazon.com/console/
////=== === === === === === === ===  


    define: {
        timestamps: true,   // todas as tabelas terão  createdAt & updateAt
        //underscored: true,  //  snak_case
    },
}