import {copyFileSync,mkdirSync} from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const target=new URL('../public/assets/elk/',import.meta.url);
mkdirSync(target,{recursive:true});
copyFileSync(require.resolve('elkjs/lib/elk-worker.min.js'),new URL('elk-worker.min.js',target));
