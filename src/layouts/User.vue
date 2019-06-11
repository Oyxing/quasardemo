<template>
  <q-layout view="lHh Lpr lFf">
    <div id="q-bodybox" class="userbodybox indexbox pathconfig">
        <div id="enterbox">
            <!-- 提示 -->
            <div class="logobox fl">
                <div class="lg_top">
                    <img src="statics/img/logobox-logo.png" alt="">
                </div>
                <div class="lg_bottom">
                    版本号&nbsp;{{version}}
                </div>
            </div>
            <div class="loginbox fr">
                <div class="head">
                    <div class="setting fr" style="width:90px;">
                        <ul v-if="btn">
                             <li class="setbtn" >
                                <span class="setbtnicon iconfont icon-shezhi" style="color: #000; font-size: 20px;text-align: center;"></span>
                                <ul class="setmess" style="right: 50px;">
                                    <li> 
                                        <button id="minimized" @click="dialogVisible = true">
                                            更改配置
                                        </button>
                                    </li>
                                </ul>
                            </li>
                            <li><button id="minimized" class="minimizedicon loginicon" @click="minwin"></button></li>
                            <li><button id="closewin" class="closewinicon loginicon"  @click="hidewin"></button></li>
                        </ul>
                    </div>
                </div>
                <h2 id="logintitle" v-if="this.$route.path == '/user'">用户登录</h2>
                <h2 id="logintitle" v-if="this.$route.path == '/user/reg'">用户注册</h2>
                <h2 id="logintitle" v-if="this.$route.path == '/user/conf'">端口配置</h2>
                <div id="formview" class="loginformbox">
                        <router-view />
                </div>
            </div>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
       >
        <el-form :model="userForm" ref="userForm">
            <el-form-item
                label="设置端口"
                prop="updatapath"
                class="userinput"
                style="margin-bottom:27px"
                :rules="[
			        { required: true, message: '请输入端口号', trigger: 'blur' },
                    { min: 4, max: 5, message: '长度在 4 到 5 个字符', trigger: 'blur' }]"
            >
                <el-input v-model="userForm.updatapath" placeholder="请输入密码" @keyup.enter.native="submitForm('userForm')"></el-input>
            </el-form-item>
        </el-form>
            <el-button style="float: right;margin-top: 30px;" type="primary" @click="submitForm('userForm')">设置</el-button>
        </el-dialog>
    </div>
  </q-layout>
</template>

<script>
import { auto } from 'src/statics/js/auto.js'
import { loginwin,removeCookies,operatebtn,setCookies,getCookies } from 'src/statics/js/public.js'
import { hidewin,minwin } from 'src/statics/js/public.js'
import electionBtn from 'src/pages/electionBtn.vue'
export default {
    name: 'MyLayout',
    data () {
      return {
        userForm: {
          updatapath:this.$store.state.example.updatapath,
		},
        dialogVisible: false,
        version:this.$store.state.example.version,
        btn:false,
      }
    },
    created() {
      loginwin()
      getCookies('updatapath',(data)=>{
          if(data.value){
                this.$store.state.example.updatapath =  data.value
          }
        })
    },
    mounted(){
        operatebtn(this)
        removeCookies("useruuid")
        removeCookies("nickname")
        removeCookies("userdata")
    },
    methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        setCookies('updatapath',this.userForm.updatapath)
                        this.dialogVisible = false
                        this.$store.state.example.updatapath = this.userForm.updatapath
                        this.$refs[formName].resetFields();
                    } else {
                        return false;
                    }
                });
            },
            minwin(){
                minwin()
            },
            hidewin(){
                hidewin()
            }
      },
    components:{
        electionbtn:electionBtn
    }
}
</script>

<style>
</style>
