var express = require('express');
const { Transform } = require('stream');
var router = express.Router();
var scraper = require("youtube-comment-scraper");
var spawn = require("child_process").spawn; 

/* GET users listing. */
router.post('/', function(req, res, next) {
    var { commentsData } = req.body
    var process = spawn('python', ['C:/LEARNING/sentimen-nltk/main.py', ...commentsData])
    process.stdout.on('data', function(data){
        console.log(JSON.parse(data))
        res.send(data);    
    })   
});

module.exports = router;
