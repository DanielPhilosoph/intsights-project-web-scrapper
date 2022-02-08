const { addPosts } = require("../mongo/functions/queries");
const { getStrongW2iseInfo } = require("./stronger_w2ise");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();
async function updatedDatabaseStrongW2ise() {
  try {
    const { newPosts } = await getStrongW2iseInfo();
    //? Add sentimentScore to every new post
    newPosts.map(async (post) => {
      post.sentimentScore = sentiment.analyze(post.content).score;
      return post;
    });
    console.log("newPosts:");
    console.log(newPosts);
    await addPosts(newPosts);
    console.log("updated");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updatedDatabaseStrongW2ise };
