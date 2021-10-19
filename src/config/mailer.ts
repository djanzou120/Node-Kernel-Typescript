import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPPool from 'nodemailer/lib/smtp-pool';
import * as dotenv from 'dotenv';

dotenv.config();

const createMailTransport = (configOptions: SMTPPool.Options): Mail => {

    const MAILER_PORT : number = <number> parseInt( <string> process.env.MAILER_PORT);

    const options: SMTPPool.Options = {
        port: MAILER_PORT,
        host: process.env.MAILER_HOST,
        secure: false,//process.env.NODE_ENV !== "development", // use TLS

        auth: {
            pass: process.env.MAILER_PASSWORD,
            user: process.env.MAILER_USER,
        },
        ...configOptions,
    };

    return nodemailer.createTransport(options);
};

export const mailer = createMailTransport({ pool: true });