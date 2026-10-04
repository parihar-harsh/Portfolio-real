import fs from 'node:fs/promises';
const source=new URL('../',import.meta.url);
const output=new URL('../dist/',import.meta.url);
await fs.mkdir(output,{recursive:true});
for(const file of ['index.html','style.css','app.js','favicon.svg','404.html','_headers','robots.txt','sitemap.xml'])await fs.copyFile(new URL(file,source),new URL(file,output));
console.log('Static portfolio built in dist/.');
