import {readFile,writeFile,readdir,copyFile,cp,rm} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const dist=resolve('dist');
const types={'.webp':'image/webp','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.ico':'image/x-icon'};
const cache=new Map();
async function embed(path){const file=resolve(dist,path);if(!cache.has(file)){const bytes=await readFile(file);cache.set(file,`data:${types[extname(file)]};base64,${bytes.toString('base64')}`);}return cache.get(file);}
const files=await readdir(resolve(dist,'assets'));
let html=await readFile(resolve(dist,'index.html'),'utf8');
// The lightweight Vite output stays the published entry: crawlers download the whole document.
const entry=html;
let css=await readFile(resolve(dist,'assets',files.find(f=>f.endsWith('.css'))),'utf8');
let js=await readFile(resolve(dist,'assets',files.find(f=>f.endsWith('.js'))),'utf8');
for(const match of [...css.matchAll(/url\(([^)]+)\)/g)]){const path=match[1].replace(/^['"]|['"]$/g,'');if(path.startsWith('data:'))continue;const uri=await embed('assets/'+path);css=css.replace(match[0],`url("${uri}")`);}
const artwork={};
for(const name of await readdir(resolve(dist,'artwork'))){if(name.endsWith('.webp'))artwork[name.slice(0,-5)]=await embed('artwork/'+name);}
// Vite resolves BASE_URL to ./ in the browser bundle; substitute the three dynamic image paths.
js=js.replace(/`\.\/artwork\/\$\{([^}]+)\}\.webp`/g,(_,expression)=>`portfolioArtwork[${expression}]`);
if(js.includes('`./artwork/'))throw new Error('Unresolved dynamic artwork path');
js=`const portfolioArtwork=${JSON.stringify(artwork)};\n${js}`;
html=html.replace(/<script type="module"[^>]*src="[^"]+"[^>]*><\/script>/,'').replace(/<link rel="stylesheet"[^>]+>/,`<style>${css}</style>`);
for(const path of new Set([...html.matchAll(/\.\/(?:artwork|icons|fonts)\/[a-zA-Z0-9_./-]+\.(?:webp|svg|woff2)/g)].map(m=>m[0]))){html=html.replaceAll(path,await embed(path));}
for(const name of ['favicon.svg','favicon.ico','apple-touch-icon.png']){
  html=html.replaceAll(`./${name}`,await embed(name));
}
for(const name of ['favicon.svg','favicon.ico','favicon-32.png','apple-touch-icon.png','og-image.jpg','robots.txt','sitemap.xml']){
  await copyFile(resolve(dist,name),resolve(name));
}
html=html.replace('</body>',`<script>${js.replaceAll('</script','<\\/script')}</script>\n</body>`);
html=html.replace(/^[\t ]+$/gm,'');
await writeFile('index.html',entry);
await writeFile(resolve(dist,'index.html'),entry);
await writeFile('portfolio.html',html);
await writeFile(resolve(dist,'portfolio.html'),html);
// Publish the static folders the lightweight entry references, so the repository root serves the site.
for(const folder of ['assets','artwork','fonts','icons']){
  await rm(resolve(folder),{recursive:true,force:true});
  await cp(resolve(dist,folder),resolve(folder),{recursive:true});
}
console.log(`Lightweight index.html (${(Buffer.byteLength(entry)/1024).toFixed(1)} KB) and static folders published to the repository root; standalone portfolio.html generated (${(Buffer.byteLength(html)/1024/1024).toFixed(1)} MB)`);
