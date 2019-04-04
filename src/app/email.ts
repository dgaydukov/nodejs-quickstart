import { resolve } from 'path';
const Email = require('email-templates');
import {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USE_SSL,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SENDER_EMAIL,
} from './env';

const transport = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_USE_SSL,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  }
};

const email = new Email({
  message: {
    from: SENDER_EMAIL,
  },
  send: true,
  transport,
});

/**
 * 
 * @param templateName - name of template under email-templates folder
 * @param to - recipient of the email
 * @param locals - object of params that goes to templates, like name, website, etc
 */
export const sendEmail = async (templateName: string, to: string, locals: Record<string, string>) => {
  email
    .send({
      template: resolve(__dirname, `../../email-templates/${templateName}`),
      message: {
        to,
      },
      locals,
    })
    .then(console.log)
    .catch(console.log);
}