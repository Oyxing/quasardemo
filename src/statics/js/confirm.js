import { jsonpget } from 'src/statics/js/axios.js'

function confirm (_this,json){
    _this.$confirm(json.title+', 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
        }).then(() => {
                if(json.data){
                    var jsons = {
                        url:json.url,
                        data:json.data
                    }
                }else{
                    var jsons = {
                        url:json.url
                    }
                }
                jsonpget(_this,jsons,(res)=>{
                    if(!res.success){
                       json.fun()
                       _this.$message({
                            message: json.title +'成功 !',
                            type: 'success'
                        });
                    }else{
                        _this.$message({
                            message: res.msg +' !',
                            type: 'error'
                        });
                    }
                })
        }).catch(() => {

        });
}

export{
    confirm
}