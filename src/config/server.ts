import http from 'http';
import portfinder from 'portfinder';

import app from './app';

declare var global: any;

export default async () => {
    let availablePort : number = <number> parseInt(<string> process.env.PORT);

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
