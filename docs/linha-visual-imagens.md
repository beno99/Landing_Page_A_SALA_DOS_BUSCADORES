# Linha visual das imagens da landing

Definida em 04/11/2026. **Toda imagem da landing é fotografia realista**: nada de pintura, ilustração ou render. A base é o conjunto aprovado da seção Proposta (`public/images/proposta/`, prompts em `Portal_Sala_Buscadores/docs/prompts/landing-proposta-gravuras.md`): fotos escuras de acervo, com uma luz quente de janela, fundo grafite e bordô só em couro e tecido. A referência de Hermes Trismegisto enviada pelo usuário entra pelo **assunto e pela composição**: o sábio ancião de barba branca em figura de três quartos, recortado contra o escuro, o códice, a esfera armilar, as mãos.

## Constantes (iguais em todas as imagens)

- **Formato do prompt:** parágrafos do Nano Banana (`CAMERA:`, `LENS:`, `LIGHT:`, `SUBJECT:`, `FOREGROUND:`, `MIDGROUND:`, `BACKGROUND:`, `WARDROBE TONAL BEHAVIOR:` quando houver pessoa, `POST BEHAVIOR:`, `COMPOSITIONAL GEOMETRY:`, `MOOD & ART DIRECTION:`), em inglês, até 1.500 caracteres. Sem markdown dentro do prompt.
- **Câmera:** IMAX MK IV 65mm (ISO 250) para cenas calmas e objetos; ARRI Alexa 35 (ISO 800) só se houver gesto. Lentes conforme `~/.claude/skills/human-image/reference/imageprompts.md`.
- **Luz (assinatura):** uma única luz suave de janela a ~4.300K, vinda do alto à esquerda, sem fill. Sombras profundas em grafite, mas com meios-tons preservados (nada de preto chapado onde há assunto).
- **Paleta:** nogueira escura, pedra, pergaminho e osso, couro e lã **bordô** (`oxblood`) como única cor forte, **latão** antigo em pequenos brilhos. Nada de azul ou roxo.
- **Pós:** `65mm film grain structure` (ou `35mm` com a Alexa), grão visível e orgânico, pretos profundos, meios-tons quentes e contidos, saturação baixa.
- **Última linha de todo prompt:** `MOOD & ART DIRECTION: Composition and art direction inspired in the work of award-winning directors.`

## O que fica de fora (marca)

Da referência saem a coroa de estrelas, os planetas, o céu estrelado, a esfera que brilha e os glifos dourados no manto. Proibido em qualquer imagem: símbolos de tradições (cruz, estrela de Davi, crescente, om, yin-yang, lótus, olho, glifos de planetas ou do zodíaco, caduceu), cristais, mandalas, lua, estrelas, velas, fumaça, halos, raios de luz, objetos que brilham, roxo, texto legível, rosto em close (rosto só em figura de meio corpo ou mais aberta), estética de fantasia ou de fantasia de mago.

## Bloco negativo comum

```
painting, oil painting, illustration, drawing, 3D render, CGI, anime, fantasy art, crown of stars, stars, planets, moon, night sky, cosmos, glowing orb, glow, halo, aura, light rays, sparkles, candle, flame, smoke, crystal, mandala, cross, star of David, crescent, om, yin yang, lotus, eye symbol, caduceus, zodiac or planet glyphs, golden glyphs on clothing, wizard costume, readable text, letters, numbers, logo, watermark, blue, purple, violet, neon, close-up face
```

## Composição por seção

- **Proposta (pronta):** topo e terço inferior calmos e escuros, porque o texto fica por cima da imagem.
- **Leituras selecionadas:** a imagem fica **embaixo** do texto, numa placa quase quadrada, e desliza com a rolagem e o mouse. O quadro 2:3 vertical precisa ter detalhe de cima a baixo, sem faixas vazias, com o assunto no eixo central.
