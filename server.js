const 
    http = require('http'),
    express = require('express'),
    port = 8000,
    app = express();







// server.get('/', function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// });
app.use(express.static('./dist'));
