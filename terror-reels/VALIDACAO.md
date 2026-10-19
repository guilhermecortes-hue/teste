# Validação da entrega final

- Instalação com `npm ci` e dependências Python em `.venv` concluída.
- `npm run lint`, `npm run check` e `npm run build`: aprovados.
- Studio iniciado na porta 3001 e resposta HTML verificada; Chromium do sistema configurado para o render.
- Narração das cinco cenas gerada com `pt-BR-AntonioNeural` via Edge TTS. O proxy HTTPS e os certificados do sistema são usados com `truststore==0.10.5`; verificação TLS mantida ativa.
- Timeline `preview:false`: 1.021 frames a 30 fps, 34,033 segundos de vídeo. Os 76 tempos de palavras correspondem integralmente às cinco falas e estão ordenados, sem sobreposição e dentro dos limites de áudio/cena.
- Os cinco MP3s decodificam sem erros; nenhuma fala ou palavra truncada identificada na conferência dos tempos. Os intervalos após as falas acomodam o respiro e o efeito de transição.
- Imagens das cinco cenas e capa renderizadas com a timeline real e inspecionadas. Sem a marca de prévia; títulos, cartazes e legendas enquadrados em 1080×1920.
- `scripts/check.mjs`: aprovado com vozes e legendas presentes.
- `npm run render -- --concurrency=2 --x264-preset=fast` e `npm run cover`: concluídos.
- MP4 confirmado por ffprobe: vídeo H.264, 1080×1920, 30 fps, 1.021 frames; áudio AAC, estéreo, 48 kHz; duração do contêiner 34,048 s.
- FFmpeg decodificou o arquivo completo, incluindo áudio e vídeo, sem erros.
- Mistura medida: -17,85 LUFS integrados, pico verdadeiro -3,45 dBTP e faixa de loudness 2,5 LU, sem saturação detectada. Não foi aplicada normalização adicional.

Arquivos de entrega: `../entregas/terror-reels.mp4` e `../entregas/terror-reels-capa.png`. Os áudios e metadados gerados permanecem no projeto para reproduzir a exportação sem nova chamada ao serviço de voz.
