import fs from 'node:fs';
const t=JSON.parse(fs.readFileSync('src/timeline.json','utf8'));
if(t.preview)throw new Error('Prévia sem voz. Execute npm run prepare:media antes de renderizar.');
for(const s of t.scenes){
 if(!s.voice||!fs.existsSync('public/'+s.voice))throw new Error('Voz ausente: '+s.id);
 if(!s.captions.length)throw new Error('Legendas ausentes: '+s.id);
}
for(const file of ['score.wav','hit.wav','whoosh.wav','tick.wav'])if(!fs.existsSync('public/audio/'+file))throw new Error(file+' ausente');
console.log('Mídia pronta para renderização.');
