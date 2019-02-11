<template>
	<el-form :model="userForm" ref="userForm"  class="demo-dynamic" style="width: 65%;margin:auto;">
		<el-form-item
			prop="username"
			:rules="[
			{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
			{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
			]"
		>
			<el-autocomplete
				style="width: 100%;"
				class="inline-input"
				v-model="userForm.username"
				:fetch-suggestions="querySearch"
				:trigger-on-focus="false"
				placeholder="请输入用户邮箱"
			><i slot="prefix" class="iconfont icon-youxiang"></i></el-autocomplete>
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
			<el-button type="primary" :disabled="disabledbool" style="width: 100%;" @click="submitForm('userForm')" >
				<span v-if="!disabledbool">登录</span>
				<span v-else>正在登陆<i class="el-icon-loading"></i></span>
			</el-button>
			<br />
			<router-link  id="register_index" class="register" to="/user/reg" tag="a">立即注册</router-link>
		</el-form-item>
	</el-form>
</template>
<script>
import { jsonpget } from 'src/statics/js/axios.js'
import { userwin,setCookies,storagename,getcookiesname } from 'src/statics/js/public.js'
export default {
	name:'Login',
	 data() {
      return {
        userForm: {
          password: '',
		  username: '',
		},
		disabledbool:false
      };
	},
	created(){
		getcookiesname(this)
	},
	mounted() {
		if(this.$store.state.example.userdata.length>0){
			this.userForm.username = this.$store.state.example.userdata[0]
		}
	},
	methods:{
		 querySearch(queryString, cb) {
			var restaurants = []
			for (var i = 0 ; i < this.$store.state.example.userdata.length; i++){
				restaurants.push({value:this.$store.state.example.userdata[i]})
			}
			var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
			// 调用 callback 返回建议列表的数据
			cb(results);
		},
		createFilter(queryString) {
			return (restaurant) => {
				return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
			};
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			if (valid) {
				this.disabledbool = true
				var json = {
					url:'/user/login',
					data:this.userForm,
				}
				jsonpget(this,json,(res)=>{
					if(!res.success){ 
						setCookies('useruuid',res.msg.uuid)
						setCookies('nickname',res.msg.nickname)
						setCookies('userdata',JSON.stringify(res.msg))
						userwin()
						storagename(this.userForm.username)
						getcookiesname(this)
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
	},
	computed:{
        userdata:{
            get(){
                return this.$store.state.example.userdata
            },
            set(){
                return this.$store.state.example.userdata
            }
        }
    }
}
</script>

<style>

</style>

