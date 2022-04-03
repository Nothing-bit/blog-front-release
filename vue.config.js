// const path = require('path');
//
// const webpack = require('webpack')
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']

module.exports = {
    publicPath:'./',
    devServer:{
        port:80, // 启动端口
        open:true,  // 启动后是否自动打开网页
        proxy: {
            '/images': {
                target: "http://www.zhoujianguo.ltd:8081",
                changeOrigin: true
            }
        }
    },
    // configureWebpack:{
    //     resolve:{
    //         alias:{
    //             '@':path.resolve(__dirname, './src'),
    //             '@i':path.resolve(__dirname, './src/assets'),
    //         }
    //     },
    //     plugins: [
    //         new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //
    //         // 下面是下载的插件的配置
    //         new CompressionWebpackPlugin({
    //             algorithm: 'gzip',
    //             test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //             threshold: 10240,
    //             minRatio: 0.8
    //         }),
    //         new webpack.optimize.LimitChunkCountPlugin({
    //             maxChunks: 5,
    //             minChunkSize: 100
    //         })
    //     ]
    // }
}
