var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //
    // devtool: 'source-map',

    entry: {
        app: './src/index.tsx',
        sw: './src/service-worker/sw.ts',
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.scss$/,
                loader: [
                    'style-loader',
                    'css-loader?modules&camelCase',
                    'sass-loader',
                    'sass-resources',
                ].join('!')
            },
        ],

        // preLoaders: [
        //   {
        //     test: /\.js$/,
        //     loader: 'source-map-loader',
        //   },
        // ],
    },

    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
    },

    // plugins: [
    //     new HtmlWebpackPlugin({
    //         inject: 'body',
    //         template: './src/index.html',
    //         title: 'TypeScript Todo List',
    //         excludeChunks: ['sw'],
    //     }),
    // ],

    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.ts',
            '.tsx',
            '.js',
            '.json',
        ],
        root: [
            path.resolve('./src')
        ],
    },

    sassResources: [
        './src/components/shared/colors.scss',
        './src/components/shared/global.scss',
        './src/components/shared/helpers.scss',
    ],
}
