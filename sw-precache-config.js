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
    urlPattern: '*',
    handler: 'networkFirst'
  }]
};
