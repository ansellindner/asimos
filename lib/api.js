/**
 * ASIMOS: api.js
 * Copyright (c) 2016, INTERNAUT (MIT License)
 */
var express = require('express');
var exec = require('child_process').exec;
var api = express.Router();

api.use(function apiSet(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
});
/**
 *  System Commands
 *  controlled access to specific commands * 
 */

/*api.get('',function(req,res){
	
});

api.get('',function(req,res){});*/

/**
 *  Bitcoin
 *  controlled access to bitcoind
 */
api.get('/buptime', function(req,res){
	exec('ps -p $(pidof bitcoind) -o time --no-headers',function(error,stdout,stderr){
		res.json(stdout);
	});
});

api.get('/getinfo',function(req,res){
	exec("bitcoin-cli getinfo", function (error, stdout, stderr) {
			res.send(stdout);
	});
});

api.get('/getpeerinfo',function(req,res){
	exec("bitcoin-cli getpeerinfo", function (error, stdout, stderr) {
			res.send(stdout);
	});
});

api.get('/getadds', function(req,res){
	exec('bitcoin-cli listreceivedbyaddress 0 true',function(error,stdout,stderr){
		res.send(stdout);
	});
});

api.post('/newadd', function(req,res){
	exec('bitcoin-cli getnewaddress '+req.body.acct, function(error,stdout,stderr){
		res.json({add:stdout});
	});
	
});

api.post('/dumpkey', function(req,res){
	exec('bitcoin-cli dumpprivkey '+req.body.add, function(error,stdout,stderr){
		res.send(stdout);
	});
	
});

api.post('/signmessage', function(req,res){
	var add = req.body.add;
	var msg = req.body.msg;
	exec('bitcoin-cli signmessage '+add+' '+'"'+msg+'"', function(error,stdout,stderr){
		res.json({add: add, msg: msg, sig:stdout});
	});
	
});

api.post('/verifymessage', function(req,res){
	var add = req.body.add;
	var sig = req.body.sig;
	var msg = req.body.msg;
	exec('bitcoin-cli verifymessage '+add+' '+sig+' '+'"'+msg+'"', function(error,stdout,stderr){
		if(error){
			res.send(error)
		}else{
		if(stdout == true){
			var out = 'Message was Verified';
		}else{
			var out = 'Message was NOT Verified';
		}
		res.send(out);
		}
	});
	
});

module.exports = api;