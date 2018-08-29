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

    query(query) {
        databaseconnection.connect(err => {
            if (err) {
                console.log("Error in Connection Pool", err);
            }
            else {
                const request = new sql.Request(databaseconnection);
                return new Promise(function (resolve, reject) {
                    request.query(query, (poolerr, result) => {
                        if (poolerr) {
                            reject(poolerr);
                        } else {
                            resolve(result);
                        }
                    })

                })

            }
        })

    }

}
module.exports = {
    curdjs: curdjs
}