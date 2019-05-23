var express = require('express');
const { Transform } = require('stream');
var router = express.Router();
var scraper = require("youtube-comment-scraper");
var spawn = require("child_process").spawn; 

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(req.body)
    var process = spawn('C:/Users/Vitalii_Bondarchuk/AppData/Roaming/npm/scraper.cmd', [req.body.videoUrl])
    var result = ''
    process.stdout.on('data', (data)=>{
        result+=data.toString();
    })
    process.stdout.on('end', (data)=>{
       console.log(result) 
    })
    process.stdout.pipe(res)
    
});

module.exports = router;
