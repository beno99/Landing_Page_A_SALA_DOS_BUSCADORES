# A proposta do Portal — refatoração de 04/11/2026

Direção: versão final `realistas-v2` de `Portal_Sala_Buscadores/docs/prompts/landing-proposta-gravuras.md`, com a composição aprovada em `landing-proposta.md`. Os seis WebP foram copiados sem alteração de `Portal_Sala_Buscadores/portal/public/landing/proposta/` e conferidos por SHA-256.

A seção usa fundo grafite, texto bege, introdução à esquerda e três colunas fechadas inicialmente. No desktop, foco por teclado abre imediatamente e o hover aguarda 100 ms; Escape fecha sem deslocar o foco. No celular, toque alterna um único painel. Ao mudar entre desktop e celular, a seleção é reiniciada. As fontes de imagem mudam por `<picture>`; um IntersectionObserver antecipa o carregamento quando a seção se aproxima da tela.

Ajuste após a referência enviada às 16h06: fundo sólido `#2e2b28`, amostrado da captura. A introdução ocupa 40% da composição no desktop, com título e descrição agrupados no centro vertical da área abaixo do rótulo. As divisórias percorrem toda a altura da seção; no celular, o bloco editorial segue acima dos painéis, sem altura mínima de tela.

Correção após a captura das 16h14: o cosmos sticky anterior se sobrepunha à seção sem posicionamento, ocultando o fundo e o texto editorial, enquanto os painéis posicionados continuavam visíveis. A seção agora usa `position: relative` e `isolation: isolate`, agrupando fundo e conteúdo acima da cena anterior. O teste E2E de navegação passou a conferir também o elemento efetivamente visível sob título e margem lateral, além da cor sólida. Sua execução permanece pendente por indisponibilidade do navegador neste ambiente.

## Integração na LP

- `components/scenes/Curadoria.tsx`: conteúdo editorial e tema local.
- `components/ui/proposta/PropostaPanels.tsx`: painel reutilizável com botão, aria-expanded e aria-controls, seguindo a lógica do Accordion do Portal.
- `components/ui/proposta/tokens.module.css`: recorte dos tokens de movimento e tipografia do Portal, com cores e véus limitados à seção.
- `public/images/proposta/`: três fotografias verticais e três horizontais aprovadas.

A LP é um projeto separado e usa CSS Modules. A biblioteca externa do Portal e seu artefato publicado não foram modificados; não há `ds:sync` ou `npm run check` neste projeto. A validação usa os scripts existentes da LP. A implementação pode ser levada à biblioteca externa em uma tarefa própria.

As duas imagens da composição anterior foram preservadas em `/tmp/lp-proposta-original/`, sem entrar no pacote público.

## Revisão de movimento

| Antes / risco examinado | Depois / decisão | Motivo |
| --- | --- | --- |
| Passagem rápida do ponteiro abre uma coluna sem intenção | Abertura após 100 ms, com cancelamento ao sair | Evita disparos acidentais |
| Troca de coluna interrompe uma animação | Transições CSS partem do estado corrente | Permite trocar a direção durante a abertura |
| Texto aparece durante o estreitamento | Entrada após `duration-fast`; saída sem atraso | Mantém a leitura durante a redistribuição |
| Preferência por menos movimento | Distribuição instantânea, sem escala ou deslocamento, fade de 160 ms | Preserva o estado sem movimento espacial |
| Transição de layout ou duração acima de 300 ms | Flex-grow no desktop e grid-template-rows no celular, 460 ms do token aprovado | Exceção explícita do prompt para esta demonstração editorial; não anima width em pixels |

Revisão estática aprovada com as exceções explícitas do prompt. A aprovação da sensação de movimento permanece pendente da inspeção no navegador.

## Validação

- 11 testes passaram: interação da seção e consistência de conteúdo.
- TypeScript sem erros; ESLint sem avisos; checagem dos 59 assets e `git diff --check` passaram.
- Texto principal: 7,13:1; secundário: 4,81:1, calculados sobre branco puro sob véu grafite a 76%. O véu se intensifica na área inferior.
- Fontes locais de imagem conferidas contra as originais aprovadas.
- Referência estrutural consultada: [Khanh Nguyen, Chapter III](https://khanhnguyen.design/).

Pendente: capturas em 1440, 1024 e 375 px e conferência visual de movimento reduzido. O host de controle do navegador está indisponível; não foram produzidas nem alegadas capturas de validação.
