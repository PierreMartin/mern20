import { Post } from './models';

/**
 * GET /api/getposts
 */
export function getPosts(req, res) {
    Post.find({}).exec((err, posts) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'A error happen at the fetching posts', err });
        }

        return res.status(200).json({ message: 'posts fetched', data: posts });
    });
}

/**
 * POST /api/getpost
 */
export function getPost(req, res) {
    const { postId } = req.body;

    Post.findOne({ _id: postId }).exec((err, post) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'A error happen at the fetching post', err });
        }

        return res.status(200).json({ message: 'post fetched', data: post });
    });
}

/**
 * POST /api/addpost
 */
export function addPost(req, res) {
    const fields = req.body;
    const post = new Post(fields);

    post.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'A error happen at the creating new post', err });
        }

        return res.status(200).json({ message: 'You have create a post', data: post });
    });
}
