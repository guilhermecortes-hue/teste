# ARQUIVO DO MEDO — Reels em Remotion

Projeto com código completo, roteiro, cartazes de divulgação de Psicose, Halloween e O Exorcista, fonte local, trilha de suspense e efeitos WAV originais. A narração brasileira e as legendas palavra a palavra são geradas automaticamente no ambiente de execução.

**Comece pelo PROMPT-CODEX.md:** envie a pasta ou este ZIP ao Codex, peça para extrair e seguir esse arquivo.

## Rodar
Requer Node 22.13+ ou 24, Python 3.10+, FFmpeg e ffprobe no PATH. A instalação e a geração de voz precisam de internet. Não requer chave de API. Edge TTS usa serviço externo e sua disponibilidade não é garantida.

```bash
npm ci
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
npm run prepare:media
npm run check
npm run dev
```
No Windows, ative com `.venv\Scripts\activate` e, se necessário, troque `python3` por `python` nos scripts do package.json. Instale FFmpeg e inclua sua pasta bin no PATH.

Após revisar o Studio:
```bash
npm run render
npm run cover
```
Saídas: `out/terror-reels.mp4` (H.264/AAC, 1080×1920, 30fps) e `out/capa.png`.

## O que já está incluído
- `src/Root.tsx`: sequência principal e cinco cenas acessíveis no Studio.
- `src/Scene.tsx`: animações determinísticas por frame, composição visual, legendas e som.
- `src/scenes/`: entrada de cada cena.
- `scripts/prepare.py`: roteiro editável, geração TTS, sincronização, síntese musical e artes SVG.
- `public/posters/`: três cartazes em JPEG, usados nas cenas individuais, abertura e encerramento. As fontes estão em `FONTES.md`. Os SVGs da versão ilustrada anterior foram preservados, mas não aparecem no vídeo atual.
- `public/audio/`: trilha, impacto, whoosh e tick. O tick está disponível como recurso opcional; a montagem usa impacto e whoosh.
- `public/font.ttf`: DejaVu Sans Bold e licença anexa.
- `src/timeline.json`: dados de cena; gerados automaticamente.
- `ROTEIRO.md`, `FONTES.md`, `PROMPT-CODEX.md`.

## Estado da entrega
Vídeo final gerado e validado: **34 segundos, 1080×1920, 30 fps, H.264/AAC**, com narração brasileira, legendas sincronizadas, trilha e efeitos. O MP4 e a capa estão em [`../entregas/`](../entregas/README.md). A timeline está em `preview:false`; os cinco MP3 e seus tempos reais de palavras acompanham o projeto, permitindo renderizar novamente sem gerar voz pela rede. `npm run render` continua recusando timelines de prévia sem narração.

A geração de novas falas usa `speech.platform.bing.com`, o proxy HTTPS do ambiente e os certificados confiáveis do sistema por meio de `truststore`, mantendo a verificação TLS ativa. Os bloqueios iniciais de rede e confiança foram resolvidos. Para exportar nesta máquina, use `npm run render -- --concurrency=2 --x264-preset=fast`.

A duração inicial de prévia é aproximadamente 29 segundos. A versão narrada atual tem 34 segundos, dimensionados pela duração real de cada MP3, sem cortar falas ou acelerar artificialmente o áudio.

## Editar
Altere as falas em `SCENES` de `scripts/prepare.py`. Ao trocar uma fala, remova APENAS o MP3 e JSON correspondentes em `public/audio/` para invalidar o cache e execute novamente a preparação. Para trocar voz, altere `pt-BR-AntonioNeural`; invalide os cinco pares MP3/JSON. Edite títulos e rótulos no mesmo array.

O vídeo atual usa `psycho.jpg`, `halloween.jpg` e `exorcist.jpg` em `public/posters/`. A preparação de mídia pode recriar os SVGs antigos, mas não altera esses JPEGs e não os substitui no render. As legendas têm espaçamento explícito de 18 px entre palavras e 14 px entre linhas, com preenchimento interno em cada destaque.

A trilha utiliza drone grave, pulso a 96 BPM e motivo de sintetizador original. A mixagem deixa o fundo a 23% do volume e os impactos a 40%. Confira o volume percebido no MP4 antes de publicar.

## Conceito de retenção
Gancho na primeira fala, três revelações reconhecíveis, mudança de cor e cartaz por tema, palavras ativas em destaque e CTA de resposta simples. Esse desenho busca retenção e comentários; não garante alcance ou viralização.
