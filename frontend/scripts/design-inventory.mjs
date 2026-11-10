import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import postcss from 'postcss';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const src=path.join(root,'src');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk(src).filter(p=>!p.includes('/design-system/')&&/\.(jsx?|mjs|css|json)$/.test(p));
const relative=p=>path.relative(root,p).replaceAll('\\','/');
const resolve=(from,spec)=>[path.resolve(path.dirname(from),spec),...['.jsx','.js','.mjs','.css','.json','/index.jsx'].map(x=>path.resolve(path.dirname(from),spec+x))].find(p=>fs.existsSync(p)&&fs.statSync(p).isFile());
const active=new Set();
function visit(file){if(!file||active.has(file)||!files.includes(file))return;active.add(file);const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/(?:from\s*|import\s*\(?|@import\s*)['"]([^'"]+)['"]/g)){if(m[1].startsWith('.'))visit(resolve(file,m[1]));}}
visit(path.join(src,'app/page.jsx'));visit(path.join(src,'app/layout.jsx'));
const styles=[];
for(const file of files.filter(f=>f.endsWith('.css')&&active.has(f))){const tree=postcss.parse(fs.readFileSync(file,'utf8'));tree.walkDecls(d=>{let p=d.parent,context=[];while(p){if(p.type==='atrule')context.unshift('@'+p.name+' '+p.params);p=p.parent;}styles.push({property:d.prop,value:d.value,selector:d.parent.selector||d.parent.name||'',context:context.join(' → '),source:relative(file),line:d.source.start.line});});}
const icons=new Map();
const sources=files.filter(f=>active.has(f)&&!f.endsWith('.css')).map(file=>{const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g))for(const name of m[1].split(',').map(s=>s.trim().split(/\s+as\s+/)[0])){if(!icons.has(name))icons.set(name,[]);icons.get(name).push(relative(file));}return {path:relative(file),code:/\.(jsx?|mjs)$/.test(file)?text:null,exports:[...text.matchAll(/export\s+(?:const|function|class)\s+(\w+)/g)].map(m=>m[1]),motion:text.split('\n').map((line,i)=>({line:i+1,text:line.trim()})).filter(r=>/duration|easing|setTimeout|setInterval|requestAnimationFrame|stagger|delay|spring|damping|cubic-bezier/i.test(r.text)&&r.text.length<500)};});
// Historical light explorations are intentionally omitted from the design documentation.
const retiredLightAsset=/^\/assets\/hero\/(?:figma-lights\.svg|lights-composite\.svg|light-[0-9]+\.webp|liquid-metal\.webp)$/;
const assets=walk(path.join(root,'public')).filter(f=>/\.(svg|png|jpe?g|webp|woff2?|ico)$/.test(f)).map(file=>{const url='/'+path.relative(path.join(root,'public'),file);const uses=files.filter(f=>active.has(f)&&fs.readFileSync(f,'utf8').includes(url)).map(relative);return {url,bytes:fs.statSync(file).size,uses,status:uses.length?'referenciado':'sin referencia literal comprobada'};}).filter(asset=>asset.uses.length||!retiredLightAsset.test(asset.url));
const jsColors=[...new Set(sources.flatMap(s=>[...(s.code||'').matchAll(/#[0-9a-f]{3,8}\b/gi)].map(m=>m[0])))].map(value=>({value,uses:sources.filter(s=>s.code?.includes(value)).map(s=>s.path)}));
const output={sources,styles,jsColors,icons:[...icons].map(([name,uses])=>({name,uses})),assets,excluded:files.filter(f=>!active.has(f)&&!['MetalBorder.jsx','PromptMetalFill.jsx','liquidMetalMaterial.js','metalGeometry.mjs'].includes(path.basename(f))).map(f=>({path:relative(f),reason:'No alcanzable desde las entradas de la aplicación mediante imports estáticos. Revisar antes de tratar como activo.'}))};
const target=path.join(src,'app/design-system/inventory.generated.json');const json=JSON.stringify(output,null,2)+'\n';
if(process.argv.includes('--check')){if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==json){console.error('Design System: regenerar inventario con node scripts/design-inventory.mjs');process.exit(1);}}else fs.writeFileSync(target,json);
const iconFile=path.join(src,'app/design-system/icons.generated.jsx');
const iconNames=[...icons.keys()];
const iconSource="import {"+iconNames.join(',')+"} from 'lucide-react';\nexport const Icons={"+iconNames.join(',')+"};\n";
if(process.argv.includes('--check')){if(!fs.existsSync(iconFile)||fs.readFileSync(iconFile,'utf8')!==iconSource)process.exit(1);}else fs.writeFileSync(iconFile,iconSource);
console.log(`${sources.length} fuentes, ${styles.length} declaraciones, ${assets.length} assets, ${icons.size} iconos.`);
