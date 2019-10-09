// const prod = 'https://api.fin-bee.com';
// const dev = 'https://api.fin-bee.com';

// const prod = 'http://dev.xjetry.top:8084';
// const dev = 'http://dev.xjetry.top:8084';

// const prod = 'http://dev.xjetry.top:8081';
// // const dev = 'http://dev.xjetry.top:8081';
const dev = 'http://dev.xjetry.top:7777';
const prod = 'http://dev.xjetry.top:7777';
// 线上
// const prod = 'http://dev-hk.xjetry.top:8080';
// const dev = 'http://dev-hk.xjetry.top:8080';

// const prod = 'http://uat.xjetry.top:8091';
// const dev = 'http://uat.xjetry.top:8091';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
