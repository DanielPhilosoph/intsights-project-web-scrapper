const Post = require("../models/Post");

/**
 ** Insert all posts to mongo
 * @param {Array[Post]} posts
 */
async function addPosts(posts) {
  try {
    await Post.insertMany(posts, { ordered: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function getPostByType(type) {
  try {
    let posts = await Post.find({ type: type });
    let arrangedPosts = posts.map((post) => {
      return {
        title: post.title,
        content: post.content,
        author: post.author,
        date: post.date,
        sentimentScore: post.sentimentScore,
        id: post._id,
      };
    });
    return arrangedPosts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = { addPosts, getPostByType };
