# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

# This Dockerfile.bun is specifically configured for projects using Bun
# For npm/pnpm or yarn, refer to the Dockerfile instead

FROM oven/bun:1 AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json bun.lock* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --no-save --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma client
# RUN bun x prisma generate

ENV NODE_ENV=production

# Install git to allow Next.js to detect the repository and enable features like Fast Refresh
RUN apt update && apt install -y git

# Remove apt cache to reduce image size
RUN rm -rf /var/lib/apt/lists/*

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN bun run build

# ============================================
# Stage 3: Run Vite application (Static Server)
# ============================================

FROM oven/bun:1 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist

# serve をインストール
RUN bun add serve

USER bun

EXPOSE 3000

# 正しい引数の渡し方: -l (listen) の後にポート、その後にホストを指定する場合が多いですが、
# 'serve' の場合は '-l 3000' で全インターフェースを向くこともありますが、
# 確実に 0.0.0.0 を指定するには以下のように記述します。
CMD ["bunx", "serve", "-s", "dist", "-l", "3000"]