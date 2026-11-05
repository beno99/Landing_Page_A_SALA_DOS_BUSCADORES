# Landing · Seção "Leituras selecionadas" (cards com imagem viva embaixo)

Prompt para redesenhar a seção "Leituras para começar sua jornada." **da landing page** (este projeto, `~/Desktop/LP_Pasta/Sala-do-Buscador`; não é o portal). As quatro imagens são geradas pelo usuário com `docs/leituras-imagens.md`, seguindo `docs/linha-visual-imagens.md`.

## Antes de começar: skills e leitura

1. `emil-design-eng`: polimento e decisões de animação.
2. `ui-ux-pro-max`: layout, hierarquia, acessibilidade e responsivo.
3. `apple-design`: mola interrompível, resposta ao ponteiro, `prefers-reduced-motion`.
4. Ao final, `review-animations` ou `improve-animations` para auditar o movimento.

Leia o `AGENTS.md` deste projeto (o Next desta versão tem mudanças: consulte `node_modules/next/dist/docs/`) e `docs/proposta-portal.md`, que mostra como a seção vizinha foi feita. Arquivos envolvidos: `components/scenes/Trilhas.tsx`, `components/ui/StepCard.tsx`, `content/site.ts` (bloco `trilhas`), `content/types.ts` (tipo `Step`), `components/scenes/trilhas.test.tsx` e as cores de `app/globals.css` (`--color-ink`, `--color-cream`, `--color-graphite`, `--color-text-3`…). Nada de hex solto no componente.

**Referência:** https://hermes-agent.nousresearch.com/, seção "Features". Abra em 1440 px e observe a ordem de cada card (texto em cima, imagem embaixo) e o movimento da imagem. Use a referência para estrutura e movimento, sem copiar fontes, textos nem imagens. O que já foi medido nela:

- A imagem fica numa placa (`figure`) de altura fixa, quase quadrada, com `overflow: clip` e cantos levemente arredondados.
- A imagem é **bem mais alta que a placa** (~627 px para 320) e desliza no eixo Y com a rolagem: `--py-img` vai de cerca de −32 px a 0 e vira `translate: 0 calc(var(--py-img) * 2)`. É um parallax.
- Por cima há uma camada de grão (`::after` com SVG `feTurbulence`, `fractalNoise`, `baseFrequency 0.72`).

## Decisões (não reabrir)

1. **Textos: exatamente os de hoje.** Rótulo "Leituras selecionadas", título "Leituras para começar / sua jornada.", nota "Encontre um ponto de partida e avance por leituras selecionadas pela Curadoria." e, em cada card, numeral, título, "Artigo · na Sala Corpus Hermeticum" e "Começar a leitura ↗". **Não acrescente descrição nem nenhum outro texto.**
2. **Card:** o texto continua em cima, como está (numeral, título, meta, link), e a **placa de imagem entra embaixo**, na largura da coluna, quase quadrada (aceite 4:5 se couber melhor na altura da tela). O card inteiro continua um único link para `step.href`, com foco visível.
3. **Entrada da seção:** mantenha a subida em escada que já existe (colunas entrando por baixo, filetes verticais se desenhando).
4. **Imagens:** fotografias realistas, em cor, usadas como chegam (sem pontilhado, sem filtro de cor), na mesma linha das fotos da seção Proposta. Campo novo `image` no tipo `Step`, apontando para `/images/leituras/01-hermetismo.webp`, `02-poimandres.webp`, `03-sete-esferas.webp` e `04-asclepio.webp`. O fundo da placa é `--color-graphite`, que se funde com o fundo escuro das fotos.
5. **Parallax:** a imagem (2:3) cobre a largura da placa e fica ~1,6× mais alta que ela. O deslocamento vertical vem do **progresso da própria cena** (`progress` do `SceneTrack`), porque a seção fica fixa enquanto rola. Percorre a sobra da imagem durante a janela em que o card está na tela.
6. **Mouse:** ao passar o mouse pela placa, a imagem acompanha o ponteiro em sentido oposto, no máximo ~10 px em X e Y, com leve escala (1 → 1,04). Use `useMotionValue` + `useSpring` do motion: o movimento é interrompível e volta ao centro com mola ao sair. Soma-se ao parallax. Só liga com `(hover: hover) and (pointer: fine)`.
7. **Grão:** `::after` com `feTurbulence` em opacidade baixa e `pointer-events: none`, percebido de perto sem sujar a pintura.
8. **Celular e tablet (< 1024 px):** a lista vertical atual ganha a placa (4:3, largura total) embaixo do texto de cada item. Parallax pela cena, sem efeito de mouse.
9. **`prefers-reduced-motion`:** sem parallax, sem acompanhar o mouse; imagem parada e centrada.

Se as imagens ainda não existirem quando você começar, deixe a placa só com o fundo grafite e o grão e avise o usuário. Nunca use imagem provisória de outra origem. Acrescente as quatro em `scripts/check-assets.mjs`, se ele listar os assets esperados.

## Desempenho e acessibilidade

- Anime só `transform` e `opacity`; `will-change` apenas enquanto o mouse estiver sobre a placa.
- `loading="lazy"`, `decoding="async"` e `sizes` coerente com a coluna; pré-carregue as quatro quando a seção se aproximar da tela.
- Imagens decorativas (`alt=""`): o título já diz tudo.

## Pronto quando

- Capturas em 1440, 1024 e 375 px (`npm run shot`) lado a lado com a referência, com a placa viva: parallax na rolagem e imagem seguindo o mouse sem engasgar, inclusive ao passar de um card para o vizinho.
- `prefers-reduced-motion` testado.
- `npm test`, `npm run lint` e `npm run check:assets` passam; `npm run e2e` se tocar em algo coberto.
- Relatório final com as capturas e o que ficou pendente (por exemplo, imagens que ainda não chegaram).
