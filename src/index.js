const server = require('./server/');
const db = require('./server/helpers/db.helper');
const config = require('./config');

const app = server();
console.info('Iniciando aplicación...');
console.info('*** Conectando a base de datos...')
db.sync()
  .then(() => {
    console.info('*** ... conexión establecida.');
    console.info('===> Iniciando servidor...');
    app.listen(config.PORT, (err) => {
      if(err) {
        console.error('===> ... ha ocurrido un error al iniciar el servidor.')
        console.error(err.message);
        process.exit(1);
      }
      console.info('===> ... servidor iniciado y escuchando en el puerto: ', config.PORT);
    });
  })
  .catch((err) => {
    console.error('*** ... no se pudo establecer conexión.')
    console.error(err.message);
    console.info('Saliendo de aplicación...')
    process.exit(1);
  });
