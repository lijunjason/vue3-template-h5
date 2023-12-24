const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue({ file }) {
        return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75;
      },
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore', 'keep-px'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
};
