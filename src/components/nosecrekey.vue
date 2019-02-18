<template>
    <div class="pagecomp ">
        <div class="pagecompheard">   
            获取柚备密钥对（公钥/私钥）
        </div>
        <div class="showmess secretkey">
            <div class="secretbox">
                <p class="nosecrekey-p">柚备的许多功能都是由密钥来进行验证才能操作，通过请求加入密钥开启所需功能</p>
                <ul>
                    <li>需要获取秘钥,点击生成秘钥</li>
                    <li>如何使用密钥，你需要详细阅读<span @click="hrefmanual">《柚备使用手册》</span></li>
                </ul>
                <el-button class="btn" type="warning" @click="creatsecret">
                    生成秘钥
                </el-button>
            </div>
             <div class="secretbox">
                <p class="nosecrekey-p">柚备的许多功能都是由密钥来进行验证才能操作，通过请求加入密钥开启所需功能</p>
                <ul>
                    <li>当有自己的密钥是,请点击上传</li>
                    <li>如何使用密钥，你需要详细阅读 <span @click="hrefmanual">《柚备使用手册》</span></li>
                </ul>
                <el-button v-if="!buildPC" class="btn btn2" @click="uploadsecret" type="primary">
                    上传秘钥
                </el-button>
                <el-upload
                    v-else
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    style="display: inline-block;"
                    class="upload-demo "
                    :action="action"
                    :with-credentials="true"
                    name="file"
                    :data="{'name':'file'}"
                    :show-file-list="false">
                    <el-button type="primary" class="btn btn2">上传秘钥</el-button>
                </el-upload>
            </div>
        </div>
    </div>
</template>
<script>
import { userwin,tablebottom,timestampToTime,hrefmanual } from 'src/statics/js/public.js'
import { jsonpget } from 'src/statics/js/axios.js'
import { secretKey,directoryDialog } from 'src/statics/js/index.js'
import { confirm } from 'src/statics/js/confirm.js'
export default {
    data() {
        return {
            hrefmanual:hrefmanual,
            buildPC:this.$store.state.example.buildPC,
            userwin:userwin,
            action:'http://localhost:8080/rsa/uploadrsakey',
            timestampToTime:timestampToTime,
        }
    },
    created() {
        this.getrsakey()
    },
    mounted(){
        var box = document.getElementById("box")
        var bodybox = document.getElementsByClassName('bodybox')[0]
        var bodyhandlebox = document.getElementsByClassName('bodyhandlebox')[0]
        if(!bodyhandlebox){
            bodybox.className += ' bodyhandlebox';
        }
        if(box){
            box.className = "handlebox"
        }
    },
    methods:{
        getrsakey:function(){
            var json = {
                url:'/rsa/getrsakey',
            }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    if(res.msg.length <= 0){
                         this.$store.state.example.secretkey = false
                    }else{
                        this.$store.state.example.secretkey = true
                    }
                }else{
                    this.$message({
                        message: res.msg +' !',
                        type: 'error'
                    });
                }
            })
        },
        creatsecret(){
             var jsondata = {
                title:' 生成秘钥',
                url:'/rsa/gen-rsa-key',
                data:'',
                fun:this.getrsakey
            }
            confirm(this,jsondata)
        },
        handleSuccess(response, file, fileList){
            if(response.success==0){
                this.$message({
                    message: '文件上传成功 !',
                    type: 'success'
                });
                this.getrsakey()
            }else{
                this.$message.error('文件上传失败，请稍后重试 !');
            }
        },
        beforeUpload(file){
            const extension = file.name.split('.')[1] === 'pem'
            if (!extension) {
                this.$message({
                    message: '上传文件格式只能是 pem !',
                    type: 'warning'
                });
                return false;			
            }
        },
        handleChange(file, fileList) {
            // console.log("handleChange")
        },
        uploadsecret(){
            directoryDialog(this,[],'openFile','上传秘钥',this.getrsakey)
        },
        
    }
}
</script>

<style >
.secretbox{
    margin-top: 22px;
}
.secretbox p {
    font-size: 14px;
}
.secretbox ul li{
    list-style: inside;
    font-size: 12px;
}
.secretbox .btn{
    width: 147px;
    height: 34px;
    line-height: 0;
    margin-top: 17px;
 
}
.secretbox .btn2{
background-color: #72a0ff !important;
    border-color: #72a0ff !important;
}
.secretbox ul li{
    color:#9a9a9a;
    margin-bottom:3px;
    font-size: 14px;
}
.secretbox ul li span  {
    color: rgb(122, 166, 255);
    border-bottom: 1px solid rgb(122, 166, 255);
    cursor: pointer;
}
.nosecrekey-p{
    margin: 0 0 10px !important;
    font-size: 16px !important;
    color:#7c7c7c !important;
}
.secretbox .btn{
    margin-top: 12px !important;
}
</style>

