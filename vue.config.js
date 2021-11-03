const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cesiumSource = 'node_modules/tfgis/cesium/Build/Cesium/'


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: './static',
  productionSourceMap: false,
  lintOnSave: true, // 是否开启eslint
  // 它支持webPack-dev-server的所有选项
  devServer: {
    // 将服务启动后默认打开浏览器
    open: true,
    host: '0.0.0.0',
    port: 8888,
    https: false,
    before: app => {}
  },
  configureWebpack: (config) => {
    let plugins = []
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    if (process.env.NODE_ENV === 'production') {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('./static')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: './static/Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: './static/Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: './static/ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: './static/Widgets' }])
      ]
    } else {
      plugins = [
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify('./')
        }),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: './Workers' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: './Assets' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty'), to: './ThirdParty' }]),
        new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: './Widgets' }])
      ]
    }
    return {
      module: {
        unknownContextCritical: false,
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'node_modules/tfgis/cesium/Source'),
            sideEffects: false
          }
        ]
      },
      optimization: {
        usedExports: true,
        splitChunks: {
          maxInitialRequests: Infinity,
          minSize: 0,
          maxSize: 250000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                return `npm.${packageName.replace('@', '')}`
              }
            },
            commons: {
              name: 'Cesium',
              test: /[\\/]node_modules[\\/]tfgis[\\/]cesium[\\/]Build[\\/]Cesium/,
              priority: 10,
              chunks: 'all'
            }
          }
        }
      },
      output: {
        sourcePrefix: ' '
      },
      amd: {
        toUrlUndefined: true
      },
      resolve: {
        alias: {
          vue$: 'vue/dist/vue.esm.js',
          '@': path.resolve('src')
        }
      },
      node: {
        fs: 'empty',
        Buffer: false,
        http: 'empty',
        https: 'empty',
        zlib: 'empty'
      },
      plugins: plugins
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugins.delete('preload')

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
