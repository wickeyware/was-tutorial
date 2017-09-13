// Cache external https://stackoverflow.com/questions/40587733/caching-external-resources-with-sw-precache
module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/assets/**.*',
    'dist/assets/sounds/**.*',
    'dist/**.css'
  ],
  runtimeCaching: [{
    urlPattern: /^https:\/\/api\.wickeyappstore\.com\//,
    handler: 'networkFirst'
  }, {
    urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\//,
    handler: 'cacheFirst'
  }, {
    urlPattern: /^https:\/\/unpkg\.com\//,
    handler: 'cacheFirst'
  }, {
    urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\//,
    handler: 'cacheFirst'
  }],
};
