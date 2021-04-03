require('@babel/register')({
    // This will override `node_modules` ignoring - you can alternatively pass
    // an array of strings to be explicitly matched or a regex / glob
    presets: [
        '@babel/preset-env',
        '@babel/preset-react'
    ],
    plugins: [
        [
            'css-modules-transform',
            {
                camelCase: true,
                extensions: ['.css', '.less']
            }
        ],
        'dynamic-import-node'
    ],
    ignore: [],
});

require('./src/server.jsx');
