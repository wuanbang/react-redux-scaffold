var path = require('path');
var webpack = require('webpack');
var ROOT = path.resolve(__dirname);
var htmlwebpackplugin = require('html-webpack-plugin');
var cleanwebpackplugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ENTRY = path.resolve(ROOT, 'src', 'index.js');
var DIST = path.resolve(ROOT, 'dist');

var plugins = [
        new cleanwebpackplugin([DIST]),
        new htmlwebpackplugin(
            {
                title: 'APP',
                template: 'template.html',
                chunks: ['vendor', 'index'],
                filename: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: false,
                }
            }
        ),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        // webpack中-p代表--optimize-minimize也就是压缩的意思,cli中progress代表显示编译进度
        // webpack -p压缩的时候不会去掉一些注释，所以在这里可以设置一下，进一步压缩文件
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            // 去掉debugger和console
            drop_debugger: true,
            drop_console: true
          }
        }),

        // DefinePlugin()方法能创建可以在编译时配置的全局常量，这可能是非常有用的，允许开发版本和编译出的版本具有不同的行为
        // 在这里将环境设置为时'production'时，react会自动去掉没有用到的代码部分，让文件进一步精简
        new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ];

module.exports = {
    entry: {
        index: ENTRY,
        vendor: ['react','react-dom','react-redux','react-router']
    },
    output: {
        path: DIST,
        // publicPath: '/assets/',
        filename: 'bundle_[name]_[hash:8].js' //结束最终JS文件
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader", // 使用babel-loader这个loader
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.(less|scss|css)$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize',
                        {
                            loader:'postcss-loader',
                            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                                plugins: (loader) => [
                                    require('autoprefixer')(), //CSS浏览器兼容
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=10000&name=[name]_[hash:8].[ext]']
            }
        ]
    },
    plugins: plugins
};
