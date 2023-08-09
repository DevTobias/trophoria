#! Install dependencies and build project
FROM oven/bun:latest AS builder

WORKDIR /build

# Copy all package metadata
COPY bun.lockb .
COPY package.json .

# Install all dependencies
RUN bun install --frozen-lockfile

# Build the project
COPY tsconfig.json .
COPY src src

ENV NODE_ENV=production
RUN bun run build

#! Copy build outputs and start server
FROM oven/bun:latest

WORKDIR /server

COPY --from=builder /build/out/index.js .

EXPOSE 8080
ENTRYPOINT ["bun", "index.js"]
