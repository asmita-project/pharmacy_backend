const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'asmitagaikwad2000@gmail.com',
        pass: 'pharmacy'
    }
});

// Configure the template engine
transporter.use('compile', hbs({
    viewEngine: {
        extname: '.hbs',
        partialsDir: path.resolve('./views'),
        layoutsDir: path.resolve('./views'),
        defaultLayout: '',
    },
    viewPath: path.resolve('./views'),
    extName: '.hbs'
}));

// Send mail function
const sendMail = async (to, subject, context) => {
    const mailOptions = {
        from: 'asmitagaikwad2000@gmail.com',
        to: to,
        subject: subject,
        template:'email',
        context: context
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Export the sendMail function
module.exports = sendMail;
