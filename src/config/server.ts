import http from 'http';
import portfinder from 'portfinder';
import {ApolloServer, ServerRegistration} from "apollo-server-express";
import {ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled} from 'apollo-server-core'

import app from './app';
import {MY_Controller} from '../core/generic/MY_Controller';
import schema from "../../app/graphQl/schema";

declare var global: any;

export default async () => {

    //TODO optimize this method
    // if (process.env.NODE_ENV != 'development'){
    //     // await checkDependency();
    // }

    let availablePort : number = <number> parseInt(<string> process.env.PORT);
    if (process.env.NODE_ENV == "development"){
        availablePort = await portfinder.getPortPromise({
            port : <number> parseInt(<string>process.env.PORT ?? (<string>process.env.APP_PORT || "3000")),
        });
    }

    app.set('port', availablePort);

    global.appPort = availablePort;

    //Apollo Server Initiation
    const apolloServer = new ApolloServer({
        schema,
        plugins : [
            ApolloServerPluginLandingPageGraphQLPlayground({})
        ]
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app})

    const server = http.createServer(app);

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
