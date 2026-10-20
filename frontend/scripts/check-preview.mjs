import assert from 'node:assert/strict';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173/';
async function get(url) {
 const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
 assert.equal(response.status, 200, `${url}: HTTP ${response.status}`);
 const body = await response.text();
 assert.ok(body.length > 0, `${url}: respuesta vacía`);
 return body;
}
for (let pass = 1; pass <= 5; pass++) {
 const html = await get(base);
 assert.ok(html.includes('OpenBridge'), 'Falta el documento de OpenBridge');
 assert.ok(!html.includes('/@vite/client'), 'La vista previa depende de recarga HMR');
 const scripts=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)];
 assert.ok(scripts.length>0,'Falta el JavaScript de arranque');
 for(const script of scripts)await get(new URL(script[1],base));
 for (const asset of [...html.matchAll(/<link[^>]+href="([^"]+\.css)"/g)]) await get(new URL(asset[1], base));
 console.log(`PASS ${pass}/5: HTML, JavaScript y CSS disponibles`);
}
