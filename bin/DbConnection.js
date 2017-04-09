

var mysql	= require('mysql'			);

//DBに接続する関数
var connection;
function handleDisconnect() {
    console.log('1. connecting to db:');		
	// Recreate the connection, since
	// the old one cannot be reused.
	// The server is either down
	
	connection = mysql.createConnection(process.env.DATABASE_URL);
    connection.connect(function(err) {              	
		// or restarting (takes a while sometimes).
        if (err) {                                     
            console.log('2. error when connecting to db:', err);
			// We introduce a delay before attempting to reconnect,
			// to avoid a hot loop, and to allow our node script to
			// process asynchronous requests in the meantime.
			// If you're also serving http, display a 503 error.
            setTimeout(handleDisconnect, 1000); 
        }
    });

	// Connection to the MySQL server is usually
	// lost due to either server restart, or a
	// connnection idle timeout (the wait_timeout
	// server variable configures this)
    connection.on('error', function(err) {
        console.log('3. db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

console.log('DB connected');

module.exports = mysql;
