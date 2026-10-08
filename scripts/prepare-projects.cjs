const sharp=require('/Users/aliaksandr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
const source='/Users/aliaksandr/.codex/generated_images/01a11d8e-6410-78c0-a272-fce1ba4821d3/exec-302cf75a-790b-4b35-8d19-20f595bf84ef.png';
const m=await sharp(source).metadata();const w=Math.floor(m.width/3),h=Math.floor(m.height/2);console.log(m.width,m.height);
for(const [i,name]of ['consensus','bixbit','competitions','youtube','auto','experience'].entries()) await sharp(source).extract({left:i%3*w,top:Math.floor(i/3)*h,width:w,height:h}).webp({quality:88}).toFile(`public/artwork/${name}.webp`);
})();
