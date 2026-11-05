#!/usr/bin/env bash
set -euo pipefail

DESTINO="${LANDING_DESTINO:-/var/www/asaladosbuscadores-landing}"
cd "$(dirname "$0")/.."

if [ ! -f out/index.html ]; then
  echo "out/index.html não existe: rode npm run build antes de publicar."
  exit 1
fi

mkdir -p "$DESTINO"
rsync -a --delete out/ "$DESTINO/"
echo "Landing publicada em $DESTINO"
