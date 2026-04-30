# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================
FROM oven/bun:1 AS dependencies

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

WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

# Build Vite application
RUN bun run build

# ============================================
# Stage 3: Run Vite application
# ============================================
FROM oven/bun:1 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Viteのビルド成果物（dist）をコピー
COPY --from=builder --chown=bun:bun /app/dist ./dist

# 静的ファイルを配信するための軽量サーバーをインストール
RUN bun add serve

# Switch to non-root user for security best practices
USER bun

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# 'serve' を使用して静的ファイルを配信
# -s: Single Page Application (SPA) 用のルーティング設定
# -l: ポート指定
CMD ["bun", "x", "serve", "-s", "dist", "-l", "3000"]