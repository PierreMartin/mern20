You will need Node >= 8.10 and npm >= 5.6 on your machine.

To run the project:

    $ git clone https://github.com/PierreMartin/mern20.git
    $ cd mern20
    $ cd server
    $ npm i
    $ npm run server

Then, in another terminal:

    $ cd app
    $ npm i
    $ npm run dev

Finally, test react production build locally:

    npm i -g serve
    cd app
    npm run build
    serve dist -p 3000


https://github.com/alexnm/react-ssr/blob/master/webpack.config.js

"dev": "cross-env NODE_ENV=development webpack-dev-server --mode development --progress --colors --display-error-details --config configs/webpack.dev.config.js",
"build": "rm -rf dist && cross-env NODE_ENV=production webpack --mode production --config configs/webpack.server.config.js && webpack --mode production --config configs/webpack.prod.config.js",
"dev:server": "cross-env NODE_ENV=development babel-node ../server/index.js --useServerRender=true webpack-dev-server --mode development --progress --colors --display-error-details --config configs/webpack.dev.config.js",
"build:server": "rm -rf dist && cross-env NODE_ENV=production babel-node ../server/index.js --useServerRender=true webpack --mode production --config configs/webpack.server.config.js && webpack --mode production --config configs/webpack.prod.config.js",
