/* eslint-disable */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// Destination directory
const dist = 'dist';

module.exports = {
    /**
     *  Entry source js files
     */
    entry: {
        app: ['./src/js/index.jsx']
    },
    /**
     * Output js files
     */
    output: {
        path: path.join(__dirname, dist),
        filename: 'js/[name].js', // 'js/[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        },
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            /**
             *  ESLint will be used to lint all JavaScript.
             *  Please update .eslintrc.js for configuration. Site: http://eslint.org/
             */
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                exclude: /(node_modules|vendors)/,
                loader: 'eslint-loader'
            },
            /**
             * Load Babel to compile ES6 to ES5
             * https://babeljs.io/
             */
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            /**
             * Compile SCSS files to CSS
             */
            {
                test: /\.scss$/,
                use: [
                    /**
                     * MiniCssExtractPlugin
                     * https://webpack.js.org/plugins/mini-css-extract-plugin/
                     */
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          hmr: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            /**
             * Load all the font files needed using the file loader
             */
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '../fonts/',
                    outputPath: 'fonts/'
                }
            },
            /**
             * Compile pug files and place them in the dist folder
             * https: //pugjs.org/api/getting-started.html
             */
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            }
        ]
    },
    plugins: [
        /**
         * The MiniCssExtractPlugin will compile all of the SCSS files
         * https://github.com/webpack-contrib/mini-css-extract-plugin
         */
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        /**
         * HtmlWebpackPlugin will compile Pug files into HTML
         * https://github.com/jantimon/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug',
            filename: 'index.html',
            inject: true
        }),
        new CopyPlugin([
            { from: 'src/images', to: 'images' },
            { from: 'src/manifest.json', to: 'manifest.json' }
        ]),
        /* new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }) */
        new WorkboxPlugin.InjectManifest({
            swSrc: './sw.js',
            swDest: 'service-worker.js'
        })
    ]
}