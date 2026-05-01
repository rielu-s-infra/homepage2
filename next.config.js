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
  async rewrites() {
    return [
      {
        source: '/api-kuma/:path*',
        destination: 'https://rielu.uniproject.jp/api-kuma/:path*',
      },
    ];
  },
};

export default nextConfig;