const moment = require("moment");
const random = require("random");
const push = require("./push");
const write = require("./write");
const txtgen = require("txtgen");

// N is the number of commits
let commit = 1;
const makeCommit = async (target, loop = null) => {
  // Push to the remote repository if we reached the commit limit
  if (commit % target === 0 || commit === 0) await push();
  // Stop if we reached the loop limit
  if (loop && commit / (target * loop) >= 1) {
    console.log(`Finished ${loop} ✅`);
    return;
  }

  // Create date
  const day = random.int(0, 30); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const month = random.int(0, 11); // 0 = January, 1 = February, ..., 11 = December
  const year = random.int(1, 3);
  const date = moment()
    .subtract(year, "y")
    .add(month, "M")
    .add(day, "d")
    .format();

  // Generate text
  const sentence = txtgen.sentence();
  const article = txtgen.article();
  const paragraph = txtgen.paragraph();

  // Take the first 5 words of the sentence and use them as commit
  const sentence_commit =
    sentence.split(" ").length > 5
      ? sentence.split(" ").slice(0, 5).join(" ")
      : sentence.split(" ").slice(0, 1).join(" ");
  // Take the first 5 words of the article and use them as commit
  const article_commit =
    article.split(" ").length > 5
      ? article.split(" ").slice(0, 5).join(" ")
      : article.split(" ").slice(0, 1).join(" ");
  // Take the first 5 words of the paragraph and use them as commit
  const paragraph_commit =
    paragraph.split(" ").length > 5
      ? paragraph.split(" ").slice(0, 5).join(" ")
      : paragraph.split(" ").slice(0, 1).join(" ");

  const data = JSON.stringify({ date: date });

  // Write content and commit to the file
  await write("./article.md", article, article_commit, date);
  console.log(`📝 ${commit++}`);
  await write("./sentence.md", sentence, sentence_commit, date);
  console.log(`📝 ${commit++}`);
  await write("./paragraph.md", paragraph, paragraph_commit, date);
  console.log(`📝 ${commit++}`);
  await write("./data.json", data, date, date);
  console.log(`📝 ${commit++}`);

  makeCommit(target, loop);
};
makeCommit(10, 1);
