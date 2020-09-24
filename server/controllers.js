import { Post } from './models';

export function getPosts(req, res) {
    Post.find({}).exec((err, posts) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'A error happen at the fetching post', err });
        }

        if (!posts || posts.length === 0) {
            return res.status(200).json({ message: 'posts fetched', posts: {} });
        }

        return res.status(200).json({ message: 'posts fetched', posts });
    });
}

export function getPost(req, res) {
    const { postId } = req.body;

    Post.findOne({ _id: postId }).exec((err, post) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'A error happen at the fetching post', err });
        }

        return res.status(200).json({ message: 'post fetched', post });
    });
}
