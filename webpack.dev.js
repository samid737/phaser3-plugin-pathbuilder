'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    context: `${__dirname}/src/`,

    entry: {
        PathBuilder: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/main.js')
        ],

        // 'PathBuilder.min': './main.js'
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'project.bundle.js'
    },

    module: {
        rules: [
            { 
                exclude: /node_modules/,
                test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src/') },
            //{ test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: [/\.vert$/, /\.frag$/], use: 'raw-loader' }
        ]
    },
};

