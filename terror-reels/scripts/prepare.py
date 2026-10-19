"""Gera mídia original e voz; não conclui silenciosamente sem narração."""
import argparse, asyncio, json, math, os, random, struct, subprocess, wave
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FPS=30
SCENES=[
 ('hook','O terror te enganou. E estes três bastidores provam isso.','O TERROR\nTE ENGANOU','TRÊS SEGREDOS DE BASTIDOR',None),
 ('psycho','Em Psicose, o sangue do chuveiro era calda de chocolate. No preto e branco, o truque funcionava.','ERA\nCHOCOLATE.','PSICOSE · 1960','psycho'),
 ('halloween','A máscara de Michael Myers era uma máscara do Capitão Kirk, de Star Trek, modificada e pintada de branco.','VEIO DE\nSTAR TREK.','HALLOWEEN · 1978','halloween'),
 ('exorcist','Em O Exorcista, o quarto foi refrigerado de verdade para a respiração dos atores aparecer na câmera.','O FRIO\nERA REAL.','O EXORCISTA · 1973','exorcist'),
 ('end','Qual desses te enganou? Comenta um, dois ou três. Agora assiste de novo.','QUAL TE\nENGANOU?','1 · CHOCOLATE    2 · MÁSCARA    3 · FRIO',None)
]
def write_wav(path,duration,fn):
 sr=24000;rng=random.Random(42)
 with wave.open(str(path),'wb') as w:
  w.setparams((1,2,sr,0,'NONE','not compressed'))
  for start in range(0,int(duration*sr),sr):
   w.writeframes(b''.join(struct.pack('<h',int(max(-.95,min(.95,fn(i/sr,rng)))*32767)) for i in range(start,min(start+sr,int(duration*sr)))))
def sound_assets(seconds):
 out=ROOT/'public/audio';out.mkdir(parents=True,exist_ok=True)
 def score(t,r):
  env=min(1,t/1.3,(seconds-t)/1.1);beat=t%.625
  bass=.12*math.sin(2*math.pi*55*t)+.055*math.sin(2*math.pi*58.27*t)
  pulse=.15*math.sin(2*math.pi*78*t)*math.exp(-beat*18)
  notes=[220,233.08,329.63,293.66,220,164.81,233.08,207.65];n=notes[int(t/1.25)%8]
  bell=.075*math.sin(2*math.pi*n*t)*math.exp(-(t%1.25)*4)
  return env*(bass+pulse+bell+.012*r.uniform(-1,1))
 write_wav(out/'score.wav',seconds,score)
 write_wav(out/'hit.wav',.8,lambda t,r:.65*math.sin(2*math.pi*(62*t-22*t*t))*math.exp(-6*t)+.12*r.uniform(-1,1)*math.exp(-25*t))
 write_wav(out/'whoosh.wav',.55,lambda t,r:r.uniform(-1,1)*.45*math.sin(math.pi*t/.55)**2)
 write_wav(out/'tick.wav',.12,lambda t,r:.24*r.uniform(-1,1)*math.exp(-45*t))
