<template>
<div class="pagecomp">
    <div class="pagecompheard">   
        任务列表
        <el-button type="warning" v-if="!ipconfig" @click="deletetask">批量删除</el-button>
        <el-button type="primary" v-if="!ipconfig" @click="keytask">创建任务</el-button>
        <el-button type="primary" v-if="ipconfig" @click="confighost">配置服务器</el-button>
    </div>
    <div class="showmess" v-loading="dataloading" element-loading-text="正在加载...">
        <div class="task" style="margin-top:13px">
            <el-select v-model="typevalue" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
                <button class="searchbtn" slot="append">
                <i class="iconfont icon-sousuo"></i>
                </button>
            </el-input>
        </div>
        <div class="showtable taskshow" style="margin-top:13px"> 
            <el-table
                 height="300"
                :data="tableData.length <= 0?[]:tableData.filter(data => !search || data[typevalue].toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                :row-class-name="tableRowClassName">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                :show-overflow-tooltip="true"
                width="100"
                prop="name" 
                label="任务名称" 
                > 
                </el-table-column>
                <el-table-column
                width="100"
                :show-overflow-tooltip="true"
                prop="database"
                label="数据库名"
               >  
                </el-table-column>
                <el-table-column
                :show-overflow-tooltip="true"
                width="90"
                prop="status"
                label="状态">
                 <template slot-scope="scope">
                        <span v-if="!scope.row.status">执行中</span>
                        <span v-else-if="!scope.row.status">执行中</span>
                        <span v-else-if="scope.row.status == 1">执行中</span>
                        <span v-else-if="scope.row.status == 2">执行失败</span>
                        <span v-else-if="scope.row.status == 3">任务完成</span>
                </template>
                </el-table-column>
                 <el-table-column
                 :show-overflow-tooltip="true"
                prop="startime"  
                label="开始日期">  
                <template slot-scope="scope">
                        {{timestampToTime(scope.row.startime)}}
                </template>
                </el-table-column>
                 <el-table-column
                 width="50"
                prop="interval"
                label="周期">
                </el-table-column>
                 <el-table-column
                 :show-overflow-tooltip="true"
                prop="intime"
                label="创建日期">
                <template slot-scope="scope">
                        {{timestampToTime(scope.row.intime)}}
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</div>
</template>

<script>
import { jsonpget } from 'src/statics/js/axios.js'
import { confirm } from 'src/statics/js/confirm.js'
import { userwin,timestampToTime,bubbleSort } from 'src/statics/js/public.js'
export default {
    data() {
        return {
            Selectiondata:[],
            search:'',
            userwin:userwin,
            loading:true,
            dataloading:false,
            btnnone:false,
            timestampToTime:timestampToTime,
            ipconfig:false,
            hidebottom:true,
            tableData:[],
             options: [{  
                value: 'name',
                label: '任务名称'
                }, {
                value: 'database',
                label: '数据库名'
                }],
            typevalue: 'name'
        }
    },
    created() {
        this.$store.state.example.taskfun = this.tasklist
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
        // 多选
        handleSelectionChange(val){
            this.Selectiondata = val
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2) {
                return 'success-row';
            } else {
                return 'warning-row';
            }
            return '';
        },
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
                    console.log('sss')
                    this.$store.state.example.activeName = "secretkey"
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
            this.$confirm('删除任务, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
                }).then(() => { 
                        for(var i = 0 ; i < this.Selectiondata.length; i++){
                            this.fordeltask(this.Selectiondata[i])
                        }
                }).catch(() => {

                });
        },
        fordeltask(row){
            var json = {
                url:'/task/removetask',
                data:{uuid:row.uuid}
            }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    this.tasklist()
                    this.$message({
                        message: '删除任务成功 !',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.msg +' !',
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>

<style >
    .input-with-select{
        width: 194px;
    }
   .task {
        margin-top: 13px;
        width: 380px;
        float: right;
        margin-bottom: 13px;
    }
    .task .el-select {
        width: 174px ;
        height: 28px;
        margin-right: 10px;
    }
    .showmess .el-input--suffix .el-input__inner{ 
        height: 28px !important;
    }
    .showmess .el-select .el-input__icon{
        line-height: 28px !important;
    }
    .showmess .input-with-select .el-input__inner{
        width: 152px;
        height: 28px !important;
        border-bottom-right-radius: 0px !important;
        border-top-right-radius: 0px !important;
    } 
    .input-with-select .el-input-group__append{
        padding: 0 0px;
        border: 0px solid #dcdfe6;
    }
    .input-with-select .el-input-group__append .searchbtn{
        width: 42px;
        height: 28px;
        color: #fff;
        background: #409EFF;
        border: none;
    }
    .el-table .warning-row {
        background: #fff;
    }
    .el-table .success-row {
        background: #f7f7f7;
    }
    .taskshow .el-table__header-wrapper{
        height: 30px;
        line-height: 30px;
    }
    .taskshow  .el-table__body-wrapper .el-table__row{
        height: 39px;
    }
    .taskshow .el-tooltip{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .el-table td, .el-table th.is-leaf{
        border-bottom:0px solid #ebeef5; 
    }
</style>
