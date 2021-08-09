import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPPool from 'nodemailer/lib/smtp-pool';

import config from './config';

const createMailTransport = (configOptions: SMTPPool.Options): Mail => {



    const options: SMTPPool.Options = {
        port: config.MAILER_PORT,
        host: config.MAILER_HOST,
        secure: config.NODE_ENV !== "development", // use TLS

        auth: {
            pass: config.MAILER_PASSWORD,
            user: config.MAILER_USER,
        },
        ...configOptions,
    };

    return nodemailer.createTransport(options);
};

export const mailer = createMailTransport({ pool: true })