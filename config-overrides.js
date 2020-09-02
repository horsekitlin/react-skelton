module.exports = function override(config, env) {
  const plugins = [
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' },
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: { loader: 'babel-loader' }
    },
  ];

  config.module.rules = [...config.module.rules, ...plugins];

  config.output.globalObject = 'this';

  return config;
};
