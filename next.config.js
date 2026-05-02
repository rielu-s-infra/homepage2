/** @type {import('next').NextConfig} */
const nextConfig = {
  // `Buffer`のポリフィルが必要な場合、webpack設定で追加できますが、
  // Next.js 13以降はNode.jsの組み込みモジュールを自動的にポリフィルすることが多いため、
  // まずは不要か確認し、エラーが出る場合にのみ追加を検討してください。
  // 例:
  // webpack: (config, { isServer }) => {
  //   if (!isServer) config.resolve.fallback = { ...config.resolve.fallback, buffer: require.resolve('buffer/') };
  //   return config;
  // },
  allowedDevOrigins: ['127.0.0.1'],
  // APIリクエストを外部サービスにリライトする設定
  // 開発環境と本番環境で同じように動作させるために必要
  async rewrites() {
    return [
      {
        source: '/api-kuma/:path*',
        destination: 'https://rielu.uniproject.jp/api-kuma/:path*',
      },
    ];
  },
  // Content Security Policy の設定
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // 開発時に必要な 'unsafe-eval' を許可しつつ、基本的なセキュリティを確保する例
            // 本番環境ではより厳格な設定を検討してください
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://rieluoff.uniproject.jp; img-src 'self' data:; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;