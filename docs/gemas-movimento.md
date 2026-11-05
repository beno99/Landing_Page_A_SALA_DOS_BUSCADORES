# Movimento das Gemas de Conhecimento

A LP usa uma adaptação local do renderizador `solid-orb.js` da biblioteca Conquista 1.1 do Portal. O Portal não foi alterado e não é uma dependência em tempo de execução. Referência: gravação enviada em 04/11/2026 às 20:43:27.

Três camadas minerais giram dentro de uma casca de vidro com reflexos estáveis. Pontos luminosos acompanham o volume em profundidades diferentes. Uma volta leva aproximadamente 36 segundos. A inclinação suave dos cards continua respondendo ao mouse com mola, apenas com ponteiro fino.

Ao passar o mouse sobre um card, a gema sobe 10 px e aumenta 8%, com uma sombra suave na superfície abaixo dela. Os outros cards ficam com 50% de opacidade. Ao sair, todos retornam ao estado original; os espaços entre cards não mantêm o destaque ativo. Em movimento reduzido, permanecem apenas as mudanças de opacidade, sem elevação nem escala. Em telas de toque, esse efeito de hover não é aplicado.

As paletas foram ajustadas a partir das imagens originais da LP:

| Gema | Pigmentos |
| --- | --- |
| Fluorita | Verde mineral e violeta |
| Esmeralda | Verde profundo com luz verde clara |
| Quartzo Rosa | Rosa suave, leitoso e ligeiramente quente |
| Pedra da Lua | Branco perolado, cinza azulado e reflexos azulados |
| Espinélio | Vermelho carmim, reflexos rosados e profundidade vinho |

Os 15 pigmentos estão em `app/globals.css`, em `:root`, pois o shader os lê em tempo de execução. Mantê-los fora do bloco `@theme` evita que o Tailwind remova variáveis sem referência estática em utilitários.

## Revisão de movimento — review-animations

| Before | After | Why |
| --- | --- | --- |
| Uma cópia da foto se deslocava dentro de uma máscara | Volume mineral em três camadas, com rotação interna independente do reflexo externo (`lib/gem-renderer.ts`) | Reproduz o movimento mostrado na gravação |
| Cada textura tinha um ciclo CSS | Relógio compartilhado limitado a 30 fps, pausa fora da tela e na aba oculta (`lib/gem-clock.ts`, `components/ui/GemOrb.tsx`) | Evita trabalho contínuo sem visibilidade |
| Foto fixa quando movimento reduzido estava ativo | Uma renderização estática da mesma esfera, sem loop | Preserva a aparência e respeita a preferência de acessibilidade |
| Aparência dependia apenas da imagem | Imagem original permanece como fallback; contexto WebGL pode ser recuperado | Evita gemas vazias em dispositivos sem WebGL ou após perda de contexto |
| Apenas o card se inclinava | A gema se eleva em 240 ms e uma sombra estática aparece por opacidade em 220 ms (`GemOrb.module.css`) | Dá profundidade sem animar blur ou alterar layout |
| Todas as gemas tinham a mesma ênfase no hover | Cards vizinhos passam a 50% de opacidade em 220 ms (`Jornada.module.css`) | Destaca a gema sob o ponteiro, com transições interrompíveis e sem estado React adicional |

**Approve — revisão estática.** O loop decorativo solicitado tem baixa velocidade, não altera layout e usa GPU. O canvas limita a resolução a DPR 1,5, pula pixels transparentes e só carrega o renderizador ao entrar na tela. O hover existente usa transform e mola interrompível. A aprovação visual de fluidez permanece pendente: não foi possível abrir um navegador neste ambiente.

## Verificação

- `npm test`: 106 testes passaram, incluindo cinco testes de ciclo de vida das esferas.
- `npx tsc --noEmit`: passou.
- ESLint dos arquivos alterados nesta tarefa: passou.
- Compilação do CSS: os 15 pigmentos foram preservados.
- `npm run lint`: erro fora desta alteração em `components/ui/RevealSection.tsx:15` (`set-state-in-effect`).
- `npm run check:assets`: imagem sem uso fora desta alteração, `/images/acervo/enoque.png`.
- Capturas e avaliação de FPS pendentes: Chromium esperado pelo Playwright não está instalado; o acesso ao navegador pela ferramenta de interface também está indisponível.

Nenhum commit foi feito.
