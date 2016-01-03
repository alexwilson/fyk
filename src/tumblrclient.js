import tumblr from "tumblr.js";

const TumblrClient = {

  /**
   * @type {client}
   */
  client: null,

  /**
   * Returns a new Tumblr client
   * @type {client}
   */
  getClient: () => {
    if (!TumblrClient.client) {

      if (!process.env.TUMBLR_CONSUMER_KEY
        || !process.env.TUMBLR_CONSUMER_SECRET
        || !process.env.TUMBLR_TOKEN
        || !process.env.TUMBLR_TOKEN_SECRET
        || !process.env.TUMBLR_BLOG_NAME) {
        throw "Need to set up the correct Tumblr credentials!";
      }
      TumblrClient.client = tumblr.createClient({
        consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
        token: process.env.TUMBLR_TOKEN,
        token_secret: process.env.TUMBLR_TOKEN_SECRET
      });

    }
    return TumblrClient.client;
  },

  /**
   * [postImages description]
   * @type {[type]}
   */
  postImages: (images) => {
    images.forEach((item) => {
      TumblrClient
        .postImage(item)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  },

  /**
   * Attempts to post an image to Tumblr.
   * @type {Promise}
   */
  postImage: (image) => {

    return new Promise((resolve, reject) => {

      TumblrClient
        .getClient()
        .photo(
          process.env.TUMBLR_BLOG_NAME,
          {
            'state': 'post',
            'caption': 'Source: <a href="'+image.post_url+'">'+image.post_url+'</a>',
            'link': image.post_url,
            'source': image.file_url,
            'tags': 'koishi komeiji, koishi, touhou, fuckyeahkoishi'
          },
          (err, res) => {

            // Resolve our promise.
            if (err) {
              reject(err);
            }

            resolve("Successful!  Post ID is: "+res.id);
          }
        )
      ;
    }) 
  }
}

export default TumblrClient;