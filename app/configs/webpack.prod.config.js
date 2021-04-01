const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env = {}) => {
    const isServerSide = env.server;
    console.log('isServerSideTT >>> ', isServerSide);

    const configuration = {
        mode: 'production',
        entry: './src/client.jsx',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
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
                            loader: 'less-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + './../public/index.html',
                filename: './index.html',
                // inject: 'body'
            })
        ]
    };

    return configuration;
};
