const simpleGit = require("simple-git");

const push = async () => {
  console.log("🔄 Pushing...");
  try {
    await simpleGit().push("origin", "master");
    console.log("🥰 Pushed ✅");
  } catch (e) {
    if (e.message.includes("nothing to push"))
      console.log("🎉 Nothing to push");
    else if (e.message.includes("already up-to-date"))
      console.log("🎉 Already up-to-date");
    else if (e.message.includes("fatal: remote end"))
      console.log("⚠️ Remote end is not reachable");
    else if (e.message.includes("fatal: Authentication failed"))
      console.log("⚠️ Authentication failed");
    else if (e.message.includes("fatal: unable to access"))
      console.log("⚠️ Unable to access remote repository");
    else if (e.message.includes("fatal: unable to read"))
      console.log("⚠️ Unable to read remote repository");
    else if (e.message.includes("git pull")) {
      await simpleGit()
        .pull("origin", "master")
        .then(() => {})
        .catch(e => {
          console.log("⚠️ Pull failed");
          console.log(e);
        });
    } else {
      console.log("❌ Push failed ❌");
      console.log(e);
    }
  }
};

module.exports = push;
