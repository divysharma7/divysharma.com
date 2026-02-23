import http from 'http';
import localApi from './scripts/local-api.js';

const app = {
  middlewares: {
    use: (route, handler) => {
      if (route === '/api/chat') {
        http.createServer(handler).listen(3001, () => {
          console.log("Listening on 3001");
        });
      }
    }
  }
}
localApi().configureServer(app);
