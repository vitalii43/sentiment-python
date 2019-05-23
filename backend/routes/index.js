var express = require('express');
var router = express.Router();
var spawn = require("child_process").spawn; 
      
/* GET home page. */
router.get('/', function(req, res, next) {

  var process = spawn('python', ['C:/LEARNING/sentimen-nltk/main.py', 'i like books', 'i like books', 'i like books'])
  process.stdout.on('data', function(data){
    console.log(JSON.parse(data))
    res.render('index', { title: 'Express' });    
  })
});

module.exports = router;
