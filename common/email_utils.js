
var nodemailer = require('nodemailer');
var _title = "";
if (process.env.NODE_ENV == "production") {
    _title = ""
} else {
    _title = "【测试环境】"
}
var m = {};


/**
 *{
    to: 'qi.wang@anyi-tech.com',  // 收件人，多人用分号“;”隔开
    subject: 'anyi',     //邮件主题
    text: 'haohao!!',   //邮件内容
    html: '<a href="http://www.baidu.com">nihao1</a><div>dddwewerwe</div>',   //带有html格式的内容，如果使用 html 参数，则text参数是无效的
    attachments: [   //附件
        {
            filename: 'text0.txt',   //附件的名称
            content: 'hello world!'   //附件的文本内容
        },
        {
            filename: 'text1.xlsx',    //附件名称
            path: 'D:/123.xlsx'          //附件的路径
        }
    ]
}
 * 发送邮件
 */
m.send_mail = function (param) {
    if (!param) {
        return Promise.reject('需要参数');

    }
    if (!param.to && !param.subject) {
        return Promise.reject('参数不完整');
    }
    var reg = new RegExp("[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
    if (!reg.test(param.to)) {
        return Promise.reject('收件人地址格式不对');
    }
    if (!param.text && !param.html) {
        return Promise.reject('邮件正文不能为空');
    }
    if (param.attachments) {
        if (!(param.attachments instanceof Array)) {
            return Promise.reject('附件列表必须为数组');
        }
        for (var n in param.attachments) {
            if (!param.attachments[n].filename) {
                return Promise.reject('附件文件名不能为空');
            }
            if (!param.attachments[n].content && !param.attachments[n].path) {
                return Promise.reject('附件文件内容或者地址错误');
            }
        }
    }
    //new    uPW7DDBkiN4CGmJx
    //old    FengXianGuanJia123
    var transporter = nodemailer.createTransport({
        // host: "smtp.exmail.qq.com", // 主机
        // auth: {
        //     user: 'service@anyi-tech.com',
        //     pass: 'uPW7DDBkiN4CGmJx'
        // },
        service: 'exmail.qq.com',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: 'service@anyi-tech.com',
            pass: 'uPW7DDBkiN4CGmJx'
        }
    });

    var mailOptions = {
        from: _title + '安逸科技<service@anyi-tech.com> '
    };

    mailOptions.to = param.to;
    if (param.cc) {
        mailOptions.cc = param.cc;
    }
    mailOptions.subject = param.subject;
    if (param.text) {
        mailOptions.text = param.text;
    }
    if (param.html) {
        mailOptions.html = param.html;
    }
    if (param.attachments) {
        mailOptions.attachments = param.attachments;
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return Promise.reject(error);
        } else {
            return Promise.resolve(info.response);
        }
    });
};

module.exports = exports = m;
