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
    from: process.env.EMAIL_FROM,
  },
  send: true,
  transport,
});

export const sendEmail = async (type: string, to: string, params: Record<string, string>) => {
  email
    .send({
      template: resolve(__dirname, `../../email-templates/${type}`),
      message: {
        to,
      },
      locals: {
        ...params,
      },
    })
    .then(console.log)
    .catch(console.log);
}