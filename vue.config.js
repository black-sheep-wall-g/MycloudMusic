// gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    configureWebpack: {
        resolve: {
            // 配置路径别名
            alias: {
                assets: "@/assets",
                common: "@/common",
                components: "@/components",
                network: "@/network",
                views: "@/views"
            }
        },
        externals : {
            'video': 'video.js'
        },
        plugins:[
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
    }
}