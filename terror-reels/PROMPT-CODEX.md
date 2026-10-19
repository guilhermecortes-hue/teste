Abra este projeto Remotion e gere o Reels completo, não apenas uma explicação.

1. Leia README.md, ROTEIRO.md e FONTES.md. Preserve o conceito, a veracidade dos três fatos e os pôsteres ilustrados originais incluídos.
2. Use Node 22.13+ ou 24, Python 3.10+ e FFmpeg/ffprobe. Instale as dependências com npm ci. Crie um ambiente Python com python3 -m venv .venv; instale requirements.txt nele e ative-o. Não desative verificação TLS para resolver problemas de rede.
3. Execute npm run prepare:media. Esse comando deve gerar a voz pt-BR-AntonioNeural, os tempos reais das palavras, ajustar a duração de cada cena e regenerar a trilha. Exige acesso à internet para o serviço de voz. Se houver erro, diagnostique e informe; não exporte um vídeo final silencioso e não invente que a narração foi criada.
4. Execute npm run check. Abra npm run dev para revisar o Studio. Confira as cinco cenas em 1080x1920 e os limites da interface do Reels. Os arquivos src/scenes permitem rever cada cena separadamente.
5. Faça imagens de verificação no meio de cada cena usando remotion still e os intervalos em src/timeline.json. Confira cortes, palavras longas e posição dos pôsteres. Ajuste somente se necessário.
6. Ouça a narração e a mistura: voz inteligível à frente, trilha baixa, impactos curtos e sem saturação. Preserve o suspense sem gritos estridentes. A trilha é original gerada por síntese, não uma música dos filmes.
7. Execute npm run render e npm run cover. Entregue out/terror-reels.mp4, out/capa.png e uma breve confirmação dos testes. O vídeo deve conter narração, legendas sincronizadas, trilha, efeitos, imagens e animações; nunca entregue a composição de prévia como final.
8. Não use serviços pagos automaticamente, não publique em redes sociais e não substitua as artes por cenas gráficas. Se o ambiente impedir voz ou render, descreva a limitação concreta e preserve o projeto funcional.

Direção: Reels de curiosidades de terror em português brasileiro, cerca de 30–40 segundos conforme o TTS; ritmo ágil; visual editorial escuro com acentos verde ácido, laranja e azul frio; tipografia grande; zoom lento nos cartazes, leves rotações, impactos na troca de assunto e legendas em blocos de três palavras com destaque da palavra ativa. O gancho é “O terror te enganou”. O final pede comentário 1/2/3 e incentiva replay. Não prometer viralização.
