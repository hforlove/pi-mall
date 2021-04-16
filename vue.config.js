const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        view: '@/views',
        api: '@/api',
        utils: '@/utils',
        comp: '@/components',
        asset: '@/assets',
        mixin: '@/mixins'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/styles/const.less')
      ]
    }
  },
  lintOnSave: false
}