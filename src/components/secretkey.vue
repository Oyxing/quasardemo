<template>
    <div class="pagecomp ">
        <div class="showmess"  v-loading="loading" element-loading-text="正在加载...">
            <div v-if="tableData.length <= 0 && btnnone" class="layui-form-item choice"> 
                <div class="mt50" style="width: 100%;text-align: center;margin-top:50px;">
                  <el-button type="danger" @click="creatsecret">生成密钥对</el-button>
                  <el-button type="primary" v-if="post == 8082" @click="uploadsecret">上传密钥</el-button>
                  <el-upload
                    v-else
                    style="display: inline-block;margin-left: 30px;"
                    class="upload-demo"
                    :action="action"
                    :with-credentials="true"
                    name="file"
                    :data="{'name':'file'}"
                    :show-file-list="false">
                    <el-button type="primary">点击上传</el-button>
                   </el-upload>
                </div>
                <div class="nonebox">
                    <img src="statics/img/NOneimg.png" alt="">
                    <p>暂无数据</p>
                </div>
            </div>
            <div v-else-if="tableData.length == 1 && btnnone" class="layui-form-item choice"> 
                <div class="mt10" style="width: 100%;text-align: center;">
                  <el-button type="primary" v-if="post == 8082" @click="uploadsecret">上传密钥</el-button>
                    <el-upload
                    v-else
                    style="display: inline-block;margin-left: 30px;"
                    class="upload-demo"
                    :with-credentials="true"
                    name="file"
                    :data="{'name':'file'}"
                    :action="action"
                    :show-file-list="false">
                    <el-button type="primary">点击上传</el-button>
                    </el-upload> 
                </div>
            </div>
            <div v-if="tableData.length >= 1" class="showtable keyshow" > 
               <q-table
                   
                    :data="tableData"
                    :columns="columns"
                    row-key="label"
                    rows-per-page-label="每页行数:"
                    :hide-bottom="hidebottom"
                >
                    <q-td slot="body-cell-type" slot-scope="props" :props="props">
                        <span v-if="props.row.type == 'private'">私钥</span>
                        <span v-else-if="props.row.type == 'public'">公钥</span>
                    </q-td>
                    <q-td slot="body-cell-intime" slot-scope="props" :props="props">
                        {{timestampToTime(props.row.intime)}}
                    </q-td>
                    <q-td slot="body-cell-btn" slot-scope="props" :props="props">
                        <div class="q-mb-xs">
                            <q-btn label="下载" color="green-6"  @click="downsecret(props.row)" style="margin-right:20px;"/>
                            <q-btn label="删除" color="red-7"  @click="delsecret(props.row)"/>
                        </div>
                    </q-td>
                      <div id="table-bottom" slot="pagination" slot-scope="props" class="row flex-center q-py-sm">
                            <q-btn
                                round dense size="sm" icon="undo" color="secondary" class="q-mr-sm"
                                :disable="props.isFirstPage"
                                @click="props.prevPage"
                            />
                            <div class="q-mr-sm" style="font-size: small">
                            {{ props.pagination.page }} / {{ props.pagesNumber }}
                            </div>
                            <q-btn
                                round dense size="sm" icon="redo" color="secondary"
                                :disable="props.isLastPage"
                                @click="props.nextPage"
                            />
                        </div>
                </q-table>
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

<style >

</style>

