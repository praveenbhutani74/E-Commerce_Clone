const nodeMailer=require('nodemailer');


const EmailSent=async(opt)=>{

    const transporter=nodeMailer.createTransport({
        
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        
        service:process.env.STMP_SERVICE,
        auth:{
            user:process.env.STMP_MAIL,
            pass:process.env.STMP_PASSWORD
        },
        
        
    })

    const mailOption={
        from:process.env.STMP_MAIL,
        to:opt.email,
        subject:opt.subject,
        text:opt.message
    }

    await transporter.sendMail(mailOption);
}

module.exports=EmailSent;