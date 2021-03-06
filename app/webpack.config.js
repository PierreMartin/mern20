const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/client.jsx',
    // devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        // Proxy backend requests to Express server
        /*
        proxy: {
            "/api/!*": {
                target: "http://localhost:3080",
                secure: false
            }
        }
        */
    },
    resolve: {
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
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html',
            filename: './index.html',
            // inject: 'body'
        })
    ]
};

if (isDev) {
    module.exports.devtool = 'inline-source-map';
}
