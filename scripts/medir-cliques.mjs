// E10. Mapeia o grafo de links do site rodando em :5173 (links <a> e botões que navegam).
// Usa Playwright instalado FORA do projeto até a ADR-003; ajuste o import abaixo.
// Uso: npx vite --port 5173 & node scripts/medir-cliques.mjs > evals/grafo.json
import { chromium } from 'playwright'
const BASE='http://localhost:5173';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},ignoreHTTPSErrors:true});
const p=await ctx.newPage();
const graph={};const queue=['/'];const seen=new Set(['/']);
const norm=u=>{try{const x=new URL(u,BASE);if(x.origin!==new URL(BASE).origin)return {ext:u};if(x.pathname.startsWith('/uploads/'))return {file:x.pathname};return {page:x.pathname+(x.hash||'')}}catch{return {ext:u}}};
async function load(r){await p.goto(BASE+r,{waitUntil:'domcontentloaded'});await p.waitForTimeout(350);}
while(queue.length){
  const r=queue.shift();await load(r);
  const title=await p.evaluate(()=>document.querySelector('main h1')?.textContent?.trim()||document.title);
  const zones=await p.evaluate(()=>{
    const out=[];
    const zone=el=>el.closest('header')?'header':el.closest('footer')?'footer':'main';
    document.querySelectorAll('a[href]').forEach(a=>{if(a.closest('[role=dialog]'))return;out.push({kind:'a',zone:zone(a),href:a.getAttribute('href'),text:(a.textContent||a.getAttribute('aria-label')||'').trim().slice(0,70)})});
    document.querySelectorAll('button').forEach((bt,i)=>{bt.setAttribute('data-crawl',i);out.push({kind:'button',zone:zone(bt),idx:i,text:(bt.textContent||bt.getAttribute('aria-label')||'').trim().slice(0,70)})});
    return out;});
  const links=[];
  for(const z of zones){
    if(z.kind==='a'){links.push({...z,...norm(z.href)});continue;}
    if(z.zone==='header'&&!/Enviar|mensagem/i.test(z.text)) continue;
    await load(r);
    const before=await p.evaluate(()=>location.pathname+location.hash);
    try{await p.evaluate(i=>document.querySelectorAll("button")[i]?.click(),z.idx);}catch{}
    // re-tag buttons after reload
    await p.waitForTimeout(250);
    const after=await p.evaluate(()=>location.pathname+location.hash);
    if(after!==before) links.push({...z,page:after});
  }
  // re-tag issue: buttons tagged on first load only; retag each reload
  graph[r]={title,links};
  for(const l of links){ if(l.page){const pg=l.page.split('#')[0]; if(!seen.has(pg)){seen.add(pg);queue.push(pg);} } }
}
console.log(JSON.stringify(graph));
await b.close();
