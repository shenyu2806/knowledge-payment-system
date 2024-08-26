const nodemailer = require('nodemailer');
const fs = require('fs').promises;

// 辅助函数：替换模板中的占位符
function replacePlaceholders(template, placeholders) {
    return template.replace(/{{(\w+)}}/g, (match, p1) => placeholders[p1] || '');
}

async function sendEmail(options) {
    // 创建邮件传输器
    let transporter = nodemailer.createTransport({
        // ...（SMTP设置）
        service: 'qq',
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'tuzwyx@foxmail.com',
            pass: 'qpfnnsvadoukbcda'
        }
    });

    // 读取HTML模板
    let templateHtml = await fs.readFile("smtp/moban.html", 'utf8');

    // 替换模板中的占位符
    if (options.placeholders) {
        templateHtml = replacePlaceholders(templateHtml, options.placeholders);
    }

    // 发送邮件
    let mailOptions = {
        ...options, // 展开原始选项以保留其他设置
        html: templateHtml, // 使用替换后的HTML作为邮件正文
    };
    delete mailOptions.templatePath; // 清理不需要的选项
    delete mailOptions.placeholders; // 清理占位符数据

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// async function sendEmail(email) {
//     let transporter = nodemailer.createTransport({
//         service: 'qq', // 注意：'qq' 不是直接支持的，但你可以使用通用的 SMTP 设置
//         // 或者使用以下的 SMTP 设置（更通用的方式）
//         host: 'smtp.qq.com',
//         port: 465, // SMTP 端口，对于 SSL 是 465，对于 STARTTLS 是 587
//         secure: true, // 启用 SSL
//         auth: {
//             user: 'tuzwyx@foxmail.com', // 你的QQ邮箱地址
//             pass: 'qpfnnsvadoukbcda' // 你的QQ邮箱SMTP授权码
//         }
//     });

//     let mailOptions = {
//         from: '"团子网"tuzwyx@foxmail.com', // 发送者地址
//         to: email, // 接收者邮箱
//         subject: "测试邮件", // 主题行
//         // text: "你看到这封邮件，代表邮件服务配置正确啦！", // 纯文本正文
//         //<p>你看到这封邮件，代表邮件服务配置正确啦！</p><p>恭喜你可以使用邮件服务啦！</p>
//         // HTML正文
//         html: ""
//     };

//     let info = await transporter.sendMail(mailOptions);

//     console.log('Message sent: %s', info.messageId);
// }
//sendEmail().catch(console.error);

module.exports = sendEmail;