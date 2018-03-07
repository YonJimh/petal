const puppeteer = require('puppeteer');
const conf = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async ()=>{
    const browser = await puppeteer.launch({
        headless:false,
        timeout:0
    });
    const page = await browser.newPage();
    conf.search = '背景';
    await page.goto(`http://huaban.com/search/?q=${conf.search}&jegmfkl9&page=2&per_page=40&wfl=1`,{waitUntil: 'networkidle2',timeout:0});
    // await page.setViewport({
    //     height:5000,
    //     width:1920
    // });
    // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    // await page.focus('#query');
    // await page.keyboard.sendCharacter(conf.search);
    // // await browser.close();
    // await page.click('a.go');
    // await page.setRequestInterception(true);
    // page.on('request', interceptedRequest=>{
    //     interceptedRequest.continue({
    //         header:{
                
    //             'Host': 'huaban.com',
    //             'Accept': 'application/json',
    //             'X-Request': 'JSON',
    //             'X-Requested-With': 'XMLHttpRequest'
    //         }
    //     })
    // });
    page.on('load',async ()=>{ 
        srcs = await page.evaluate(()=>{
            // const list=[];
            // document.querySelectorAll('.layer-view img')
            // .forEach((a)=>{list.push(a.getAttribute('src'));
            // });
            // return list;
            const images = document.querySelectorAll('.layer-view img');
            return Array.prototype.map.call(images,img => img.src ); 
        });
        console.log(srcs);
        console.log(`弄到 ${srcs.length} 张图片`);

        srcs.forEach( async src => {
            await page.waitFor(500);
            await srcToImg(src,conf.image_path);
        });
        await browser.close();
    });

        
})();