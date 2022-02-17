import http from 'http';
import portfinder from 'portfinder';

import app from './app';

declare var global: any;

export default async () => {
    let availablePort : number = <number> parseInt(<string> process.env.PORT);
    if (process.env.NODE_ENV == "development"){
        availablePort = await portfinder.getPortPromise({
            port : availablePort ?? 3000,
        });
    }

    app.set('port', availablePort);

    global.appPort = availablePort;

    const server = http.createServer(app);

    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + availablePort;
        console.log('Listening on ' + bind);
    });

    server.listen(availablePort, ()=>{});
}
