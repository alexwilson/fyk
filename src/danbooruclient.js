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
   * Tags to search for.
   * @type {Array}
   */
  tags: [],

  /**
   * @param {Date}
   * @returns {DanbooruClient}
   */
  setStartDate: (startDate) => {
    DanbooruClient.startDate = startDate;
    return DanbooruClient;
  },

  /**
   * @param {Date} endDate 
   * @returns {DanbooruClient}
   */
  setEndDate: (endDate) => {
    DanbooruClient.endDate = endDate;
    return DanbooruClient;
  },

  /**
   * @param {string} A tag to search for.
   * @returns {DanbooruClient}
   */
  addTag: (tag) => {
    DanbooruClient.tags.push(tag);
    return DanbooruClient;
  },

  /**
   * @param  {err}      err
   * @param  {Function} callback
   * @return {Promise}
   */
  fetchPosts: () => {

    let auth = '';
    if (process.env.DANBOORU_USER && process.env.DANBOORU_KEY) {
      console.log('Danbooru credentials found.');
      auth = new Buffer(process.env.DANBOORU_USER+':'+process.env.DANBOORU_KEY).toString('base64');
    }

    const tags = DanbooruClient.tags;

    if (DanbooruClient.startDate && DanbooruClient.endDate) {
      tags.push('date:'+DanbooruClient.startDate.toISOString()+'..'+DanbooruClient.endDate.toISOString());
    }

    console.log('Searching for tags - ' + tags);

    const danbooruAddress = 'https://danbooru.donmai.us'
    const queryAddress = danbooruAddress + '/posts.json?limit=1&tags=' + tags.join(' ');

    return new Promise((resolve, reject) => {

      fetch(
          queryAddress,
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
          // Add original danbooru addresses.
          return res.map((item) => {
            item.post_url = danbooruAddress + '/posts/' + item.id;
            item.file_url = danbooruAddress + item.file_url;
            item.large_file_url = danbooruAddress + item.large_file_url;
            item.preview_file_url = danbooruAddress + item.preview_file_url;
            return item;
          });
        })
        .then((res) => {
          console.log('Found ' + res.length + ' new results.');
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
      ;

    });
  }

};

export default DanbooruClient;