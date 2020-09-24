import { getPosts, getPost } from './controllers';

export default (app) => {
    app.get('/test', (req, res) => res.send('Hello World!')); // for test
    app.post('/api/getposts', getPosts);
    app.post('/api/getpost', getPost);
};
