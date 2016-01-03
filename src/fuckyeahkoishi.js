import redis from "redis";
import bluebird from "bluebird";
import danbooruClient from "./danbooruclient.js";
import tumblrClient from "./tumblrclient.js";

export default () => {

  console.log('Starting FuckYeahKoishi');

  const startDate = new Date();
  const endDate = new Date();

  bluebird.promisifyAll(redis);
  bluebird.promisifyAll(danbooruClient);

  // Do we have persistence?
  if (process.env.REDIS_URL) {
    console.log('Redis found - ' + process.env.REDIS_URL);

    const client = redis.createClient(process.env.REDIS_URL);
    client
      .getAsync('lastRun')
      .then((res) => {
        startDate.setTime(res);
      })
      .then((res) => {
        // Update "last run" to now, so that we may pick up at our next run.
        return client.set('lastRun', endDate.getTime());
      })
      .done((res) => {
        // Now that we're done, kill the client.
        danbooruClient
          .setStartDate(startDate)
          .setEndDate(endDate)
          .fetchPostsAsync()
          .then((res) => {
            console.log('aaa');
            console.log(res);
          })
        ;
        client.end();
      })
    ;

  } else {
    console.log('Redis not found');
    startDate.setTime(endDate.getTime() - (600 * 1000));
    danbooruClient
      .setStartDate(startDate)
      .setEndDate(endDate)
      .fetchPostsAsync()
      .then((res) => {
        console.log(res);
      })
    ;
  }


};
