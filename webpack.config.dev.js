/* eslint-disable */
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true
    },
    devtool: 'source-map',
    plugins: [
        new BrowserSyncPlugin(
          // BrowserSync options
          {
            // browse to http://localhost:3000/ during development
            host: 'localhost',
            port: 3000,
            // proxy the Webpack Dev Server endpoint
            // (which should be serving on http://localhost:8080/)
            // through BrowserSync
            proxy: 'http://localhost:8080/'
          },
          // plugin options
          {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false
          }
        )
    ]
});