const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //For github pages
  outputDir: 'docs',
  publicPath: './'
})
