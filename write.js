fs = require("fs");
const simpleGit = require("simple-git");

const write = (file, content, commit, date) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, content, "utf8", err => {
      if (err) reject(err);
      simpleGit()
        .add([file])
        .commit(commit, { "--date": date }, () => {
          resolve(true);
        });
    });
  });
};

module.exports = write;
