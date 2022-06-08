import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as path from 'path';
import helmet from 'helmet';
import {ValidateError} from 'tsoa';
import * as dotenv from 'dotenv';

import {MY_Controller} from '../core/generic/MY_Controller';
import logger from "./logger";

//Middleware Error
import {Middleware_Error} from '../core/generic/Middleware_Error';

//Inclusions of all Routes
import {allRoutes} from '../../routes';

//Response builder
import Builder from '../core/adapter/response.builder';

declare var global: any;
global.responseCode = Builder.getCode();

global.logger = logger;

//Catch Error Handler
const catchHandler = (e : any) => {
    global.logger("error", e.message);
    return (new MY_Controller()).liteResponse(global.responseCode.EXCEPTION, null, e.message);
}
global.catchHandler = catchHandler;

dotenv.config();

const app: Express = express();

//Debugger --dev
app.use(morgan('dev'));

//Security Filter
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// server static files
app.use('/static', express.static(path.resolve('static')));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes inclusion
const routing = express();
allRoutes(routing);

app.use(process.env.ROUTE_PREFIX || '/api', routing)

//Catch request in case of not found url
app.use((req, res) => {
    let ctrl = new MY_Controller();
    res.send(ctrl.liteResponse(global.responseCode.NOT_FOUND, {
        AppName: process.env.APP_NAME,
        AppUrl: process.env.APP_DOMAIN + ':' + global.appPort,
        path: req.originalUrl,
    }))
})

function error(err:any, req:Request, res:Response, next: any) {
    // respond with 500 "Internal Server Error".
    if (res.headersSent) {
        return next(err);
    }

    const locals = {
        name: err.name,
        message: err.message,
        details: err.details,
    };

    if ('fields' in err) {
        const details: Record<string, any> = {};

        for (const key in err.fields) {
            // lets remove the body. when validating body
            if (key.startsWith('body.')) {
                details[key.substr(5)] = err.fields[key];
            } else {
                details[key] = err.fields[key];
            }
        }

        if (process.env.NODE_ENV === 'production') {
            delete err.fields;
        }
        console.log(details);
        locals.details = details;
    }


    // render the error page
    // res.status(err.status || 500);

    let ctrl = new MY_Controller();
    if (err instanceof ValidateError){
        res.send(ctrl.liteResponse(global.responseCode.VALIDATION_ERROR, locals));
    }
    if (err instanceof Middleware_Error){
        res.send(ctrl.liteResponse(global.responseCode.NOT_AUTHORIZED, err));
    }
    else{
        console.log(err instanceof Middleware_Error, err instanceof Error);
        res.send(ctrl.liteResponse(global.responseCode.FAILURE, null, err.message));
    }
}

// the error handler is placed after routes
// if it were above it would not receive errors
// from app.get() etc
app.use(error);

export default app;

