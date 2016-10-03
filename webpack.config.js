/**
 * Created by lunavod on 02.08.16.
 */
var path = require('path');
var webpack = require('webpack')
module.exports = {
    entry: ['babel-polyfill', './js/entry.js'],
    output: {
        filename: './public/dist/bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        publicPath: 'http://localhost:8090/assets'
    },
    module: {
        loaders: [
            {
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname),
                ],
                exclude: /(node_modules|bower_components)/,
                test: [/\.js$/, /\.jsx$/],
                plugins: ['transform-runtime'],
            },
        ],


    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'Api': 'Api',
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
}
