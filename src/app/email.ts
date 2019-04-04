import { resolve } from 'path';
const Email = require('email-templates');

const transport = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_IS_SSL,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  }
};

const email = new Email({
  message: {
    from: process.env.SENDER_EMAIL,
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