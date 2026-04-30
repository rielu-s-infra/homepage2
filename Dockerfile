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

# 本番環境用の設定
ENV NODE_ENV=production
ENV PORT=3000

# builderステージで生成された dist フォルダをコピー
COPY --from=builder /app/dist ./dist

# 静的ファイルを配信するために 'serve' パッケージを利用するか、
# もしくは単純に Bun でサーバーを起動します。
# ここでは一番手軽な 'serve' を使う方法にします。
RUN bun add serve

# Switch to non-root user
USER bun

# Expose port 3000
EXPOSE 3000

# 'dist' フォルダの中身を 3000番ポートで配信
CMD ["bunx", "serve", "-s", "dist", "-l", "3000", "0.0.0.0"]