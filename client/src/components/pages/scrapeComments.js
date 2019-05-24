const fs = require('fs');
var some_url = process.argv[2]
var scraper = require("youtube-comment-scraper");
scraper.comments(some_url).then(function(res) {
    fs.writeFileSync('comments.json', JSON.stringify({
        res
    }));  
    // Close scraper.
    scraper.close();
});