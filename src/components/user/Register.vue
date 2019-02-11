<template>
<el-form :model="userForm" ref="userForm"  class="demo-dynamic" style="width: 65%;margin:auto;">
		<el-form-item
			prop="nickname"
            :rules="[
			{ required: true, message: '请输入用户名', trigger: 'blur' }
			]"
		>
			<el-input v-model="userForm.nickname" placeholder="请输入用户名"><i slot="prefix" class="iconfont icon-yonghu"></i></el-input>
		</el-form-item>
        <el-form-item
			prop="username" 
			:rules="[
			{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
			]"
		>
			<el-input v-model="userForm.username" placeholder="请输入用户邮箱"><i slot="prefix" class="iconfont icon-youxiang"></i></el-input>
		</el-form-item>
	    <el-form-item
			prop="password"
			:rules="[
			{ required: true, message: '请输入密码', trigger: 'blur' }
			]"
		>
			<el-input v-model="userForm.password" type="password" placeholder="请输入密码" @keyup.enter.native="submitForm('userForm')"><i slot="prefix" class="iconfont icon-mima"></i></el-input>
		</el-form-item>

        <el-form-item >
			<el-button type="primary" :disabled="disabledbool" style="width: 100%;" @click="submitForm('userForm')">
				<span v-if="!disabledbool">注册</span>
				<span v-else>正在注册<i class="el-icon-loading"></i></span></el-button>
			<br />
			<router-link class="register" to="/user" tag="a">立即登录</router-link>
		</el-form-item>
	</el-form>
</template>

<script>
import { jsonpget } from 'src/statics/js/axios.js'

export default {
    name:"Register",
    data() {
        return {
            userForm: {
                nickname:'',
                username:'', 
                password:''
			},
			disabledbool:false
        }
    },
    created(){
    
    },
    methods:{
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				this.disabledbool = true
				var json = {
					url:'/user/register',
					data:this.userForm,
				}
				jsonpget(this,json,(res)=>{
					if(!res.success){
						this.$message({
							message: "注册成功请激活账号后登陆 !",
							type: 'success'
						});
						this.$router.push({ path: '/user'})
					}else{
						this.$message({
							message: res.msg +' !',
							type: 'error'
						});
					}
					this.disabledbool = false
				})
			} else {
				return false;
			}
			});
		}
	}
}
</script>

<style>

</style>
