<template>
<div class="pagecomp">
  
    <div class="showmess" v-loading="loading" element-loading-text="正在加载...">
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
                <q-td slot="body-cell-btn" slot-scope="props" :props="props">
                    <div class="q-mb-xs">
                        <q-btn label="详情" color="red-7"  @click="detailscope(props.row)"/>
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

import { userwin } from 'src/statics/js/public.js'

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
                        this.$store.state.example.copedetailsdata = res.msg
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
.backup i {
    color: #fff;
}
.backup{
    float: right;
    color: #fff;
    text-align: center;
    line-height: 36px;
    width:36px;
    height: 36px;
    margin-top: 80px;
    margin-right: 20px;
    border-radius:50%;
    border: 1px solid #9c9c9c;
}
</style>
