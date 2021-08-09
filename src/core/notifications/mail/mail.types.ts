export interface MailFormat{
    from: string;
    to: string;
    subject: string;
    message?: string;
    html?: string;
    text?: string;
}