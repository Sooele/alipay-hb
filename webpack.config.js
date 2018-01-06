const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        app: "./src/js/entry.js"
    },

    output: {
        filename: "js/[name].[hash:8].js",
        path: __dirname + '/dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract(['css-loader'])
        }]
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProvidePlugin({
            jquery: "jquery",
            $: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            compress: {
                warnings: false
            },
            output: {
                // 去掉注释内容
                comments: false,
            },
            except: ['$', 'jQuery', 'require', 'exports', 'import'],
            uglifyOptions: {
                ie8     : true,
                ecma    : 6,
                mangle  : true,
                compress: true,
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: '支付宝红包推广页',
            filename: "index.html",
            template: "src/index.html",
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true

            }
        }),
        new ExtractTextPlugin("css/[name].[hash:8].css"),

    ],

};