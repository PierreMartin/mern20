import { getPosts, getPost, addPost } from './controllers';

export default (app) => {
    app.get('/api/getposts', getPosts); // allByField | allBySearch
    app.post('/api/getpost', getPost); // oneByField
    app.post('/api/addpost', addPost); // add
};
