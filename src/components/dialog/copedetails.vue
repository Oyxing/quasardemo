<template>
     <el-dialog id="copedetaildialog" v-if="dialogName == '备份数据库详情'" title="备份数据库详情" :width="width" :visible.sync="dialogVisible" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
        <div class="showtable copemode" v-loading="loading" element-loading-text="正在加载...">
            <el-table
                    :show-header="false"
                    height="300"
                    :data="copedetailsdata.length <= 0?[]:copedetailsdata"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                    width="300"
                    prop="fs_file_name"
                    label="文件名"
                    > 
                    </el-table-column>
                    <el-table-column
                    width="100"
                    prop="file_source_size"
                    label="文件大小"
                    >  
                    <template slot-scope="scope">
                        <div>   
                            {{formatstoragenet(scope.row.file_source_size)}}
                        </div>  
                    </template>
                    </el-table-column>
                     <el-table-column
                    prop="create_time"
                    label="备份时间"
                    >  
                    <template slot-scope="scope">
                        <div>   
                            {{timestampToTime(scope.row.create_time)}}
                        </div>  
                    </template>
                    </el-table-column>
                    <el-table-column
                    width="70"
                        prop="intime"
                        label="操作">
                    <template slot-scope="scope">
                        <div @click="copesqldown(scope.row)" style="cursor: pointer;e">
                            <i class="iconfont icon-xiazai" style="color:#61b865"></i>
                        </div>
                    </template>
                    </el-table-column>
                </el-table>
        </div>
    </el-dialog>
</template>

<script>
import { timestampToTime,formatstoragenet } from 'src/statics/js/public.js'
import { directoryDialog } from 'src/statics/js/index.js'

export default {
    data() {
        return {
            width:"75%",
            loading:true,
            timestampToTime:timestampToTime,
            formatstoragenet:formatstoragenet,
            hidebottom:true,
        }
    },
    created() {
         if(this.$store.state.example.buildPC){
            this.width = "45%"
        }else{
            this.width = "75%"
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
        handleClose(){
            this.$store.state.example.dialogVisible = false
        },
        copesqldown(row){
             directoryDialog(this,row,'openDirectory','下载copesql')
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
        copedetailsdata:{
            get(){
                if(this.$store.state.example.copedetailsdata){
                    if(this.$store.state.example.copedetailsdata.length > 5){
                        this.hidebottom = false
                    }else{
                        this.hidebottom = true
                    }
                }
                this.loading = false
              return this.$store.state.example.copedetailsdata
            },
            set(){
              return this.$store.state.example.copedetailsdata
            }
        },
    }
}

function openDownloadDialog(url, saveName)
{
	if(typeof url == 'object' && url instanceof Blob)
	{
		url = URL.createObjectURL(url); // 创建blob地址
	}
	var aLink = document.createElement('a');
	aLink.href = url;
	aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
	var event;
	if(window.MouseEvent) event = new MouseEvent('click');
	else
	{
		event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	}
	aLink.dispatchEvent(event);
}

</script>

<style>
#copedetaildialog .el-dialog__body {
    padding: 0px 0px 0 !important;
    height: calc(100% - 41px) !important;
}
.copemode .el-table__header-wrapper{
        height: 30px;
        line-height: 30px;
}
.copemode  .el-table__body-wrapper .el-table__row{
    height: 39px;
}
.copemode .el-table--enable-row-transition .el-table__body td{
        padding-left: 16px;
}
</style>
