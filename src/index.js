/* eslint-disable no-console */
import app from '@/server';
import http from 'http';

const { env } = require('process')
const server = http.createServer(app);

let currentApp = app;

const port = () =>
  parseInt(
    env.RAZZLE_PORT ||
    env.PORT ||
    process.env.RAZZLE_PORT ||
    process.env.PORT ||
    3000,
    10,
  )
const usedPort = port();

server.listen(usedPort, (error) => {
  if (error) {
    console.log(error);
  }

  console.log(`🚀 started on ${usedPort}`);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    // eslint-disable-next-line global-require
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
