const postModel = require("../database/models/post.model");
class Post {
    static showAll = async (req, res) => {
        try {
            const posts = await postModel.find();
            res.status(200).send({
                apiStatus: true,
                date: posts,
                message: "all posts fetched",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e,
                message: e.message,
            });
        }
    };
    static addPost = async (req, res) => {
        try {
            const post = new postModel(req.body);
            await post.save();
            res.status(200).send({
                apiStatus: true,
                date: post,
                message: "post added successfully",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e,
                message: e.message,
            });
        }
    };
    static single = async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id);
            res.status(200).send({
                apiStatus: true,
                date: post,
                message: "post data fetched",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e,
                message: e.message,
            });
        }
    };
    static deletePost = async (req, res) => {
        try {
            const post = await postModel.findByIdAndDelete(req.params.id);
            res.status(200).send({
                apiStatus: true,
                date: post,
                message: "post data fetched",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e,
                message: e.message,
            });
        }
    };
    static editPost = async (req, res) => {
        try {
            const comingUpdates = Object.keys(req.body);
            const allowedEdits = ["title", "content", "file"];
            const validEdits = comingUpdates.every((update) => allowedEdits.includes(update));
            if (!validEdits) throw new Error("invalid edits");
            const post = await postModel.findById(req.params.id);
            if (!post) throw new Error("invalid id");
            comingUpdates.forEach((update) => (post[update] = req.body[update]));
            await post.save();
            res.status(200).send({
                apiStatus: true,
                date: post,
                message: "post data fetched",
            });
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                date: e,
                message: e.message,
            });
        }
    };
}

module.exports = Post;
