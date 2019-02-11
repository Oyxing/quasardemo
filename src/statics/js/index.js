import { jsonpget } from 'src/statics/js/axios.js'

var post = document.location.port
var self
var thisget = (_this)=>{
    self = _this
}
var jsonDialog = {

}
function directoryDialog(_this,row,type,apioperate,fun){
    if(!_this.$store.state.example.buildPC){
        var ipc = require('electron').ipcRenderer;
            ipc.send('open-directory-dialog',type);
            jsonDialog = {
                _this:_this,
                row:row,
                apioperate:apioperate,
                fun:fun,
            }
        ipc.once('selectedItem',subDialog);
    }else{
        jsonDialog = {
            _this:_this,
            row:row,
            apioperate:apioperate,
            fun:fun,
        }
        if(jsonDialog.apioperate == '下载秘钥'){
            pcsecretKey(row)
        }else if(jsonDialog.apioperate == '下载copesql'){
            pcdowncopesql(row)
        }
    }
}
var subDialog = function (e,path){
        if(path == null){
            jsonDialog. _this.$message({
                message: '所选路径不能为空 !',
                type: 'warning'
            });
        }else{
            if(jsonDialog.apioperate == '上传秘钥'){
                UploadKey(jsonDialog._this,path,jsonDialog.fun)
            }else if(jsonDialog.apioperate == '下载秘钥'){
                secretKey(jsonDialog._this,jsonDialog.row,path)
            }else if(jsonDialog.apioperate == '下载copesql'){
                downcopesql(jsonDialog._this,jsonDialog.row,path)
            }
            return
        }
}

function UploadKey(_this,path,fun){
        var json = {
            url:"/rsa/uploadlocalrsakey",
            data:{"filepath":path}
        }
        var notify = _this.$notify.info({
            iconClass:"el-icon-loading",
            duration:0,
            showClose:false,
            title:"正在上传",
            message:' 上传文件秘钥!'
        });
        jsonpget(_this,json,(res)=>{
            notify.close()
            if(res.success == 0){
                _this.$message({
                    message:"上传成功",
                    type: 'success'
                });
                fun()
            }else{
                _this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        })
}
// 下载 秘钥
function secretKey(_this,row,path){
        var json = {
            url:"/rsa/downloadlocalrsakey",
            data:{"filename":row.name,"filedir":path}
        }
        var notify = _this.$notify.info({
            iconClass:"el-icon-loading",
            duration:0,
            showClose:false,
            title:"下载秘钥",
            message:' 下载秘钥!'+row.name
        });
        jsonpget(_this,json,(res)=>{
            notify.close()
            if(res.success == 0){
            _this.$message({
                    message: '下载秘钥成功 !',
                    type: 'success'
                });
            }else{
                _this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        })
   
}
// copesql 下载
function downcopesql(_this,row,path){
        var json = {
            url:"/user/downloadlocalfile",
            data:{
                filedir:path,
                fs_file_dir:row.fs_file_dir,
                fs_file_name:row.fs_file_name,
                memberuuid:row.memberuuid,
                keyfile:row.keyfile,
                fsserver:row.fsserver
            }
        }
       var notify = _this.$notify.info({
            iconClass:"el-icon-loading",
            duration:0,
            showClose:false,
            title:"正在下载",
            message: row.fs_file_name +' !'
          });
        _this.$store.state.example.dialogVisible = false
        jsonpget(_this,json,(res)=>{
            notify.close()
            if(!res.success){
                _this.$message({
                    message: '下载成功 !',
                    type: 'success'
                });
            }else{
                _this.$message({
                    message: res.msg +' !',
                    type: 'error'
                });
            }
           
        })
   
   
}
var server = "http://localhost:8080"
// PC端下载 秘钥 
function pcsecretKey(row){
        var url = server + "/rsa/downloadrsakey"
        window.open(url+"?name="+row.name)
}
// PC端 下载 数据库
function pcdowncopesql(row){
    jsonDialog._this.$confirm('下载数据库'+row.fs_file_name+', 是否继续?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
        }).then(() => {
            jsonDialog._this.$store.state.example.dialogVisible = false
            var datajson = {
                fs_file_dir:row.fs_file_dir,
                fs_file_name:row.fs_file_name,
                memberuuid:row.memberuuid,
                keyfile:row.keyfile,
                fsserver:row.fsserver
            }
            var urldatastr = ""
            for(var key in datajson){
                urldatastr += key+"=" + datajson[key]+'&'
            }
            var url = server + "/user/downloadfile"
            urldatastr = urldatastr.substring(0,urldatastr.length-1)
            window.open(url+"?"+urldatastr)
        }).catch(() => {

        });
}
export {
    secretKey,downcopesql,directoryDialog,thisget
}