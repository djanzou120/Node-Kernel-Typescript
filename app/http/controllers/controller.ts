import {MY_Controller} from '../../../src/core/generic/MY_Controller';
import Mailer from '../../../src/core/notifications/mail/mail.class';
import {ValidateError} from 'tsoa';

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

    public validate (schema : any, fields : any)
    {
        const validation = schema.validate(fields, {abortEarly : false});

        let errors : any = {};
        if (validation.error){
            for (const field of validation.error.details){
                errors[field.context.key] = field.message
            }
            throw new ValidateError(errors, "Validation error")
        }
        return;
    }
}

export default Controller;