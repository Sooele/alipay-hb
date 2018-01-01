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
        loaders: [{
            test: require.resolve('zepto'),
            loader: 'exports-loader?window.Zepto!script-loader'
        }],

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
            compress: {
                warnings: false
            },
            output: {
                // 去掉注释内容
                comments: false,
            },
        }),
        new HtmlWebpackPlugin({
            title: '我的收款码',
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