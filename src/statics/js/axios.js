import { loginwin } from 'src/statics/js/public.js'
var server = 'http://localhost:8080'

function axiosget(_this, json) {
    var query = ""
    for (var key in json.data) {
        query += key + '=' + json.data[key] + '&'
    }
    query = query.substring(0, query.length - 1)
    return _this.$axios[json.type](server + json.url + '?' + query)

}

function jsonpget(_this, json, fun) {
    if (!json.data) {
        json.data = ''
    }
    _this.$jsonp(server + json.url, json.data).then((res) => {
            if (json.url != "/ver") {
                if (res.success == 4) {
                    loginwin()
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });

                } else if (res.msg == "未获取到用户信息，请先登录后再执行该操作") {
                    loginwin()
                    _this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                } else {
                    fun(res)
                }
            } else {
                fun(res)
            }

        })
        .catch((error) => {
            loginwin()
            if (_this.disabledbool) {
                _this.disabledbool = false
            }
            _this.$message({
                message: error,
                type: 'error'
            });
        })
}

export {
    axiosget,
    jsonpget
}