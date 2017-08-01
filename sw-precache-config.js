// Cache external https://stackoverflow.com/questions/40587733/caching-external-resources-with-sw-precache
module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/assets/**.*',
    'dist/**.css'
  ],
  runtimeCaching: [{
    urlPattern: /^https:\/\/api\.wickeyappstore\.com\//,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\//,
    handler: 'cacheFirst'
  }, {
    urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/fastclick\/1\.0\.6\/fastclick\.min\.js/,
    handler: 'cacheFirst'
  }, {
    urlPattern: /^https:\/\/unpkg\.com\/wickeyappstore@0\.5\.2\/styles\.css/,
    handler: 'cacheFirst'
  }],
  navigateFallback: '/index.html',
};
