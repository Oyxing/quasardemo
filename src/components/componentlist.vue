<template>
<div class="pagecomp ">
    <div class="title_box ">
        <div class="detail_title heardbj">
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
            <el-tab-pane label="私钥秘钥" name="secretkey">私钥秘钥</el-tab-pane>
            <el-tab-pane label="订购" name="order">订购</el-tab-pane>
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
import { userwin,timestampToTime } from 'src/statics/js/public.js'
export default {
    components:{
      taskDom:taskDom,
      copy:copy
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
    },
    mounted() {
        var box = document.getElementById("box")
      
        if(box){
            box.className = "handlebox"
        }
    },
    methods:{
        
    }
}
</script>

<style >

</style>
