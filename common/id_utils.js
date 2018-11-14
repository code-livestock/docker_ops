function Random() {
    var arr = [];
    function getRandom() {
        var random = Math.floor(Math.random() * 10000);
        //判断生成的数在数组中是否存在，判断是否是6位数
        //如果不存在而且是6位数，放入数组
        if (random.toString().length == 4 && arr.indexOf(random) == -1) {
            arr.push(random)
        } else {
            //如果存在或者不是6位数，接着调用这个函数，生成满足要求的随机数
            getRandom();
        }
    }
    getRandom();
    return arr;
}
var getClaimId = function () {
    var date = new Date();
    var last2Year = date.getFullYear().toString().slice(2);
    var month = date.getMonth();
    month = month + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = date.getDate();
    var random = Random();
    var claim_id = last2Year + month + day + random[0];
    return claim_id;
}
exports.getClaimId = getClaimId;