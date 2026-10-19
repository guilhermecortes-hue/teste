# ARQUIVO DO MEDO — Reels em Remotion

Projeto com código completo, roteiro, 3 pôsteres SVG ilustrados originais, fonte local, trilha de suspense e efeitos WAV originais. A narração brasileira e as legendas palavra a palavra são geradas automaticamente no ambiente de execução.

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
- `public/posters/`: três releituras ilustradas, identificadas como arte original; não são os cartazes oficiais nem fotografias dos filmes.
- `public/audio/`: trilha, impacto, whoosh e tick. O tick está disponível como recurso opcional; a montagem usa impacto e whoosh.
- `public/font.ttf`: DejaVu Sans Bold e licença anexa.
- `src/timeline.json`: dados de cena; gerados automaticamente.
- `ROTEIRO.md`, `FONTES.md`, `PROMPT-CODEX.md`.

## Estado da entrega
Os WAVs, SVGs e a fonte já acompanham o pacote. A timeline incluída é uma **prévia visual sem voz**, claramente identificada na tela. A instalação, o Studio e as imagens das cinco cenas foram validados no ambiente cloud. A narração está pendente porque o proxy de rede recusa o acesso a `speech.platform.bing.com` com HTTP 403. O domínio foi acrescentado ao rascunho de configuração; a liberação precisa ser salva e publicada no produto. Depois execute `npm run prepare:media` para criar os MP3 e os tempos reais. `npm run render` recusa uma timeline de prévia: não há exportação final silenciosa por engano.

A duração inicial de prévia é aproximadamente 29 segundos. A versão narrada é dimensionada pela duração real de cada MP3, normalmente cerca de 30–40 segundos, sem cortar falas ou acelerar artificialmente o áudio.

## Editar
Altere as falas em `SCENES` de `scripts/prepare.py`. Ao trocar uma fala, remova APENAS o MP3 e JSON correspondentes em `public/audio/` para invalidar o cache e execute novamente a preparação. Para trocar voz, altere `pt-BR-AntonioNeural`; invalide os cinco pares MP3/JSON. Edite títulos e rótulos no mesmo array.

Para usar pôsteres oficiais que você já tenha, troque os SVGs por suas imagens e ajuste a extensão em Scene.tsx. A próxima preparação recria os SVGs originais, mas não altera seus arquivos JPG/PNG.

A trilha utiliza drone grave, pulso a 96 BPM e motivo de sintetizador original. A mixagem deixa o fundo a 23% do volume e os impactos a 40%. Confira o volume percebido no MP4 antes de publicar.

## Conceito de retenção
Gancho na primeira fala, três revelações reconhecíveis, mudança de cor e cartaz por tema, palavras ativas em destaque e CTA de resposta simples. Esse desenho busca retenção e comentários; não garante alcance ou viralização.
