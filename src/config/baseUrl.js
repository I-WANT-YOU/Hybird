// const dev = 'http://192.168.50.114:8091';
// const prod = 'http://dev.xjetry.top:8085';
// const dev = 'http://dev.xjetry.top:8085';
const prod = 'https://api.fin-bee.com';
const dev = 'https://api.fin-bee.com';
// const dev = 'http://demo.xjetry.top:8091';


const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
