import config from "../../../config/config";
import {SNS} from "../../../config/aws";
import {SMSFormat} from "./sms.types";
import path from "path";

class Mailer {

    modelPath:string = path.join(__dirname, config.MAIL_TEMPLATE_FOLDER || "./../../../../public/templates/sms/");

    /**
     *
     * @param phoneNumber
     * @param content
     * @param language
     */

    async send(phoneNumber: string, content: any, language: string): Promise<any|boolean> {
        try{


            // Create publish parameters
            const params: SMSFormat = {
                "PhoneNumber": phoneNumber,
                "Subject": content.subject,
                "Message": content.message
            };
            const publishTextPromise = SNS.publish(params).promise();
            return await publishTextPromise;
        }catch (err){
            console.log(err);
            return false
        }
    }

    /**
     * @params to String sender address
     * @params subject String email subject
     * @params modelMane String the reference model name for the mail
     * @params data Object the mapping data between model and real data
     * @params path String the modele file path (disturbing because if fs )
     */

    async sendFromTemplate(to: string, language: string, modelName: string, data?: object): Promise<void> {
        try{
            let content = await this.normalizeModel(modelName, language, data);
            await this.send(to, content, language);
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
            let content = require(`${this.modelPath+language+"/"+modelName}.json`)
            for(const key in data) {
                const regExp = new RegExp(`{{${key}}}`, 'gi');
                content.message = content.message.toString().replace(regExp, data[key]);
            }
            return content;
        } catch (e) {
            return e;
        }

    };
}

export default (new Mailer())