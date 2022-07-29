import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
const bodyParser = require('body-parser');
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes';

const PORT = process.env.PORT || 2083;

createConnection()
  .then(async () => {
    // Crear una app de express
    const app = express();

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(helmet());

    app.use(express.json());

    // Rutas
    app.use('/', routes);

    // Iniciar el servidor de express:
    app.listen(PORT, () =>
      console.log(`Servidor iniciado en el puerto: ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
