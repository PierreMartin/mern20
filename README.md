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
