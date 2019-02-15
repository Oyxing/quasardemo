<template>
<div class="pagecomp">
    <div class="pagecompheard">   
        任务列表
        <el-button type="warning">批量删除</el-button>
        <el-button type="primary">创建任务</el-button>
    </div>
    <div class="showmess" v-loading="dataloading" element-loading-text="正在加载...">
        <div class="task" style="margin-top:13px">
            <el-select v-model="value" placeholder="请选择">
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
                height="200"
                border
                :data="tableData.length <= 0?[]:tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                :row-class-name="tableRowClassName">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="任务名称"
                > 
                </el-table-column>
                <el-table-column
                prop="database"
                label="数据库名"
               >  
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态">
                 <template slot-scope="scope">
                    <div>
                        <span v-if="!scope.row.status">执行中</span>
                        <span v-else-if="!scope.row.status">执行中</span>
                        <span v-else-if="scope.row.status == 1">执行中</span>
                        <span v-else-if="scope.row.status == 2">执行失败</span>
                        <span v-else-if="scope.row.status == 3">任务完成</span>
                    </div>
                </template>
                </el-table-column>
                 <el-table-column
                prop="startime"  
                label="开始日期">  
                <template slot-scope="scope">
                    <div>
                        {{scope.row.startime}}
                        <!-- {{timestampToTime(scope.row.startime)}} -->
                    </div>
                </template>
                </el-table-column>
                 <el-table-column
                prop="interval"
                label="周期">
                </el-table-column>
                 <el-table-column
                prop="intime"
                label="创建日期">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.intime}}
                        <!-- {{timestampToTime(scope.row.intime)}} -->
                    </div>
                </template>
                </el-table-column>
            </el-table>

            <!-- <q-table
                :data="tableData.length <= 0?[]:tableData"
                :columns="columns"
                row-key="name"
                rows-per-page-label="每页行数:"
                :hide-bottom="hidebottom"
            >
                <q-td slot="body-cell-intime" slot-scope="props" :props="props">
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
            </q-table> -->
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
            search:'',
            userwin:userwin,
            loading:true,
            dataloading:false,
            btnnone:false,
            timestampToTime:timestampToTime,
            ipconfig:false,
            hidebottom:true,
            tableData:[
                {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
             options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
                value: ''
        }
    },
    created() {
        // this.tasklist()
        // this.getconfig()
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
            console.log(val)
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
    .el-input--suffix .el-input__inner{ 
        height: 28px;
    }
    .task .el-select .el-input__icon{
        line-height: 28px;
    }
    .input-with-select .el-input__inner{
        width: 152px;
        height: 28px;
    }
    .input-with-select .el-input-group__append{
        padding: 0 0px;
        border: 0px solid #dcdfe6;
    }
    .input-with-select .el-input-group__append .searchbtn{
        width: 42px;
        height: 28px;
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
    .taskshow .el-table--scrollable-y .el-table__body-wrapper .el-table__row{
        height: 39px;
    }
    
</style>
