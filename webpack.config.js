'use strict';

const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    context: `${__dirname}/src/`,

    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/PathBuilder.js')
        ],

        PathBuilder: './PathBuilder.js',

        'PathBuilder.min': './PathBuilder.js'
    },

    output: {
        path: `${__dirname}/dist/`,
        filename: '[name].js',
        library: 'PathBuilder',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    module: {
        rules: [
            { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
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
