import {Logger} from 'tslog';
import config from './config';

export default (type: 'silly'|'trace'|'debug'|'info'|'warn'|'error'|'fatal' , message:string) => {
    try{
        const log: Logger = new Logger({name:config.CONFIG_NAME, type: "json"});

        switch (type){
            case 'silly':
                log.silly(message);
                break;
            case 'trace':
                log.trace(message);
                break;
            case 'debug':
                log.debug(message);
                break;
            case 'info':
                log.info(message);
                break;
            case 'warn':
                log.warn(message);
                break;
            case 'error':
                log.error(message);
                break;
            case 'fatal':
                log.fatal(new Error(message));
                break;
        }
    }catch (e) {
        console.error(e.getMessage());
    }
}
