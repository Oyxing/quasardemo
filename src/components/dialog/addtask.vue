<template>
    <el-dialog v-if="dialogName == '添加任务'" title="添加任务" :width="width" :visible.sync="dialogVisible" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="任务名称：" :label-width="formLabelWidth"
                prop="name"
                :rules="[
                    { required: true, message: '请输入任务名称', trigger: 'blur' },
                ]"
            >
                <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" :label-width="formLabelWidth"
                 prop="startime"
                :rules="[
                    { required: true, message: '选择开始时间', trigger: 'blur' },
                ]"
            >
             <el-date-picker
                v-model="ruleForm.startime"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="周期：" :label-width="formLabelWidth"
                 prop="interval" 
                :rules="[
                    { required: true, message: '请输入周期', trigger: 'blur' },
                ]"
            >
                <el-input-number v-model="ruleForm.interval" :min="1" autocomplete="off" style="width:100px;" controls-position="right"></el-input-number>
                <el-select v-model="elUnit" style="margin-left:20px; width: calc(100% - 120px) !important;">
                     <el-option
                        v-for="item in elUnitdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                   
                </el-select>
            </el-form-item>
            <el-form-item label="数据库类型：" :label-width="formLabelWidth"
                prop="category"
                    :rules="[ 
                        { required: true, message: '选择数据库类型', trigger: 'blur' },
                    ]"
                >
                <el-select v-model="ruleForm.category" @change="changecate">
                    <el-option v-for="(item,key) in getsqlcategory" :key="key" :value="item.category" selected>{{item.category}}{{item.version}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备份数据库：" :label-width="formLabelWidth"
                    prop="database"
                    :rules="[
                        { required: true, message: '备份数据库', trigger: 'blur' },
                    ]"
                >
                 <el-select v-model="ruleForm.database">
                    <el-option v-for="(item,key) in getdatabasenames" :key="key" :value="item" selected>{{item}}</el-option>
                </el-select>
            </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit('ruleForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { jsonpget } from 'src/statics/js/axios.js'
export default {
        data() {
            return {
                width:"60%",
                elUnitdata:[
                    {
                        value: 'm',
                        label: '分'
                    },
                    {
                        value: 'h',
                        label: '时'
                    },
                    {
                        value: 'd',
                        label: '天'
                    },
                    {
                        value: 'z',
                        label: '周'
                    },
                    {
                        value: 'M',
                        label: '月'
                    },
                ],
                ruleForm: {
                    name:'',
                    startime:'', 
                    interval:1, 
                    category:'', 
                    database:'',
                },
                elUnit:'m',
                formLabelWidth: '120px',
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 5.64e7;
                    }
                },
            }
        },
        created() {
             if(this.$store.state.example.buildPC){
                this.width = "30%"
            }else{
                this.width = "50%"
            }
        },
        methods:{
        
            submit(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                                var date = new Date()

                        if(this.ruleForm.startime > (Date.parse(date))/1000){
                                if (this.elUnit == "d") {
                                    this.ruleForm.interval = this.ruleForm.interval*24 + "h";
                                }else if (this.elUnit == "z") {
                                    this.ruleForm.interval = this.ruleForm.interval*24*7+ "h";
                                }else if (this.elUnit == "m") {
                                    this.ruleForm.interval = this.ruleForm.interval + "m";
                                }else if (this.elUnit == "h") {
                                    this.ruleForm.interval = this.ruleForm.interval + "h";
                                }else if (this.elUnit == "M") {
                                    this.ruleForm.interval = this.ruleForm.interval + "M";
                                }

                                this.ruleForm.startime = (Date.parse(this.ruleForm.startime))/1000
                            var json = {
                                url:"/task/appendtask",
                                data:this.ruleForm
                            }
                            jsonpget(this,json,(res)=>{
                                if(!res.success){
                                    this.$message({
                                        message: res.msg +' !',
                                        type: 'success'
                                    });
                                    this.$store.state.example.operatefun()
                                }else{
                                    this.$message({
                                        message: res.msg +' !',
                                        type: 'error'
                                    });
                                }
                                this.$store.state.example.dialogVisible = false
                                this.$refs['ruleForm'].resetFields();
                            })
                        }else{
                            this.$message({
                                message: '开始日期请大于当前时间 !',
                                type: 'error'
                            });
                        }

                    } else {
                        return false;
                    }
                });
            },
            changecate:function(basename){
                var json = {
                    url:"/dbconfig/getdatabasenames",
                    data:{category:basename}
                }
                jsonpget(this,json,(res)=>{
                        if(!res.success){
                            this.ruleForm.database = res.msg[0]
                            this.$store.state.example.getdatabasenames = res.msg
                        }else{
                            this.$message({
                                message: res.msg +' !',
                                type: 'error'
                            });
                        }
                    })
            },
            handleClose(){
                this.$store.state.example.dialogVisible = false
                this.$refs['ruleForm'].resetFields();
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
            getsqlcategory:{
                get(){
                    return this.$store.state.example.getsqlcategory
                },
                set(){
                    return this.$store.state.example.getsqlcategory
                }
            },
            getdatabasenames:{
                get(){
                    return this.$store.state.example.getdatabasenames
                },
                set(){
                    return this.$store.state.example.getdatabasenames
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
        }
}
</script>

<style>
.el-form{
    width: 90%;
    margin: auto;
}
.el-dialog {
    height: 438px;
}
.el-dialog__body {
    padding: 20px 20px 0 !important;
    height: calc(100% - 101px) !important;
}
.el-dialog__footer {
    padding: 10px 20px 10px;
    text-align: center;
    border-top: 1px solid #eee;
}
</style>
