var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var count=0;

app.get('/', function(request, response) {
	response.render("index");
})

var server = app.listen(6789, function() {
	console.log("listening on port 6789");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	socket.emit('update_count', {count: count});

	socket.on('epic_push', function(){
		count++;
		io.emit('update_count', {count: count});
	})

	socket.on('reset_push', function(){
		count=0;
		io.emit('update_count', {count: count});
	})
})
