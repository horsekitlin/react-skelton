module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    [
      "@babel/plugin-transform-runtime",
       {
         "helpers": true,
         "regenerator": true
       }
    ],
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
  ],
};
