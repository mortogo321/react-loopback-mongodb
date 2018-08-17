const config = {
  server: {
    dev: {
      url: 'http://localhost:3000/api'
    },
    prod: {
      url: 'https://api.example.com'
    }
  },
  getApi(item = 'url') {
    let server = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'dev' : 'prod';

    return this.server[server][item];
  },
};

export default config;