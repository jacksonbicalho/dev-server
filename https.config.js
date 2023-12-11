const ssl = require('./dist');
// ## https://www.npmjs.com/package/serve-handler#options
const config = ssl.defaultConfig.getDefaultConfig({
  publicDomain: 'localhost',
  contenPublic: 'coverage',
  webPort: 8081,
  keysPath: 'ssl',
  renderSingle: false,
  // cleanUrls: ['/**'],
  rewrites: [
    // {
    //   source: 'app/**',
    //   destination: '/index.html'
    // }
  ]
});
module.exports = config;
