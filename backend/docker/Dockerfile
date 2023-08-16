#! Install dependencies and build project
FROM debian:bullseye-slim AS builder
WORKDIR /build
ENV NODE_ENV=production

# Install system dependencies
RUN apt update
RUN apt install curl unzip -y
RUN curl https://bun.sh/install | bash

# Copy all package metadata
COPY package.json .
COPY app/package.json app/
COPY modules/eslint-config/package.json modules/eslint-config/
COPY modules/prettier-config/package.json modules/prettier-config/
COPY modules/elysia-helmet/package.json modules/elysia-helmet/
COPY bun.lockb .

# Install all dependencies
RUN /root/.bun/bin/bun install --frozen-lockfile --production

# Build the project
COPY app app
COPY modules modules
RUN /root/.bun/bin/bun build app/src/server.ts --outdir ./out --target bun --minfy

#! Copy build outputs and start server
FROM gcr.io/distroless/base
WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /build/out/server.js .

ENV NODE_ENV=production
CMD ["./bun", "server.js"]

EXPOSE 8080
