<template>
    <div class="pagecomp ">
       <p>请保存个人私钥后删除,下载本分数据时上传私钥。<span >后缀名为pri.pem 是 私钥，后缀名为pub.pem 是 公钥</span></p>
        <div class="secretkeysow">
            <div class="secretkey" v-for="(item,index) in tableData" :title="item.name" :key="index">
                <div class="secretbj" :class="item.type== 'public'?'g_y':'m_y' ">
                    <span>{{item.type== "public"?'公钥':'私钥'}}</span>
                    <span>{{timestampToTime(item.intime)}}</span>
                </div>
                <el-button type="success" @click="downsecret(item)">下载</el-button>
                <el-button type="danger" @click="delsecret(item)">删除</el-button>
            </div>
            <div class="buttonbox" v-if="tableData.length == 1 && btnnone" style="float: left;"> 
                <el-button v-if="!buildPC" type="primary" @click="uploadsecret">上传密钥</el-button>
                <el-upload
                    v-else
                    :on-success="handleSuccess"
                    :before-upload="beforeUpload"
                    :action="action"
                    :with-credentials="true"
                    name="file"
                    :data="{'name':'file'}"
                    :show-file-list="false">
                    <el-button type="primary">上传密钥</el-button>
                </el-upload>
            </div>
        </div>
       
    </div>
</template>

<script>
import { userwin,tablebottom,timestampToTime } from 'src/statics/js/public.js'
import { jsonpget } from 'src/statics/js/axios.js'
import { secretKey,directoryDialog } from 'src/statics/js/index.js'
import { confirm } from 'src/statics/js/confirm.js'
export default {
    data() {
        return {
            buildPC:this.$store.state.example.buildPC,
            userwin:userwin,
            post:document.location.port,
            btnnone:false,
            loading: true,
            hidebottom:true,
            action:'http://localhost:8080/rsa/uploadrsakey',
            timestampToTime:timestampToTime,
            tableData:[
            ],
            columns:[ 
                {
                name:'type',
                required: true,
                label: '类型',
                align: 'center',
                field: 'type',
                },
                {
                required: true,
                label: '文件名',
                align: 'center',
                field: 'name',
                },{
                name:'intime',
                required: true,
                label: '日期',
                align: 'center',
                field: 'intime',
                },
                {
                name:'btn',
                align: 'center',
                label: '操作'
                }
            ]
        }
    },
    created() {
        this.getrsakey()
        this.$store.state.example.secretkeyfun = this.getrsakey
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
                    if(res.msg){
                        this.btnnone = true
                    }
                    if(res.msg.length <= 0){
                         this.$store.state.example.secretkey = false
                    }
                    this.tableData = res.msg
                    this.loading = false
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
        downsecret(row){
            this.$confirm('下载秘钥, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
                }).then(() => {
                    directoryDialog(this,row,'openDirectory','下载秘钥')
                }).catch(() => {

                });
        },
        handleSuccess(response, file, fileList){
            if(response.success==0){
                this.$message({
                    message: '文件上传成功 !',
                    type: 'success'
                });
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
        delsecret(row){
            var jsondata = {
                title:'删除秘钥',
                url:'/rsa/deletersakey',
                data:{name:row.name},
                fun:this.getrsakey,
                
            }
            confirm(this,jsondata)
        },
        
    }
}
</script>

<style scoped>
.pagecomp p {
    margin-top: 44px;
    margin-bottom: 38px;
    text-align: center;
    font-size: 14px;
    color: #ccc;
}
.secretkeysow{
    width: 385px;
    margin: auto;
}
.buttonbox{
    display:flex;
    width: 164px;
    height: 217px;
}

.secretkey{
    float: left;
    width: 164px;
    text-align: center;
}
.secretkey:nth-child(1){
    margin-right: 52px;
}
.secretkey button{
    width: 77px;
    height: 22px;
    margin-top: 12px;
    padding: 0px 0px !important;
    text-align: center;
    line-height: 0px;
}
.secretbj{
    width: 100%;
    height: 217px;
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.08);
}
.m_y{
    background: url("~assets/img/m_y.png") no-repeat center;
}
.g_y{
    background: url("~assets/img/g_y.png") no-repeat center;
}
.secretkey span{ 
    display: inline-block;
    width: 100%;
}
.secretkey span:nth-child(1){
    font-weight: bold;
    font-size: 20px;
    margin-top: 30px;
}
.secretkey span:nth-child(2){
    font-size: 12px;
    color: #ccc;
}
</style>

