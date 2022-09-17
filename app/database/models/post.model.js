const mongoose = require("mongoose");
const bcyptjs = require("bcryptjs");
const postSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    post_type: {
        type: String,
        trim: true,
        required: true,
        enum: ["txt", "file"],
    },
    content: {
        type: String,
        trim: true,
        maxLength: 500,
        required: [
            function () {
                return this.post_type === "txt";
            },
            "Content is required with post type of txt",
        ],
    },
    file: {
        type: String,
        trim: true,
        maxLength: 100,
        required: [
            function () {
                return this.post_type === "file";
            },
            "File is required with post type of file",
        ],
    },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
