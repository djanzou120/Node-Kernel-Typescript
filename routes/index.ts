import {Express} from 'express';

//Swagger config
import swaggerUi from 'swagger-ui-express';
const swaggerDocs = require('./swagger.json');

import {RegisterRoutes} from "./routes"

export const allRoutes = (app:Express) => {

    //Swagger Documentation
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    // app.use('/index', indexRouter);
    RegisterRoutes(app);
    return app;
}