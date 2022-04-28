
// const bundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
module.exports = {
    // publicPath默认值是'/'，即你的应用是被部署在一个域名的根路径上
    // 设置为'./'，可以避免打包后的静态页面空白
    // 当在非本地环境时，这里以项目test-daily为例，即打包后的h5项目部署服务器的test-daily目录下
    // 那么这里就要把publicPath设置为/test-daily/，表示所有的静态资源都在/test-daily/里
    // 打包部署后，会发现index.html引用的静态资源都添加了路径/test-daily/
    publicPath: process.env.NODE_ENV == 'development' ? '/' : '/blog-front/',
    // publicPath:'./',
    devServer:{
        port:80, // 启动端口
        open:true,  // 启动后是否自动打开网页
        // proxy: {
        //     '/images': {
        //         target: "http://localhost:8081",
        //         changeOrigin: true
        //     }
        // }
    },
    productionSourceMap: false,
    // configureWebpack:{
    //     plugins: [
    //         new bundleAnalyzerPlugin()
    //     ]
    // }
}
