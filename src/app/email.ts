
export const sendEmail = async(from: string, to: string, subject: string, text: string) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: text
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            }
        },
        Source: from,
    };
}