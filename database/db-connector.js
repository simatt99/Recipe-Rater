// 1 # Citation for the following code:
// 2 # Date: 2/15/24
// 3 # Copied from nodejs-starter-app
// 4 # copied from github, changed a few things to match my implementation
// 5 # Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_simoesm',
    password        : '3429',
    database        : 'cs340_simoesm'
})

// Export it for use in our applicaiton
module.exports.pool = pool;