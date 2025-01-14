module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/businesses/location/:location',
      handler: 'business.findByLocation',
    },
    {
      method: 'GET',
      path: '/businesses/search',
      handler: 'business.search',
    },
    {
      method: 'GET',
      path: '/businesses/category/:category/location/:location',
      handler: 'business.findByCategory',
    },
  ],
};