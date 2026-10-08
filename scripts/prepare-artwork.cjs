const sharp = require('/Users/aliaksandr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('node:fs/promises');
const root = '/Users/aliaksandr/.codex/generated_images/01a11d8e-6410-78c0-a272-fce1ba4821d3';
(async () => {
  const hero = `${root}/exec-7ccea208-1f2e-4556-845d-c9b774f9c63b.png`;
  await sharp(hero).webp({quality:87}).toFile('public/artwork/hero.webp');
  await sharp(hero).resize(750,1150,{fit:'cover',position:'right'}).webp({quality:84}).toFile('public/artwork/hero-mobile.webp');
  const sheet = `${root}/exec-c7cf3eba-95b7-490b-976a-c32e93c420bc.png`;
  const meta = await sharp(sheet).metadata();
  const w = Math.floor(meta.width/2), h = Math.floor(meta.height/2);
  console.log('Scenes:',meta.width,meta.height);
  for(const [i,name] of ['about','skills','projects','contact'].entries()){
    const input=await sharp(sheet).extract({left:i%2*w,top:Math.floor(i/2)*h,width:w,height:h}).toBuffer();
    await sharp(input).webp({quality:88}).toFile(`public/artwork/${name}.webp`);
    if(name!=='about') await sharp(input).resize(750,1000,{fit:'cover',position:name==='contact'?'right':'centre'}).webp({quality:82}).toFile(`public/artwork/${name}-mobile.webp`);
  }
  await sharp('public/artwork/hero.webp').resize(700,330,{fit:'cover',position:'bottom'}).webp({quality:84}).toFile('public/artwork/services.webp');
})();
