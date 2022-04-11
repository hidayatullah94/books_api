const Hapi = require('@hapi/hapi');
const { routes } = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    // handle cors
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // add route
  server.route(routes);

  await server.start();
  console.log('Server running in ', server.info.uri);
};

init();
