'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    context: `${__dirname}/src/`,

    entry: {
        PathBuilder: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/main.js')
        ],

        PathBuilder: './main.js',

        'PathBuilder.min': './main.js'
    },

    output: {
        pathinfo: true,
        publicPath: '/dist/',
        path: `${__dirname}/dist/`,
        library: '[name]',
        libraryTarget: 'umd',
        filename: '[name].js'
    },

    module: {
        rules: [
            { 
                exclude: /node_modules/,
                test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src/') },
            //{ test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            //{ test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
        ]
    },

    plugins: [

        new UglifyJSPlugin({
            include: /\.min\.js$/,
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                compress: true,
                ie8: false,
                ecma: 5,
                output: {
                    comments: false
                },
                warnings: false
            },
            warningsFilter: (src) => false
        })

    ]

};
