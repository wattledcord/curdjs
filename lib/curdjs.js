const sql = require('mssql');
var databaseconnection = null;
 class curdjs {
    connect(DatabaseType, server, username, password, DatabaseName) {
        
        if (DatabaseType === "mssql") {            
            var dbConfig={
                user:username,
                password:password,
                server:server,
                database:DatabaseName,
                
            }
            databaseconnection = new sql.ConnectionPool(dbConfig, err => {
                if (err) {
                    console.log("Error in Connection Pool", err);
                }
            })
            databaseconnection.on('error', err => {
                if (err) console.log("Error", err);
            })
        }
    }
    query(query) {
        databaseconnection.request().query(query, (poolerr, result) => {
            if (poolerr) {
                console.log("Pool Error", poolerr);
            } else {
                return result;
            }
        })
    }
}
module.exports={
    curdjs:curdjs
}