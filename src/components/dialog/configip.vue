<template>
     <el-dialog v-if="dialogName == '配置服务器' || dialogName == '更改配置服务器'" title="配置服务器" class="config" :width="width" :visible.sync="dialogVisible" :before-close="handleClose" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm ">
            <el-form-item label="链接host：" :label-width="formLabelWidth"
                prop="dbserver"
                :rules="[
                    { required: true, message: '请输入链接host', trigger: 'blur' },
                ]">
                <el-input v-model="ruleForm.dbserver" ></el-input>
            </el-form-item>
            <el-form-item label="数据库类型：" :label-width="formLabelWidth"
                prop="category"
                :rules="[
                    { required: true, message: '请选择数据库类型', trigger: 'blur' },
                ]">
                <el-select v-model="ruleForm.category">
                    <el-option value="mysql" selected><span>mysql</span></el-option>
                    <el-option value="mssql" ><span>mssql</span></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据库用户名：" :label-width="formLabelWidth"
            prop="dbuser"
                :rules="[
                    { required: true, message: '请输入数据库用户名', trigger: 'blur' },
                ]">
                <el-input v-model="ruleForm.dbuser" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据库密码：" :label-width="formLabelWidth"
             prop="dbpass"
                :rules="[
                    { required: true, message: '请输入数据库密码', trigger: 'blur' },
                ]">
                <el-input v-model="ruleForm.dbpass" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="端口：" :label-width="formLabelWidth" 
            prop="dbport"
                :rules="[
                    { required: true, message: '请输入端口', trigger: 'blur' },
                ]">
                <el-input v-model="ruleForm.dbport" autocomplete="off"></el-input>
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
            formLabelWidth: '126px',
            width:"50%",
            ruleForm: {
                dbserver:'',
                category:'',
                dbuser:'',
                dbpass:'',
                category:'mysql',
                dbport:''
            }
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
                    if(this.dialogName == '更改配置服务器'){
                        var url = "/dbconfig/updatedbconfig"
                    }else{
                        var url = "/dbconfig/appenddbconfig"
                    }
                var json = {
                    url:url,
                    data:this.ruleForm
                }
                jsonpget(this,json,(res)=>{
                    if(!res.success){
                       this.$message({
                            message: res.msg +' !',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: res.msg +' !',
                            type: 'error'
                        });
                    }
                    this.$store.state.example.dialogVisible = false
                    if(this.dialogName == '配置服务器'){
                        this.$store.state.example.configipfun()
                    }
                    this.$refs['ruleForm'].resetFields();
                })
                } else {
                return false;
                }
            });
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
.config .el-dialog__body {
    padding: 20px 20px 0 !important;
    height: calc(100% - 143px) !important;
}
.config .el-select{
    width: 100%;
}
.config .dialog-footer{
    width: 465px;
}
.config .dialog-footer button{
    width: 170px;
}
.el-dialog__footer {
    padding: 10px 20px 10px;
    text-align: center;
    margin-top: 4px;
}
</style>
