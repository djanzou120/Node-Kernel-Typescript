import http from 'http';
import portfinder from 'portfinder';
import {ApolloServer} from "apollo-server-express";
import {ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer} from 'apollo-server-core';

import app from './app';
import {MY_Controller} from '../core/generic/MY_Controller';
import schema from "../../app/graphQl/schema";

declare var global: any;

export default async () => {
    let availablePort : number = <number> parseInt(<string> process.env.PORT);
    if (process.env.NODE_ENV == "development"){
        availablePort = await portfinder.getPortPromise({
            port : <number> parseInt(<string>process.env.PORT ?? (<string>process.env.APP_PORT || "3000")),
        });
    }

    app.set('port', availablePort);

    global.appPort = availablePort;

    //Create HTTP Server
    const server = http.createServer(app);

    //Apollo Server Initiation
    const apolloServer = new ApolloServer({
        schema,
        plugins : [
            ApolloServerPluginDrainHttpServer({httpServer : server}),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ],

    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app})



    //Catch request in case of not found url
    app.use((req, res) => {
        let ctrl = new MY_Controller();
        res.send(ctrl.liteResponse(global.responseCode.NOT_FOUND, {
            AppName: process.env.APP_NAME,
            AppUrl: process.env.APP_DOMAIN + ':' + global.appPort,
            path: req.originalUrl,
        }))
    })

    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + availablePort;
        console.log('Listening on Port : ' + bind);
        console.log('GraphQl Path : ' + apolloServer.graphqlPath)
    });

    server.listen(availablePort, ()=>{});
}
