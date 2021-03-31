const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

const plugins = [
    new HtmlWebpackPlugin({
        template: __dirname + './../public/index.html',
        filename: './index.html',
        // inject: 'body'
    }),
    /*
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.css' })
    */
];

if (!dev) {
    /*
    plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'webpack-report.html',
        openAnalyzer: false
    }));
    */
}

module.exports = {
    mode: dev ? 'development' : 'production',
    context: path.join(__dirname, 'src'),
    devtool: !dev ? 'none' : 'inline-source-map',
    entry: {
        app: './src/client.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true,
        // historyApiFallback: true
    },
    resolve: {
        modules: [
            path.resolve( "./../src" ),
            'node_modules'
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            /*
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            */
            {
                test: [/\.less$/, /\.css$/],
                use: [
                    // { loader : MiniCssExtractPlugin.loader},
                    {
                        loader: 'style-loader'
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
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env', // autoprefix css + browserslist
                                        {
                                            browsers: 'last 2 versions'
                                        }
                                    ],
                                    require('tailwindcss'),
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins
};