def posters():
 art={
 'psycho':('<path d="M0 210H600M0 370H600M0 530H600M150 150V830M320 150V830M480 150V830" stroke="#39424a" stroke-width="3"/><ellipse cx="300" cy="615" rx="125" ry="70" fill="#161b21" stroke="#b5b7b7" stroke-width="8"/><ellipse cx="300" cy="615" rx="54" ry="30" fill="#08090b"/><path d="M100 275 Q380 300 285 580" fill="none" stroke="#a24020" stroke-width="56"/><path d="M300 120v90h100" stroke="#eee" stroke-width="20" fill="none"/><path d="M360 240l-30 90m55-90l-15 100m40-100v100" stroke="#acbdc8" stroke-width="5"/>','PSICOSE','1960 · ALFRED HITCHCOCK','#bc422a'),
 'halloween':('<path d="M175 210Q300 125 425 210L443 475Q410 650 300 692Q190 650 157 475Z" fill="#d6d8cc"/><path d="M182 210Q300 100 424 210L438 310L390 260Q300 230 180 295Z" fill="#151716"/><ellipse cx="232" cy="365" rx="43" ry="27" fill="#080b0b"/><ellipse cx="369" cy="365" rx="43" ry="27" fill="#080b0b"/><path d="M300 360l-25 120h48M256 550q44-15 90 0" stroke="#72796e" stroke-width="13" fill="none"/><path d="M180 560Q300 760 420 560L520 900H80Z" fill="#15242a"/>','HALLOWEEN','1978 · JOHN CARPENTER','#ef8e37'),
 'exorcist':('<path d="M50 900V120H550V900" fill="#111e2c"/><path d="M330 170h170v300H330Z" fill="#b2d9c6"/><path d="M415 170v300M330 320h170" stroke="#192b30" stroke-width="14"/><path d="M330 470L40 900H570L500 470Z" fill="url(#light)"/><path d="M180 750q-30-180 40-200q70 20 40 200l45 150H135Z" fill="#03080c"/><ellipse cx="220" cy="520" rx="35" ry="44" fill="#03080c"/><path d="M155 502h130l-25-27h-80Z" fill="#03080c"/><path d="M95 870h440M120 835h390M145 800h340" stroke="#456058" stroke-width="5"/>','O EXORCISTA','1973 · WILLIAM FRIEDKIN','#b0debb')}
 for key,(drawing,title,sub,color) in art.items():
  svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><defs><linearGradient id="light" x2="0" y2="1"><stop stop-color="#bdedcf" stop-opacity=".6"/><stop offset="1" stop-color="#a1c3c0" stop-opacity="0"/></linearGradient></defs><rect width="600" height="900" fill="#080d12"/>{drawing}<rect y="0" width="600" height="145" fill="#080d12"/><text x="300" y="72" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="48" fill="{color}">{title}</text><text x="300" y="110" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#ddd">{sub}</text><rect y="855" width="600" height="45" fill="#080d12"/><text x="300" y="882" text-anchor="middle" font-family="sans-serif" font-size="15" fill="#a2a8ab">ARTE ORIGINAL · RELEITURA ILUSTRADA</text></svg>'''
  (ROOT/f'public/posters/{key}.svg').write_text(svg)
def probe(path):
 return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(path)],text=True))
async def voice(s,preview):
 key,text,*_=s;path=ROOT/f'public/audio/{key}.mp3';meta=path.with_suffix('.json')
 if preview:
  words=text.split();dur=len(words)/2.8
  return dur,[{'text':' '+w,'startMs':i*dur/len(words)*1000,'endMs':(i+1)*dur/len(words)*1000,'timestampMs':None,'confidence':None} for i,w in enumerate(words)]
 import truststore
 truststore.inject_into_ssl()
 import edge_tts
 if not path.exists() or not meta.exists():
  captions=[]
  try:
   communicate=edge_tts.Communicate(text,'pt-BR-AntonioNeural',rate='+8%',pitch='-2Hz',boundary='WordBoundary',proxy=os.environ.get('HTTPS_PROXY') or os.environ.get('https_proxy'))
   with path.with_suffix('.tmp').open('wb') as audio:
    async for chunk in communicate.stream():
     if chunk['type']=='audio':audio.write(chunk['data'])
     elif chunk['type']=='WordBoundary':captions.append({'text':' '+chunk['text'],'startMs':chunk['offset']/10000,'endMs':(chunk['offset']+chunk['duration'])/10000,'timestampMs':None,'confidence':None})
   if not captions:raise RuntimeError('Nenhum tempo de palavra recebido.')
   path.with_suffix('.tmp').replace(path);meta.write_text(json.dumps(captions,ensure_ascii=False))
  except Exception as e:
   path.with_suffix('.tmp').unlink(missing_ok=True)
   raise RuntimeError('Narração indisponível. Verifique a conexão com speech.platform.bing.com e execute novamente. Nenhum render final sem voz será autorizado.') from e
 return probe(path),json.loads(meta.read_text())
async def main():
 preview=argparse.ArgumentParser();preview.add_argument('--preview',action='store_true');args=preview.parse_args()
 posters();scenes=[];start=0
 for s in SCENES:
  dur,captions=await voice(s,args.preview);frames=math.ceil((dur+.4)*FPS)
  scenes.append(dict(id=s[0],text=s[1],title=s[2],label=s[3],poster=s[4],start=start,frames=frames,voice=None if args.preview else f'audio/{s[0]}.mp3',captions=captions));start+=frames
 sound_assets(start/FPS)
 (ROOT/'src/timeline.json').write_text(json.dumps(dict(fps=FPS,totalFrames=start,preview=args.preview,scenes=scenes),ensure_ascii=False,indent=2))
 print(f'Preparado: {start/FPS:.1f}s. '+('PRÉVIA SEM VOZ; execute npm run prepare:media antes do render.' if args.preview else 'Voz, trilha e efeitos prontos.'))
if __name__=='__main__':asyncio.run(main())
