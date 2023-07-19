import nodemailer from "nodemailer"

export const sendEmail = (options) => {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        uesrname: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
      },
    });


    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        object: options.object,
        html: options.text,
    }


    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}


