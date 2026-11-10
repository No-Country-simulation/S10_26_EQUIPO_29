# Contexto de construcción: raíz del repositorio.
# Aprovecha la exportación estática de Next.js (output: 'export' -> dist/client).
FROM node:24-slim AS builder

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json frontend/.npmrc /app/frontend/
RUN cd /app/frontend && npm ci

COPY shared /app/shared
COPY frontend /app/frontend

# Variables públicas embebidas en tiempo de compilación (Railway las inyecta como build args).
ARG NEXT_PUBLIC_CATALOG_API_BASE_URL=""
ARG NEXT_PUBLIC_ASSISTANT_API_BASE_URL=""
ARG NEXT_PUBLIC_MOCK_MODE=false

ENV NEXT_PUBLIC_CATALOG_API_BASE_URL=${NEXT_PUBLIC_CATALOG_API_BASE_URL} \
    NEXT_PUBLIC_ASSISTANT_API_BASE_URL=${NEXT_PUBLIC_ASSISTANT_API_BASE_URL} \
    NEXT_PUBLIC_MOCK_MODE=${NEXT_PUBLIC_MOCK_MODE}

RUN cd /app/frontend && npm run build

FROM node:24-slim AS runner

WORKDIR /app/frontend
ENV NODE_ENV=production \
    HOST=0.0.0.0

COPY --from=builder /app/frontend/package.json ./package.json
COPY --from=builder /app/frontend/scripts/serve-preview.mjs ./scripts/serve-preview.mjs
COPY --from=builder /app/frontend/dist/client ./dist/client

USER node

EXPOSE 4173
CMD ["node", "scripts/serve-preview.mjs", "dist/client"]
