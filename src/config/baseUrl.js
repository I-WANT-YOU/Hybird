// const prod = 'https://api.fin-bee.com';
// const dev = 'https://api.fin-bee.com';

// 线上
const prod = 'https://dev-hk.xjetry.top';
const dev = 'https://dev-hk.xjetry.top';

// 第二赛季 测试
// const prod = 'http://dev.xjetry.top:9080';
// const dev = 'http://dev.xjetry.top:9080';

// const prod = 'http://uat.xjetry.top:8091';
// const dev = 'http://uat.xjetry.top:8091';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
