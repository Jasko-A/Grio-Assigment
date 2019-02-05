//Author: Jasmin Adzic
//Date Created: 02/04/2019

const hostname = '127.0.0.1';
var port = 720;

//---------------------------------------------------//
var fs = require('fs');

var http  = require('http');
var static = require('node-static');
var url = require('url');

function static_handler(req, res) {
	req.addListener('end', function() {
		fileServer.serve(req, res, function (e, result) {
			//If the file cannot be found in '/static' directory
			//print to browser the error messafe
			if (e && (e.status === 404)) { 
				res.writeHead(404, {"Content-Type": "text/html"});
				res.write("ERROR 404: File not Found");  
				res.end();
		}
	});
}).resume();
}

function handler(req, res) {
	console.log("request url issss " + req.url);
	var url = req.url;
	if (url != '/favicon.ico') 
	{
	url = url.replace('/','');
	url = url.split('/');
	//make sure that the url is correct
	console.log(url);
	console.log(url.length);
	console.log(typeof url); 

	
		if(url.length == 1)
		{
			fileServer = new static.Server('./static');
			static_handler(req,res);
		}
	}
}

var server = http.createServer(handler);
server.listen(port, hostname);
