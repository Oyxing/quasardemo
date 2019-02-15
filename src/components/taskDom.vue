<template>
<div class="pagecomp ">
    <div class="showmess" v-loading="dataloading" element-loading-text="正在加载...">
        <div class="nonebox" v-if="tableData.length <= 0">
            <img src="statics/img/NOneimg.png" alt="">
            <p>暂无数据</p>
        </div>
        <div v-else class="showtable keyshow" > 
            <q-table
                :data="tableData"
                :columns="columns"
                row-key="name"
                rows-per-page-label="每页行数:"
                :hide-bottom="hidebottom"
            >
                <q-td slot="body-cell-intime" slot-scope="props" :props="props">
                    {{timestampToTime(props.row.intime)}}
                </q-td>
                <q-td slot="body-cell-startime" slot-scope="props" :props="props">
                    {{timestampToTime(props.row.startime)}}
                </q-td>
                 <q-td slot="body-cell-status" slot-scope="props" :props="props">
                   <span v-if="!props.row.status">执行中</span>
                   <span v-else-if="!props.row.status">执行中</span>
                   <span v-else-if="props.row.status == 1">执行中</span>
                   <span v-else-if="props.row.status == 2">执行失败</span>
                   <span v-else-if="props.row.status == 3">任务完成</span>
                </q-td>
                <q-td slot="body-cell-btn" slot-scope="props" :props="props">
                    <div class="q-mb-xs">
                        <q-btn label="删除" color="red-7"  @click="deletetask(props.row)"/>
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
import { jsonpget } from 'src/statics/js/axios.js'
import { confirm } from 'src/statics/js/confirm.js'
import { userwin,timestampToTime } from 'src/statics/js/public.js'
export default {
    data() {
        return {
            userwin:userwin,
            loading:true,
            dataloading:true,
            btnnone:false,
            timestampToTime:timestampToTime,
            ipconfig:false,
            hidebottom:true,
            tableData:[
            ],
            columns:[ 
                {
                name:"1",
                required: true,
                label: '任务名称',
                align: 'center',
                field: 'name',
                },
                {
                name:"2",
                required: true,
                label: '数据库名',
                align: 'center',
                field: 'database',
                },
                {
                name:"status",
                required: true,
                label: '状态',
                align: 'center',
                field: 'status',
                }, 
                { 
                name:"startime",
                required: true,
                label: '开始日期',
                align: 'center',
                field: 'startime',
                },
                {
                name:"5",
                required: true,
                label: '周期',
                align: 'center',
                field: 'interval',
                },
                {
                name:"intime",
                required: true,
                label: '创建日期',
                align: 'center',
                field: 'intime',
                },
                {
                name: 'btn',
                align: 'center',
                label: '操作'
                }
            ]
        }
    },
    created() {
        this.tasklist()
        this.getconfig()
    },
    mounted() {
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
         keytask:function(){
            var json = {
                url:'/rsa/getrsakey',
            }
            jsonpget(this,json,(res)=>{
                var boolkey = false
                if(!res.success){
                    if(res.msg.length > 0 ){
                        for(var key in res.msg){
                            if(res.msg[key].type == 'public'){
                                boolkey = true
                            }
                        }
                        if(boolkey){
                            this.addtask()
                        }else{
                            this.nokey()
                        }
                    }else{
                        this.nokey()
                    }
                }else{
                    this.$message({
                        message: res.msg +' !',
                        type: 'error'
                    });
                }
            })
        },
        getconfig:function(){
            var json = {
                url:'/dbconfig/getsqlcategory',
            }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    if(res.msg.length > 0){
                        this.ipconfig = false
                        this.$store.state.example.upconfig = true
                    }else{
                        this.ipconfig = true
                        this.$store.state.example.upconfig = false
                    }
                    this.btnnone = true
                    this.loading = false
                    this.$store.state.example.getsqlcategory = res.msg
                }else{
                    this.$message({
                        message: res.msg +' !',
                        type: 'error'
                    });
                }
            })
        },
        tasklist:function(){
            var json = {
                url:'/task/tasklist',
            }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    this.tableData = res.msg
                    this.dataloading = false
                }else{
                    this.$message({
                        message: res.msg +' !',
                        type: 'error'
                    });
                }
            })
        },
        nokey:function(){
            this.$confirm('请生成公钥', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$router.push({ path: '/secretkey'})
                }).catch(() => {
                        
                });
        },
        addtask:function(){
            this.getsqlcategory()
        },
        getsqlcategory:function(){
            if(this.$store.state.example.getsqlcategory){
                this.$store.state.example.dialogVisible = true
                this.$store.state.example.dialogName = '添加任务'
                this.$store.state.example.operatefun = this.tasklist
            }
        },
        confighost(){
            this.$store.state.example.dialogVisible = true
            this.$store.state.example.dialogName = '配置服务器'
            this.$store.state.example.configipfun = this.getconfig
            
        },
        deletetask(row){
                var jsondata = {
                title:' 删除任务',
                url:'/task/removetask',
                data:{uuid:row.uuid},
                fun:this.tasklist
            }
            confirm(this,jsondata)
        }
    }
}
</script>

<style >

</style>
