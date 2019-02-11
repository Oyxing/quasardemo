<template>
<div class="pagecomp">
    <div class="title_box skinbg">
       <div class="detail_title">
            <div class="detailicon copemessicon fl"></div>
            <div class="detailword fl">
                <h3 class="detailh3">备份详情</h3>
                <p class="detailp">恢复简单，避免数据损坏</p>
            </div>
        </div>
    </div>
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
import { jsonpget } from 'src/statics/js/axios.js'
export default {
    data() {
        return {
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
        if(box){
            box.className = ""
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

<style>

</style>
