import { getPosts, getPost } from './controllers';

export default (app) => {
    app.get('/api/test', (req, res) => res.status(200).json({ message: 'posts fetched', data: { posts: 'test' } })); // for test
    app.post('/api/getposts', getPosts);
    app.post('/api/getpost', getPost);
};
