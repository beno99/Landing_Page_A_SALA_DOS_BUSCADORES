# A Sala dos Buscadores · landing page

Página de apresentação do portal A Sala dos Buscadores. Next.js 16 exportado como site estático (HTML, CSS e JS), servido pelo Nginx na VPS.

## Desenvolvimento

```bash
npm install
npm run dev    # http://localhost:3111
```

## Build e checagens

```bash
npm run build         # gera out/ (site estático)
npm run lint
npm run check:assets  # confere se todas as imagens citadas existem
```

## Conteúdo

- Textos e links: `content/site.ts` (tipos em `content/types.ts`).
- Seções: `components/scenes/`.
- Estilos e tokens: `app/globals.css`.
- Imagens: `public/`.
- Vídeos da seção "Vídeos": buscados do canal no momento do build (`lib/youtube.ts`). Com `YOUTUBE_API_KEY` definida usa a API oficial; sem ela, usa o feed público do canal.

## Publicação na VPS

O workflow `.github/workflows/deploy.yml` roda a cada push na `main`, todo dia às 06:00 UTC (para atualizar os vídeos) e manualmente. Ele:

1. instala as dependências e gera `out/`;
2. copia `out/` para `/var/www/asaladosbuscadores-landing` com `deploy/publicar.sh`;
3. confere se `https://www.asaladosbuscadores.com.br/` responde.

Requisitos na VPS:

- um runner self-hosted registrado neste repositório com as labels `self-hosted` e `vps-sala`;
- `rsync` instalado e o diretório `/var/www/asaladosbuscadores-landing` gravável pelo usuário do runner;
- o vhost de `deploy/nginx-landing.conf` em `/etc/nginx/sites-available/`, ativado e com certificado HTTPS (por exemplo, `certbot --nginx -d www.asaladosbuscadores.com.br`);
- DNS de `www` apontando para a VPS.

Secret opcional no GitHub: `YOUTUBE_API_KEY`.
