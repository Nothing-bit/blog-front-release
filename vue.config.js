
const bundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
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
    productionSourceMap: false,
    configureWebpack:{
        plugins: [
            new bundleAnalyzerPlugin()
        ]
    }
}
