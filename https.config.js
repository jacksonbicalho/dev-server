const path = require('path');
const ssl = require('./dist');
// ## https://www.npmjs.com/package/serve-handler#options
const config = ssl.defaultConfig.getDefaultConfig({
  rootApp: path.resolve(__dirname),
  publicDomain: 'localhost',
  contenPublic: 'public',
  webPort: 8081,
  keysPath: 'ssl',
  renderSingle: false,
  cleanUrls: ['/**'],
  rewrites: [
    {
      source: 'app/**',
      destination: '/index.html'
    }
  ]
});
module.exports = config;
