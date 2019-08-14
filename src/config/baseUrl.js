const dev = 'http://192.168.50.114:8091';
const prod = 'http://dev.xjetry.top:8084';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: dev,
  production: prod,
};

export default config[env];
