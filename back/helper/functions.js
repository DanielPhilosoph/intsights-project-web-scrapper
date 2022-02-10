const { addPosts } = require("../mongo/functions/queries");
const { getStrongW2iseInfo } = require("./stronger_w2ise");
const Sentiment = require("sentiment");
const { map } = require("cheerio/lib/api/traversing");
const Post = require("../mongo/models/Post");
const sentiment = new Sentiment();
async function updatedDatabaseStrongW2ise() {
  try {
    const { posts, newPosts } = await getStrongW2iseInfo();

    //? Add sentimentScore to every new post
    newPosts.map(async (post) => {
      post.section = getSection(post);
      post.sentimentScore = sentiment.analyze(post.content).score;
      return post;
    });

    // posts.map(async (post) => {
    //   post.section = getSection(post);
    //   await Post.updateOne(
    //     { _id: post.id },
    //     { $set: { section: post.section } }
    //   );
    //   return post;
    // });

    console.log("newPosts:");
    console.log(newPosts);
    await addPosts(newPosts);
    console.log("updated");
  } catch (error) {
    console.log(error);
  }
}

function getSection(post) {
  const { title, content } = post;

  //* Words to find
  const hacking = ["hack", "database", "hacking"];
  const computers = ["documents", "computer", "encrypted", "spyware"];
  const crypto = ["bitcoin", "$"];
  const drugs = [
    "drugs",
    "anxiety",
    "pain killer",
    "oxycontin",
    "morphine",
    "ritalin",
  ];
  const sex = ["sex", "s3x", "porn", "myTeen", "sis", "slut", "bitch", "rape"];
  const guns = ["gun", "pistol", "m4", "uzi"];

  //* Sections
  const sections = [hacking, computers, crypto, drugs, sex, guns];
  const sectionsNames = [
    "hacking",
    "computers",
    "crypto",
    "drugs",
    "sex",
    "guns",
  ];

  //* Map the amount of words for each section
  let map = {};
  sections.forEach((section, i) => {
    section.forEach((word) => {
      if (title.toLowerCase().includes(word.toLowerCase())) {
        if (map[sectionsNames[i]]) {
          map[sectionsNames[i]] += title.split(word.toLowerCase()).length - 1;
        } else {
          map[sectionsNames[i]] = title.split(word.toLowerCase()).length - 1;
        }
      }
      if (content.toLowerCase().includes(word.toLowerCase())) {
        if (map[sectionsNames[i]]) {
          map[sectionsNames[i]] += content.split(word.toLowerCase()).length - 1;
        } else {
          map[sectionsNames[i]] = content.split(word.toLowerCase()).length - 1;
        }
      }
    });
  });

  //* Calculate max and return post section
  let max = 0;
  let maxName = "general";
  sectionsNames.forEach((sectionName) => {
    if (map[sectionName] && map[sectionName] > max) {
      maxName = sectionName;
      max = map[sectionName];
    }
  });

  return maxName;
}

module.exports = { updatedDatabaseStrongW2ise };
