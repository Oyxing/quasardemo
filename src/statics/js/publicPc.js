import { auto } from 'src/statics/js/auto.js'
var seft

function uuidverify(_this) {
    seft = _this
    getCookies('useruuid', (data) => {
        var useruuid = data.value
        if (_this.$route.path != '/user' && _this.$route.path != '/user/reg') {
            if (!useruuid) {
                loginwin()
                _this.$router.push({ path: '/user' })
            }
        }
    })
}

function userwin(path) {
    if (!path) {
        path = '/'
    }
    seft.$router.push({ path: path })
}

function operatewin(path) {
    seft.$router.push({ path: path })
}

function loginwin() {
    seft.$router.push({ path: '/user' })
}

function vippay() {
    window.open('http://idcyw.cn/home/vip')
}

function hrefmanual() {
    window.open('http://idcyw.cn/static/upload/youbei.pdf')
}

function uppassword() {
    window.open('http://idcyw.cn/home/index')
}

function setCookies(name, value) {
    seft.$cookies.set(name, value)
}

function getCookies(name, fun) {
    fun({ value: seft.$cookies.get(name) })
}

function removeCookies(name) {
    seft.$cookies.set(name, '')
}

function storagename(name) {}

function getcookiesname() {}
// 关闭缩小 按钮
function operatebtn(_this) {
    auto()
    _this.btn = false
}
// 时间兑换
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}

function formatstoragenet(data) {
    var size = ""
    if (data < 1024) { //如果小于1KB转化成B  
        size = parseInt(data) + " B";
    } else if (data < 1024 * 1024) { //如果小于1MB转化成KB  
        size = parseInt(data / 1024) + " KB";
    } else if (data < 1024 * 1024 * 1024) { //如果小于1GB转化成MB  
        size = parseInt(data / (1024 * 1024)) + " MB";
    } else if (data < 1024 * 1024 * 1024 * 1024) { //如果小于1TB转化成GB 
        size = parseInt(data / (1024 * 1024 * 1024)) + " GB";
    } else { //其他转化成TB
        size = parseInt(data / (1024 * 1024 * 1024 * 1024)) + " TB";
    }
    return size
}

function bubbleSort(arr) {
    var len = arr.length;
    // CpuNum
    for (var i = 0; i < len; i++) {　　　　
        for (var j = 0; j < len - 1 - i; j++) {
            if (Number(arr[j].create_time) < Number(arr[j + 1].create_time)) { //相邻元素两两对比
                var temp = arr[j + 1]; //元素交换
                arr[j + 1] = arr[j];　　　　　　　　
                arr[j] = temp;　　　　　　
            }　　　　
        }　　
    }　　
    return arr;
}
export {
    uuidverify,
    userwin,
    loginwin,
    operatewin,
    hidewin,
    minwin,
    vippay,
    hrefmanual,
    uppassword,
    timestampToTime,
    formatstoragenet,
    setCookies,
    getCookies,
    removeCookies,
    storagename,
    getcookiesname,
    bubbleSort,
    operatebtn
}