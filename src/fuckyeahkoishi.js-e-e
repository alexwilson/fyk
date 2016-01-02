import * as tumblr from "tumblr";
import fetch from "node-fetch";

export default function() {

  function repost(item) {
    console.log("WHEEE", item);
  };

  const date = new Date();
  const startDate = new Date(date.getTime() - (600 * 1000));

  const tags = [
    'komeiji_koishi',
    'score:>1',
    'date:'+startDate.toISOString()+'..'+date.toISOString()
  ];

  fetch(
      'https://danbooru.donmai.us/posts.json?tags=' + tags.join(' '),
      {
        method: 'get',
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.forEach(repost);
    });

};
