const sharp=require('/Users/aliaksandr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root='/Users/aliaksandr/.codex/generated_images/01a11d8e-6410-78c0-a272-fce1ba4821d3';
(async()=>{
const background=`${root}/exec-a985f84c-f9b9-4861-9d3f-edb46c4238c9.png`;
const subject=`${root}/exec-ff44f9df-966c-4609-838c-24279868a813.png`;
const meta=await sharp(subject).metadata();console.log(meta.width,meta.height,'alpha',meta.hasAlpha);
await sharp(background).webp({quality:87}).toFile('public/artwork/hero-background.webp');
await sharp(background).resize(750,1150,{fit:'cover',position:'right'}).webp({quality:83}).toFile('public/artwork/hero-background-mobile.webp');
await sharp(subject).webp({quality:90,alphaQuality:95}).toFile('public/artwork/hero-subject.webp');
await sharp(subject).extract({left:500,top:0,width:meta.width-500,height:meta.height}).resize({width:850}).webp({quality:87,alphaQuality:95}).toFile('public/artwork/hero-subject-mobile.webp');
})();
