<template>
<div class="pagecomp ">
    <div class="title_box ">
        <div class="detail_title heardbj" :style="{'background-image': 'url(../assets/img/' + datamsg[activeName].img +'.png)'}">
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
            <el-tab-pane name="task">
              <span slot="label"><i v-if="activeName == 'task'">&#9830;  </i> 任务列表</span>
                <taskDom/>
            </el-tab-pane>
            <el-tab-pane name="secretkey">
                <span slot="label"><i v-if="activeName == 'secretkey'">&#9830;  </i>私钥秘钥</span>
                <secretkey v-if="secretkey"/>
                <nosecrekey v-else/>
            </el-tab-pane>
            <el-tab-pane name="order">
                <span slot="label"><i v-if="activeName == 'order'">&#9830;  </i>订购</span>
                <order/>
            </el-tab-pane>
            <el-tab-pane name="copy">
                <span slot="label"><i v-if="activeName == 'copy'">&#9830;  </i>备份详情</span>
                <copy/></el-tab-pane>
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
                    img:"rw_header_bj"
                }, 
                secretkey:{
                    class:'icon-miyao',
                    detailh3:'私钥秘钥',
                    detailp:'恢复简单，避免数据损坏',
                    img:"ys_header_bj"

                }, 
                order:{
                    class:'icon-dinggou',
                    detailh3:'订购服务',
                    detailp:'恢复简单，避免数据损坏',
                    img:"dg_header_bj"
                }, 
                copy:{
                    class:'icon-beifen',
                    detailh3:'备份详情',
                    detailp:'恢复简单，避免数据损坏',
                    img:"bf_header_bj"
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
