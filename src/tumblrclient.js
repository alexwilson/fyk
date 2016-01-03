import tumblr from "tumblr.js";

export default function() {
  if (!process.env.TUMBLR_CONSUMER_KEY
    || !process.env.TUMBLR_CONSUMER_SECRET
    || !process.env.TUMBLR_TOKEN
    || !process.env.TUMBLR_TOKEN_SECRET) {
    throw "Need to set up the correct Tumblr credentials!";
  }
  client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
    token: process.env.TUMBLR_TOKEN,
    token_secret: process.env.TUMBLR_TOKEN_SECRET
  });
  return client;
}

