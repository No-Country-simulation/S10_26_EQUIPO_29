import {cpSync,rmSync} from 'node:fs';
rmSync('dist/client',{recursive:true,force:true});
cpSync('out','dist/client',{recursive:true});
