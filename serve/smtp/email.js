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
            user: '你的QQ邮箱',
            pass: '你的QQ邮箱SMTP授权码'
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

module.exports = sendEmail;