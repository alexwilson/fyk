import * as tumblr from "tumblr";
import fetch from "node-fetch";
import redis from "redis";

export default function() {

  console.log('Starting FuckYeahKoishi');

  let auth = '';
  if (process.env.DANBOORU_USER && process.env.DANBOORU_KEY) {
    console.log('Danbooru credentials found.');
    auth = new Buffer(process.env.DANBOORU_USER+':'+process.env.DANBOORU_KEY).toString('base64');
  }

  const date = new Date();
  const startDate = new Date(date.getTime() - (600 * 1000));

  // Do we have persistence?
  if (process.env.REDIS_URL) {
    console.log('Redis found - ' + process.env.REDIS_URL);
    const client = redis.createClient(process.env.REDIS_URL);
    const redisDate = client.get('lastRun', (err, reply) => {
      console.log('Last run time: ' + reply);
      return reply;
    });
    if (redisDate !== null) {
      const startDate = redisDate;
    }
    client.set('lastRun', date.getTime());
    client.end();
  }

  function repost(item) {
    console.log("WHEEE", item);
  };

  const tags = [
    'komeiji_koishi',
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
      console.log('Found ' + res.length + ' new results.');
      res.forEach(repost);
    });

};
