const nodemailer = require("nodemailer");

class XL_GOI_THU_DIEN_TU {
    Goi_Thu_Lien_he(from, to, subject, body) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ducvominh706@gmail.com', // User gmail 
                pass: "tvfswfcptssdovjk"

            }
        });

        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: body
        };
        // Gọi phương thức sendMail -> trả về dạng promise
        return transporter.sendMail(mailOptions)
    }

}

var Goi_thu = new XL_GOI_THU_DIEN_TU()
module.exports = Goi_thu