const { addPosts } = require("../mongo/functions/queries");
const { getStrongW2iseInfo } = require("./stronger_w2ise");
async function updatedDatabaseStrongW2ise() {
  try {
    const { newPosts } = await getStrongW2iseInfo();
    await addPosts(newPosts);
    console.log("updated");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updatedDatabaseStrongW2ise };
