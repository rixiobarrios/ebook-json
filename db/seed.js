const mongoose = require("./connection");

const Bookmark = require("./models/Bookmark");
const User = require("./models/User");

// clear the database of records using both models
User.deleteMany({}).then(() => {
  console.log("deleted all users");
  Bookmark.deleteMany({}).then(() => {
    console.log("deleted all bookmarks");

    // create a user
    User.create({
      name: "Paul Allen",
      email: "paul@microsoft.com"
    }).then(paul => {
      // create two bookmarks and associate one with the user
      Bookmark.create({
        title: "Microsoft",
        url: "https://microsoft.com",
        favorited: paul.id
      }).then(ms => {
        paul.favorites.push(ms);
        paul.save();
        console.log("created Paul:Microsoft");
      });

      Bookmark.create({
        title: "reddit",
        url: "https://reddit.com"
      }).then(() => {
        console.log("created Paul:Reddit");
      });
    });

    User.create({
      name: "Sergei Brin",
      email: "sergei@google.com"
    }).then(sergei => {
      // create three bookmarks and associate one with the user
      Bookmark.create({
        title: "Google",
        url: "https://google.com",
        favorited: sergei.id
      }).then(google => {
        // we have to call save() or the push() never writes to the database
        sergei.favorites.push(google);
        sergei.save();
        console.log("created Sergei:Google");
      });

      Bookmark.create({
        title: "Hacker news",
        url: "https://news.ycombinator.com"
      }).then(() => {
        console.log("created Sergei:HN");
      });

      Bookmark.create({
        title: "Know your meme",
        url: "https://knowyourmeme.com/"
      }).then(() => {
        console.log("created Sergei:KYM");
      });
    });
  });
});
