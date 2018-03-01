const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const writeFile = promisify(fs.watchFile);

module.exports =  urlToImg = promisify((url, dir,callback) => {
    const urls = url.split('_')[0];
    // console.log(urls);
    const filename = urls.split('//')[1].split('/')[1];
    const file = path.join(dir, `${filename}.png`);

    http.get(urls, res => {
        res.pipe(fs.createWriteStream(file))
        .on('finish',()=>{
            callback();  //设了回调 用promise让他好看点
            console.log(file);
        });
     })
});