import {MY_Controller} from '../../../src/core/generic/MY_Controller';
import Mailer from '../../../src/core/notifications/mail/mail.class';

export interface IResponse {
    /**
     * This is the code of response you consult the code list for known what this code meaning
     */
    code: number;

    /**
     * This is the data (Optionnal)
     */
    data: any;

    /**
     * This is the message of the request (Optionnal)
     */
    message?: string;

    /**
     * This is the token givin on login (Optionnal)
     */
    token?: string;
}

class Controller extends MY_Controller {
    //Implements methods of main controller
    constructor() {
        super();
    }

    public async sendMail (config : {
        to : string,
        subject : string,
        message : string
    }) : Promise<void> {
        return await Mailer.send(config.to, config.subject, config.message, "")
    }

    public async sendMailFromTemplate (config : {
        to : string | string[],
        subject : string,
        modelName : string,
        data ?: object
    }) : Promise<void> {
        return await Mailer.sendFromTemplate(config.to, config.subject, "", config.modelName, config.data);
    }
}

export default Controller;