<template>
<div class="pagecomp">
    <div class="pagecompheard" style="margin-bottom: 24px;">   
        备份详情
    </div>
    <div class="showtable copeshow" v-loading="loading" element-loading-text="正在加载...">
           <el-table
                 height="300"
                :data="tableData.length <= 0?[]:tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="id"
                label="数据库编号"
                > 
                </el-table-column>
                <el-table-column
                prop="database_name"
                label="备份数据库"
               >  
                </el-table-column>
                 <el-table-column
                 width="60"
                    prop="intime"
                    label="操作">
                <template slot-scope="scope">
                    <div @click="detailscope(scope.row)" style="cursor: pointer;e">
                        <i class="iconfont icon-xiangqing" style="color:#fe9f18"></i>
                    </div>
                </template>
                </el-table-column>
            </el-table>
    </div>
</div>
</template>

<script>

import { userwin,bubbleSort } from 'src/statics/js/public.js'

import { jsonpget } from 'src/statics/js/axios.js'
export default {
    data() {
        return {
            userwin:userwin,
            loading:true,
            hidebottom:true,
            form:{

            },
            tableData:[
               
            ],
            columns:[ 
                {
                name:"1",
                required: true,
                label: '数据库编号',
                align: 'center',
                field: 'id',
                },
                {
                name:"2",
                required: true,
                label: '备份数据库',
                align: 'center',
                field: 'database_name',
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
        this.querydatabase()
        this.$store.state.example.copefun = this.querydatabase
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
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2) {
                return 'success-row';
            } else {
                return 'warning-row';
            }
            return '';
        },
        querydatabase(){
            var json = {
                url:"/user/querydatabase"
            }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    if(res.msg){
                       
                        this.tableData = res.msg
                    }else{
                        this.tableData = []
                    }
                    this.loading = false
                }else{
                    if(res.msg == 'sql: no rows in result set'){
                        var resmsg = '没有备份数据'
                    }else{
                        var resmsg = res.msg
                    }
                    this.loading = false
                    this.$message({
                        message: resmsg +' !',
                        type: 'error'
                    });
                }
            })
        },
        detailscope(row){
            this.$store.state.example.dialogVisible = true
            this.$store.state.example.dialogName = '备份数据库详情'
            var json = {
                    url:"/user/querydbfilelist",
                    data:{database_id:row.id}
                }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    if(res.msg){
                        this.$store.state.example.copedetailsdata = bubbleSort(res.msg)
                    }else{
                        this.$store.state.example.copedetailsdata = []
                    }
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
.copeshow .el-table__header-wrapper{
        height: 30px;
        line-height: 30px;
}
.copeshow  .el-table__body-wrapper .el-table__row{
    height: 39px;
}
.el-table td, .el-table th.is-leaf{
    border-bottom:0px solid #ebeef5; 
}
</style>
