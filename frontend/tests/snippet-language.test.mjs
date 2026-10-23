import test from 'node:test';
import assert from 'node:assert/strict';
import {snippetLanguage} from '../src/data/snippetLanguage.mjs';
import {Prism} from 'prism-react-renderer';
test('language aliases use bundled grammars and unknown language falls back to text',()=>{
 assert.equal(snippetLanguage(' JS ').language,'javascript');assert.equal(snippetLanguage('py').language,'python');
 for(const value of [null,undefined,'nonexistent','constructor','__proto__'])assert.equal(snippetLanguage(value).language,'text');
});
test('tokenizing keeps the original code including markup and trailing newline',()=>{
 const code='const html = "<script>alert(1)</script>";\n';
 const flatten=token=>typeof token==='string'?token:Array.isArray(token)?token.map(flatten).join(''):flatten(token.content);
 assert.equal(flatten(Prism.tokenize(code,Prism.languages.javascript)),code);
});
