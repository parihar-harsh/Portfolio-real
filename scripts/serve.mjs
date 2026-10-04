import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
async function readHeaders(){const headers={};for(const line of (await fs.readFile(path.join(root,'_headers'),'utf8')).split('\n')){const match=line.match(/^\s+([^:]+): (.*)$/);if(match)headers[match[1]]=match[2];}return headers;}
const types={'.html':'text/html; charset=utf-8','.txt':'text/plain; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.gif':'image/gif','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 const headers=await readHeaders();
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
  if(!file.startsWith(root)){res.writeHead(403);res.end();return;}
  const body=await fs.readFile(file);res.writeHead(200,{...headers,'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
 }catch{res.writeHead(404,headers);res.end('Not found');}
});
server.listen(4174,'127.0.0.1',()=>console.log('Portfolio preview with production security headers: http://127.0.0.1:4174'));
