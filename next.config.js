module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/management/formulario',
        permanent: true
      }
    ];
  },
  images: {
    disableStaticImages: true
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10000000
        }
      }
    });
    return config;
  }
};
