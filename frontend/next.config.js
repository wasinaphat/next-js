
module.exports = {
  publicRuntimeConfig: {
    APP_NAME: "SEOBLOG",
    API_DEVELOPMENT: "http://localhost:8000/api",
    API_PRODUCTION: "http://seoblog.com",
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT:'http://localhost:3000',
    DOMAIN_PRODUCTION:'http://seoblog.com'
  },
};


// const withCSS = require('@zeit/next-css')
// module.exports = withCSS({
//   cssModules: true,
//   publicRuntimeConfig: {
//     APP_NAME: "SEOBLOG",
//     API_DEVELOPMENT: "http://localhost:8000/api",
//     PRODUCTION: false,
//   },
// });
