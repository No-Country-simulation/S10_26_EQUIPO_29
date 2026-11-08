import {cpSync,rmSync,mkdirSync,existsSync} from 'node:fs';
rmSync('dist/client',{recursive:true,force:true});
cpSync('out','dist/client',{recursive:true});

// Directory URLs for documentation routes on static hosting.
for(const route of ['design-system','design-system/tipografia','design-system/espaciado','design-system/componentes','design-system/movimiento']){
 if(existsSync(`dist/client/${route}.html`)){
  mkdirSync(`dist/client/${route}`,{recursive:true});
  cpSync(`dist/client/${route}.html`,`dist/client/${route}/index.html`);
 }
}
