console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// exports.twitter = {
//   consumer_key: 'qYlz1PzuCKBS0NhnpZYL4mPRv',
//   consumer_secret: 'k6ntKo9m5yY91qUSinCDYZHCWxUTZ9shOkf3RCVxvGA4a6Yp0N',
//   access_token_key: '<925493723642978306-k6oLUKYvaw1e6dhedUta5l1rAKccjPj',
//   access_token_secret: 'wWMcJuejsIbNVGCxxqqFIBbXzJ6uO5Ydcf1PBXuDT2dWK',
// }

// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };