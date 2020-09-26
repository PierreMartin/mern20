import { getPosts, getPost, addPost } from './controllers/posts';
import { login, signUp, logout } from './controllers/users';

export default (app) => {
    app.get('/api/getposts', getPosts); // allByField | allBySearch
    app.post('/api/getpost', getPost); // oneByField
    app.post('/api/addpost', addPost); // add

    app.post('/api/login', login);
    app.post('/api/signup', signUp);
    app.post('/api/logout', logout);
};
