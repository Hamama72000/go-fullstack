/* Création d'un serveur qui va attendre des requêtes http et qui va y répondre*/

/* Importer le package de node */
const http = require('http');

/* Importation de notre application express*/
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/* on va dire à l'app express sur quel port elle va tourner*/
/* la fonction normalizePort renvoie un port valide, qu'il soit fourni 
sous la forme d'un numéro ou d'une chaîne*/
const port = normalizePort(process.env.PORT ||'3000');
app.set('port', port);

/* la fonction errorHandler  recherche les diff erreurs et les gère de manière appropriée. 
Elle est ensuite enregistrée dans le serveur */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* Création d'une constante pr créer serveur et on va passer au serveur l'app*/
const server = http.createServer(app);

/* mnt le serveur est prêt il doit attendre les requêtes*/


server.on('error', errorHandler);
/*un écouteur d'évènements est également enregistré, consignant le port ou 
le canal nommé sur lequel le serveur s'exécute dans la console. */
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/* On met le serveur qu'on veut écouter par défaut le serveur 3000*/
server.listen(port); /* pour les cas où le port 3000 n'est pas disponible on utilise process*/