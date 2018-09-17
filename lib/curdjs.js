const sql = require('mssql');
var databaseconnection = null;

class curdjs {
    connect(DatabaseType, server, username, password, DatabaseName) {

        if (DatabaseType === "mssql") {
            var dbConfig = {
                user: username,
                password: password,
                server: server,
                database: DatabaseName,

            }
            databaseconnection = new sql.ConnectionPool(dbConfig);
            // , err => {
            //     if (err) {
            //         console.log("Error in Connection Pool", err);
            //     }
            // })
            databaseconnection.on('error', err => {
                if (err) console.log("Error", err);
            })
        }
    }
    createDatabase(DB) {
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    const request = new sql.Request(databaseconnection);                                                            
                    request.query("CREATE DATABASE "+DB+";", (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                            databaseconnection.close();
                        }
                    })
                }
            })
        })
    }
    deleteDatabase(DB){
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    const request = new sql.Request(databaseconnection); 
                    request.input("DBNAME",DB)                                                
                    request.query("DROP DATABASE @DBNAME;", (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                            databaseconnection.close();
                        }
                    })
                }
            })
        })
    }
    createSchema(Schema,DB){
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    console.log("1");
                    reject(err);
                } else {
                    const query="USE "+DB+";"
                    const query2="CREATE SCHEMA "+Schema+";";                  
                    const request = new sql.Request(databaseconnection);                                                                                
                    request.query(query, (poolerr, result) => {
                        if (poolerr) {
                            
                            reject(poolerr);
                        } else {
                            
                            const request1=new sql.Request(databaseconnection);
                            request1.query(query2,(error,result1)=>{
                                if(error){
                                    
                                    reject(error);
                                }else{
                                    
                                    databaseconnection.close();
                                    resolve(result1);
                                   
                                }
                            });
                            
                        }
                    })
                }
            })
        })
    }
    createTableinDB(Table,Schema,DB){
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    const query="CREATE TABLE " +DB+"."+Schema+"."+Table+"("+Table+"PK int IDENTITY(1,1) PRIMARY KEY,)";                  
                    const request = new sql.Request(databaseconnection);                                                                                
                    request.query(query, (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                            databaseconnection.close();
                        }
                    })
                }
            })
        })
    }
    deleterow(Table,Schema,DB,RowN){
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    const query="ALTER TABLE " +DB+"."+Schema+"."+Table+"\nDROP COLUMN "+RowN;
                    const request = new sql.Request(databaseconnection);                                                                                
                    request.query(query, (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                            databaseconnection.close();
                        }
                    })
                }
            })
        })
    }
    createrow(Table,Schema,DB,RowN,Datatype){
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    const query="ALTER TABLE " +DB+"."+Schema+"."+Table+"\nADD "+RowN+" "+Datatype;                  
                    const request = new sql.Request(databaseconnection);                                                                                
                    request.query(query, (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                            databaseconnection.close();
                        }
                    })
                }
            })
        })
    }
    deleteTableFromDB(Table,DB){
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    reject(err);
                } else {
                    const request = new sql.Request(databaseconnection);                                                            
                    request.query("DROP TABLE "+DB+"."+Table+";", (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                            databaseconnection.close();
                        }
                    })
                }
            })
        })
    }
    query(query) {
        return new Promise(function (resolve, reject) {
            databaseconnection.connect(err => {
                if (err) {
                    console.log("Error in Connection Pool", err);
                }
                else {

                    const request = new sql.Request(databaseconnection);
                    request.query(query, (poolerr, result) => {
                        if (poolerr) {

                            reject(poolerr);
                        } else {

                            resolve(result);
                        }
                    })

                }
            })

        })
    }
}
module.exports = {
    curdjs: curdjs
}