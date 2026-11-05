# Leituras selecionadas — implementação de 04/11/2026

A landing mantém os textos de `content/site.ts`, a subida em escada e os filetes desenhados pelo progresso da cena. Cada card é um único link: numeral, título, meta, “Começar a leitura ↗” e fotografia embaixo. Nenhum arquivo do projeto Portal foi alterado.

## Imagens utilizadas

Origem: `../img_Leituras para começar/`. Redimensionamento proporcional com Sharp para 1200 × 1789 px, WebP qualidade 88; sem extração, filtro ou edição da cena. Os originais permanecem intactos.

| Card | Arquivo original | Arquivo público | Cena | Tamanho |
| --- | --- | --- | --- | --- |
| I — O que é o hermetismo | `download.webp` | `/images/leituras/01-hermetismo.webp` | Ancião de pé com códice | 197.218 bytes |
| II — Poimandres: a visão de Hermes | `download-2.webp` | `/images/leituras/02-poimandres.webp` | Ancião sentado, olhos fechados, manuscrito aberto | 102.092 bytes |
| III — As sete esferas | `download-1.webp` | `/images/leituras/03-sete-esferas.webp` | Mão sobre esfera armilar de latão | 143.770 bytes |
| IV — O Asclépio em latim | `download-3.webp` | `/images/leituras/04-asclepio.webp` | Copista transcrevendo o códice | 185.386 bytes |

O verificador de assets descobre as referências em `content/site.ts`; não possui lista fixa a atualizar.

## Composição e movimento

- Placas quadradas no desktop; 4:3 abaixo de 1024 px. Fundo `--color-graphite`, cantos de 6 px, `overflow: clip`.
- Camada de imagem em proporção 2:3, com altura mínima de 160% da placa. No mobile, a proporção original gera uma sobra maior, preservando a foto sem deformar. Margem horizontal de 12 px protege as bordas durante o acompanhamento do ponteiro.
- Parallax recebe o `MotionValue` do `SceneTrack`. No desktop usa a janela de cada entrada; no mobile mede a posição da placa na lista e a converte para o progresso da mesma cena. Não há outro `useScroll` ou listener de scroll no card.
- A lista mobile fica em fluxo normal, pois quatro imagens não cabem no antigo palco fixo de uma tela. O foco mobile não dispara o salto de progresso reservado aos cards desktop.
- Ponteiro em sentido oposto, limitado a 10 px por eixo, escala até 1,04. Molas independentes com rigidez 240, amortecimento 31 e massa 1; sem reiniciar a animação ao inverter o movimento. Só ativa em desktop com hover e ponteiro fino.
- Grão separado em `::after`, `feTurbulence`/`fractalNoise` a 0,72, opacidade 0,035, sem interceptar eventos. Não altera o arquivo da fotografia.
- Imagens decorativas, lazy e decoding async, com `sizes` correspondente à coluna. IntersectionObserver antecipa as quatro fontes responsivas perto da seção, com prioridade baixa.
- Movimento reduzido: lista e colunas em estado final, fotografia centralizada, sem parallax ou resposta ao mouse. Há proteção em JS e CSS, incluindo mudança da preferência em tempo de execução.

## Auditoria com review-animations

Aplicadas também as skills emil-design-eng, ui-ux-pro-max e apple-design. O movimento é uma apresentação editorial ocasional, solicitado no brief; não interfere no clique nem no foco por teclado.

| Before | After | Why |
| --- | --- | --- |
| Entrada utilizava propriedades abreviadas `y`, `scale`, `scaleY` | Escritas de `transform` completas e `opacity` em `Trilhas.tsx` | Restringe as propriedades animadas; não anima layout |
| Numeral entrava em escala 0,6 | Escala 0,9 → 1 no mesmo trecho da entrada | Mantém a sequência com uma mudança de tamanho mais discreta |
| Hover do numeral não distinguia toque | Movimento restrito à placa com media query e tipo de ponteiro | Evita efeito de mouse em tablet/celular |
| Adicionar imagens à lista fixa cortaria os últimos cards | Lista mobile em fluxo normal e foco nativo | Todos os links e imagens permanecem alcançáveis |
| Deslocamento do mouse poderia expor bordas | Margem lateral e reserva de 10 px nos extremos do parallax | Mantém a placa coberta durante as molas |
| Redução de movimento poderia deixar uma foto deslocada | Centro estático com cancelamento dos alvos do ponteiro | Evita saltos residuais ao trocar a preferência |

**Veredito de código: aprovado.** Transform/opacity somente; sem `transition: all`, timers de animação ou variáveis CSS atualizadas por quadro. `will-change` existe apenas enquanto a placa está sob hover permitido. As leituras de dimensões ocorrem no ResizeObserver/resize e em eventos do ponteiro, sem render React por movimento.

**Veredito visual e desempenho por quadro: pendente.** Os transforms continuam sendo conduzidos por Motion/JS; não há medição que permita afirmar ausência de engasgos. Devem ser conferidos cruzamento rápido entre cards, rolagem inversa, fontes carregadas e foco visível nos tamanhos pedidos.

## Validação e capturas

- `npm test`: 90 testes passaram em 18 arquivos. Os testes unitários cobrem conteúdo, link único, imagem decorativa, pré-carregamento, progresso da cena, limites de deslocamento, retorno da mola, toque e mudança de movimento reduzido.
- Lint, TypeScript e checagem de 63 assets passaram.
- `e2e/leituras.spec.ts` cobre 1440/1024/375 px, cobertura da placa, proporções, parallax, passagem do mouse ao vizinho e estado reduzido.
- A referência [Hermes, Features](https://hermes-agent.nousresearch.com/) foi consultada pelo conteúdo web. Sua inspeção visual em 1440 px ficou bloqueada pelo navegador indisponível; as medidas de movimento utilizadas são as fornecidas no brief.
- **Nenhuma captura foi produzida.** `npm run shot` foi tentado em 1440, 1024 e 375 px. O Chromium encerrou antes de abrir a página: `MachPortRendezvousServer: Permission denied (1100)`. Logs em `/tmp/lp-leituras-shot-{1440,1024,375}.log`.
- `npm run e2e` foi executado, mas não chegou aos testes: o servidor configurado não ficou disponível dentro de 240 segundos (`config.webServer`). Log: `/tmp/lp-leituras-e2e.log`.
- O host de controle de navegador também está indisponível. Permanecem pendentes capturas lado a lado com a referência e avaliação visual de fluidez, inclusive em movimento reduzido.

Com o servidor local aberto e o navegador liberado:

```sh
npm run shot -- trilhas 0.9 1440
npm run shot -- trilhas 0.9 1024
npm run shot -- trilhas 0.45 375
REDUCED=1 npm run shot -- trilhas 0 1440
npm run e2e
```

No mobile, fazer também capturas nos progressos 0 e 1 para inspecionar o primeiro e o último card. Não houve commit.
