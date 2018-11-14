var Client = require('ssh2').Client;
var ssh2serverFromSH = function (sh, serverOptions) {
    var conn = new Client();
    return new Promise(function (resolve, reject) {
        conn.on('ready', function () {
            conn.exec(sh, function (err, stream) {
                if (err) throw err;
                stream.on('close', function (code, signal) {
                    conn.end();
                }).on('data', function (data) {
                    resolve(data.toString());
                }).stderr.on('data', function (data) {
                    resolve(data.toString());
                });
            });
        }).connect({
            host: serverOptions.ip,
            port: serverOptions.port,
            username: serverOptions.username,
            password: serverOptions.passwd
        });
    })


};
exports.ssh2serverFromSH = ssh2serverFromSH;
// var sh = "docker version"
// async function test(sh) {
//     let result = await ssh2serverFromSH(sh, { ip: "test.riskeys.com", username: "jun.chen", passwd: "7rJV9549m7+rZQ==", port: "40022" })
//     console.log(result)
// }
// test(sh)
// ssh2serverFromSH(sh, { ip: "test.riskeys.com", username: "jun.chen", passwd: "7rJV9549m7+rZQ==", port: "40022" }).then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err.toString())
// })