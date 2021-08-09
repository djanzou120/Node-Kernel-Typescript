import config from "../../../config/config";
import {mailer} from "../../../config/mailer";
import {MailFormat} from "./mail.types";
import file from "./../../file/file.manager"
import nodemailer from 'nodemailer';
import path from "path";

class Mailer {

    modelPath:string = path.join(__dirname, config.MAIL_TEMPLATE_FOLDER || "./../../../../public/templates/mail/");

    /**
     *
     * @param to String sender address
     * @param subject String email subject
     * @param message String email message
     * @param language
     */

    async send(to: string, subject: string, message: string, language: string): Promise<void> {
        try{
            let options:MailFormat = {
                from: '"'+config.MAILER_FROM_NAME+'" <'+config.MAILER_FROM_EMAIL+'>',
                to: to,
                subject: subject,
                html: message
            }
            let info:any = await mailer.sendMail(options)

            console.log("Message sent: %s", info.messageId);


            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


        }catch (err){
            console.log(err);
        }
    }

    /**
     * @params to String sender address
     * @params subject String email subject
     * @params modelMane String the reference model name for the mail
     * @params data Object the mapping data between model and real data
     * @params path String the modele file path (disturbing because if fs )
     */

    async sendFromTemplate(to: string, subject: string, language: string, modelName: string, data?: object): Promise<void> {
        try{
            let message = await this.normalizeModel(modelName, language, data);
            await this.send(to, subject, message, language);
        } catch(error){
            console.log(error);
        }

    }

    /**
     * @params modelMane String the reference model name for the mail
     * @params data Object the mapping data between model and real data
     * @params path String the modele file path (disturbing because if fs )
     */

    async normalizeModel(modelName: string, language: string, data: any): Promise<string> {
        try{
            let content = await file.readFile(`${this.modelPath+language+"/"+modelName}.html`)
            for(const key in data) {
                const regExp = new RegExp(`{{${key}}}`, 'gi');
                content = content.toString().replace(regExp, data[key]);
            }
            return content;
        } catch (e) {
            return e;
        }

    };
}

export default (new Mailer())