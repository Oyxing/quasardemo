<template>
     <el-dialog v-if="dialogName == '异常备份详情'" title="异常备份详情" :visible.sync="dialogVisible" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
            <q-table
                :pagination.sync="pagination"
                :data="abnormalsdata"
                :columns="columns"
                row-key="label"
                rows-per-page-label="每页行数:"
                :hide-bottom="hidebottom"
            >
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
            
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            pagination: {
                sortBy: null, // 字符串，列“name”属性值
                descending: false,
                page: 1,
                rowsPerPage: 5 // 当前每页显示的行数
            },
            hidebottom:true,
            columns:[ 
                {
                    name:'filename',
                    required: true,
                    label: '文件名',
                    align: 'center',
                    field: 'filename',
                },
                {
                    required: true,
                    label: '数据库名',
                    align: 'center',
                    field: 'dbname',
                }
            ]
        }
    },
    methods:{
        handleClose(){
            this.$store.state.example.dialogVisible = false
        }
    },
    computed:{
        dialogVisible:{
            get(){
              return this.$store.state.example.dialogVisible
            },
            set(){
              return this.$store.state.example.dialogVisible
            }
        },
        dialogName:{
            get(){
              return this.$store.state.example.dialogName
            },
            set(){
              return this.$store.state.example.dialogName
            }
        },
        abnormalsdata:{
            get(){
               if(this.$store.state.example.abnormalsdata.length > 5){
                    this.hidebottom = false
               }else{
                    this.hidebottom = true
               }
              return this.$store.state.example.abnormalsdata
            },
            set(){
              return this.$store.state.example.abnormalsdata
            }
        },
    }
}
</script>

<style>

</style>
