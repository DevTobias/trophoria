#! Install dependencies and build project
FROM debian:11.6-slim as builder
WORKDIR /build
ENV NODE_ENV=production

# Install system dependencies
RUN apt update
RUN apt install curl unzip -y
RUN curl https://bun.sh/install | bash

# Copy all package metadata
COPY package.json .
COPY bun.lockb .

# Install all dependencies
RUN /root/.bun/bin/bun install --frozen-lockfile --production

# Build the project
COPY tsconfig.json .
COPY src src
RUN /root/.bun/bin/bun build src/index.ts --outdir ./out --minify

#! Copy build outputs and start server
FROM gcr.io/distroless/base
WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /build/out/index.js .

ENV NODE_ENV=production
CMD ["./bun", "index.js"]

EXPOSE 8080
