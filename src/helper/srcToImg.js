const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const writeFile = promisify(fs.watchFile);

module.exports =  urlToImg = promisify((url, dir,callback) => {
    const mod = /^https:/.test(url) ? https : http; //判断哪个协议
    // const ext = path.extname(url);
    const file = path.join(dir, `${Date.now()}.jpg`);

    mod.get(url, res => {
        res.pipe(fs.createWriteStream(file))
        .on('finish',()=>{
            callback();  //设了回调 用promise让他好看点
            console.log(file);
        });
     })
});