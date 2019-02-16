<template>
<div class="pagecomp ">
    <div class="title_box ">
        <div class="detail_title heardbj" style="background-image: url('../assets/img/rw_header_bj.png');">
            <div class="detailicon fl iconfont " :class="datamsg[activeName].class"></div>
            <div class="detailword fl">
                <h3 class="detailh3">{{datamsg[activeName].detailh3}}</h3>
                <p class="detailp">{{datamsg[activeName].detailp}}</p>
            </div>
            <div class="backup" title="返回" @click="userwin('/evenmore')">
                <i class="iconfont icon-ffanhui"></i>
            </div>
        </div>
    </div>
    <div class="showmess" element-loading-text="正在加载...">
       <el-tabs v-model="activeName" type="card" tab-position="left">
            <el-tab-pane label="任务列表" name="task">
                <taskDom/>
            </el-tab-pane>
            <el-tab-pane label="私钥秘钥" name="secretkey">
                <secretkey v-if="secretkey"/>
                <nosecrekey v-else/>
            </el-tab-pane>
            <el-tab-pane label="订购" name="order">
                <order/>
            </el-tab-pane>
            <el-tab-pane label="备份详情" name="copy"><copy/></el-tab-pane>
        </el-tabs> 
    </div>
</div>
</template>
<script>
import { jsonpget } from 'src/statics/js/axios.js'
import { confirm } from 'src/statics/js/confirm.js'
import taskDom from 'src/components/taskDom.vue' 
import copy from 'src/components/copy.vue'
import order from 'src/components/order.vue'
import nosecrekey from 'src/components/nosecrekey.vue'
import secretkey from 'src/components/secretkey.vue'
import { userwin,timestampToTime } from 'src/statics/js/public.js'
export default {
    components:{
      taskDom:taskDom,
      copy:copy,
      order:order,
      secretkey:secretkey,
      nosecrekey:nosecrekey
    },
    data() {
        return {
            activeName:'task',
            userwin:userwin,
            loading:true,
            dataloading:true,
            btnnone:false,
            timestampToTime:timestampToTime,
            ipconfig:false,
            hidebottom:true,
            tableData:[],
            datamsg:{
                task:{
                    class:'icon-renwu',
                    detailh3:'相关任务',
                    detailp:'恢复简单，避免数据损坏',
                }, 
                secretkey:{
                    class:'icon-miyao',
                    detailh3:'私钥秘钥',
                    detailp:'恢复简单，避免数据损坏',
                }, 
                order:{
                    class:'icon-dinggou',
                    detailh3:'订购服务',
                    detailp:'恢复简单，避免数据损坏',
                }, 
                copy:{
                    class:'icon-beifen',
                    detailh3:'备份详情',
                    detailp:'恢复简单，避免数据损坏',
                }
            }
        }
    },
    created() {
        this.activeName = this.$route.params.path
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
            }
        })
    },
    mounted() {
        var box = document.getElementById("box")
        if(box){
            box.className = "handlebox"
        }
    },
    computed:{
        secretkey:{
            get(){
                return this.$store.state.example.secretkey
            },
            set(){
                return this.$store.state.example.secretkey
            }
        }
    }
}
</script>

<style >

</style>
