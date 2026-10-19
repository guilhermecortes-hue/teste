# Validação no ambiente cloud

- Dependências Node instaladas com `npm ci`; ambiente Python `.venv` e `edge-tts==7.3.1` instalados.
- `npm run lint`, `npm run check` e `npm run build`: aprovados.
- `scripts/prepare.py`: compilação Python aprovada; proxy HTTPS do ambiente configurado explicitamente para Edge TTS.
- Studio iniciado na porta 3001 e resposta HTML verificada.
- Chromium do sistema enumerou a composição principal e as cinco cenas em 1080×1920, 30 fps.
- Renderizadas e inspecionadas imagens das cinco cenas e a capa. As imagens ainda exibem `PRÉVIA VISUAL · NARRAÇÃO A GERAR`.
- Ajustado o componente de legendas para manter o bloco visível entre palavras, evitando piscadas nos intervalos de metadados do TTS.
- `scripts/check.mjs` recusou corretamente a timeline `preview:true` sem narração. Essa recusa é esperada e protege a exportação final.

## Pendente

O proxy de saída do ambiente recusou o acesso a `speech.platform.bing.com` com HTTP 403 antes da conexão com o serviço. O domínio foi acrescentado ao rascunho de rede do ambiente; salvar o rascunho não aplica a regra à máquina atual. É necessário salvar e publicar a configuração pelo produto e retomar a preparação.

Nenhum MP4 final foi produzido ou validado, e nenhuma mixagem final narrada foi ouvida. Após a liberação, executar `.venv/bin/python scripts/prepare.py`, confirmar `preview:false`, gerar novamente as imagens com a timeline real e então executar `npm run render -- --concurrency=2 --x264-preset=fast` e `npm run cover`. Validar as vozes, legendas, duração e mistura do MP4 antes da entrega final.
