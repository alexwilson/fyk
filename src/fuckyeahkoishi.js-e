import * as tumblr from "tumblr";
import fetch from "node-fetch";

export default function() {

  function repost(item) {
    console.log("WHEEE", item);
  };

  const date = new Date();
  const startDate = new Date(date.getTime() - (600000 * 1000));

  const auth = new Buffer("albert:SSB3YW50IGEgbW9uc3RlciBjb2NrIGluIG15IG1vdXRo").toString('base64');

  const tags = [
    'komeiji_koishi',
    'score:>1',
    'date:'+startDate.toISOString()+'..'+date.toISOString()
  ];

  fetch(
      'https://danbooru.donmai.us/posts.json?tags=' + tags.join(' '),
      {
        method: 'get',
        headers: {
          'Authorization': 'Basic '+auth
        }
      }
    )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      res.forEach(repost);
    });

};
