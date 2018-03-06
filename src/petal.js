const puppeteer = require('puppeteer');
const conf = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async ()=>{
    const browser = await puppeteer.launch({
        // headless:false,
        timeout:0
    });
    const page = await browser.newPage();
    await page.goto('http://huaban.com/',{waitUntil: 'networkidle2',timeout:0});
    await page.setViewport({
        height:5000,
        width:1920
       
    });
    // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

    await page.focus('#query');
    await page.keyboard.sendCharacter(conf.search);
    // await browser.close();
    await page.click('a.go');

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