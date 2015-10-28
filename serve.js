var connect = require('connect'),
	http = require('http'),
	serveStatic = require('serve-static'),
	compression = require('compression')
;
 
var app = connect()
 
// gzip/deflate outgoing responses 
app.use(compression());

app.use(serveStatic(__dirname, {'index': ['index.html', 'index.htm']})).listen(8080);