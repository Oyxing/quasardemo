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
var ipc, session

ipc = require('electron').ipcRenderer;
session = require('electron').remote.session

function userwin(path) {
    if (!path) {
        path = '/'
    }
    ipc.send('user-window')
    seft.$router.push({ path: path })
    seft.$store.state.example.routepath = ''
}

function operatewin(path) {
    if (path != '/evenmore') {
        ipc.send('operate-window')
    }
    seft.$router.push({ path: path })
}

function loginwin() {
    ipc.send('login-window')
    seft.$router.push({ path: '/user' })
}



function minwin() {
    ipc.send('window-min')
}

function hidewin() {
    ipc.send('window-hide')
}

function vippay() {
    ipc.send('href-vip')
}

function hrefmanual() {
    ipc.send('href-manual')
}

function uppassword() {
    ipc.send('up-password')
}

function setCookies(name, value) {
    const cookie = {
        url: "http://localhost:8080",
        name: name,
        value: value,
    };
    session.defaultSession.cookies.set(cookie, (error) => {
        if (error) console.error(error)
    })
}

function getCookies(name, fun) {
    session.defaultSession.cookies.get({ url: "http://localhost:8080", name: name }, (error, cookies) => {
        if (cookies[0]) {
            fun(cookies[0])
        } else {
            fun({ value: "" })
        }
    })
}

function removeCookies(name) {
    const cookie = {
        url: "http://localhost:8080",
        name: name,
        value: "",
    };
    session.defaultSession.cookies.set(cookie, (error) => {
        if (error) console.error(error)
    })
}
// 获取 已登录用户
var getcookiesnamearr = []

function getcookiesname(_this) {
    session.defaultSession.cookies.get({ url: "http://localhost:8080", name: "loginuser" }, (error, cookies) => {
        if (cookies[0]) {
            if (cookies[0].value) {
                getcookiesnamearr = cookies[0].value.split(",")
            }
        }
        _this.$store.state.example.userdata = Array.from(new Set(getcookiesnamearr))
    })
}
// 存储 用户
function storagename(name) {
    var newgetnamearr = Array.from(new Set(getcookiesnamearr))
    var jsonarr = newgetnamearr.join(",")
    if (jsonarr) {
        var valuestr = jsonarr + "," + name
    } else {
        var valuestr = name
    }
    const cookie = {
        url: "http://localhost:8080",
        name: "loginuser",
        value: valuestr,
    };
    session.defaultSession.cookies.set(cookie, (error) => {
        if (error) console.error(error)
    })
}
// 关闭缩小 按钮
function operatebtn(_this) {
    _this.btn = true
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
    operatewin,
    loginwin,
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