import fetch from "node-fetch";

const DanbooruClient = {

  /**
   * @type {Date}
   */
  startDate: new Date(),

  /**
   * @type {Date}
   */
  endDate: new Date(),

  /**
   * @param {Date}
   */
  setStartDate: (startDate) => {
    DanbooruClient.startDate = startDate;
    return DanbooruClient;
  },

  /**
   * @param {Date} endDate 
   */
  setEndDate: (endDate) => {
    DanbooruClient.endDate = endDate;
    return DanbooruClient;
  },

  /**
   * @param  {err}      err
   * @param  {Function} callback
   * @return {void}
   */
  fetchPosts: (err, callback) => {

    let auth = '';
    if (process.env.DANBOORU_USER && process.env.DANBOORU_KEY) {
      console.log('Danbooru credentials found.');
      auth = new Buffer(process.env.DANBOORU_USER+':'+process.env.DANBOORU_KEY).toString('base64');
    }

    const tags = [
      'komeiji_koishi',
      'date:'+DanbooruClient.startDate.toISOString()+'..'+DanbooruClient.endDate.toISOString()
    ];

    console.log('Searching for tags - ' + tags);

    const danbooruAddress = 'https://danbooru.donmai.us/posts.json?tags=' + tags.join(' ');

    fetch(
        danbooruAddress,
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
        callback(res);
      })
      .catch((res) => {
        throw res;
      })
    ;
  }

};

export default DanbooruClient;