# Vídeos para YouTube

Projeto Remotion em **1920 × 1080 (16:9), 30 fps**. O exemplo tem 10 segundos e não usa mídia externa.

## Desenvolver

Requer Node.js 22 ou 24 e npm.

```sh
cd /workspace/teste/youtube
npm ci
npm run dev
```

No ambiente em nuvem, use `npm_config_cache=/workspace/.npm-cache npm ci` se o diretório padrão de cache não permitir escrita.

Selecione `YoutubeHorizontal` no Remotion Studio. Edite `src/Composition.tsx` para trocar o título, as cores e a animação. Coloque imagens, áudios e vídeos em `public/` e use `staticFile()` para acessá-los. Altere duração, resolução e fps na composição do mesmo arquivo.

## Validar

```sh
npm run lint
npm run build
```

## Exportar MP4

```sh
npm run render
```

O resultado fica em `out/youtube.mp4` (H.264). No ambiente preparado, o Remotion usa `/usr/bin/chromium`. Em outras máquinas, a primeira exportação pode precisar baixar o navegador do Remotion e instalar suas bibliotecas de sistema. O projeto inicial não inclui trilha sonora ou narração.

## Animação de calendário

Selecione **Calendario** no Studio: 10 segundos, 1920×1080, 30 fps, fundo roxo. O calendário começa em outubro de 2021, passa por todos os meses e encerra em outubro de 2026. Código em `src/Calendar.tsx`. Sem áudio.

Para exportar essa composição quando desejar:

```sh
npx remotion render src/index.ts Calendario out/calendario.mp4
```

O comando `npm run render` continua exportando a abertura `YoutubeHorizontal`.
