module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env'
  ],
  entry: {
    app: ['babel-polyfill', './src/main.js']
  }
}
