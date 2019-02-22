<template>
  <q-layout view="lHh Lpr lFf">
     <div id="q-bodybox" class="bodybox indexbox" >
       	<div id="box" >
              <div class="head">
                <div class="title fl">
                    <img src="statics/img/logo_s.png" alt="" class="fl">
                </div>
              <div class="setting fr">
                  <ul>
                    <!-- <li class="setbtn" @click="topiconno(topicon)">
                            <span class="topicon" :class="topicon?'topiconno':'topiconnoyes'" ></span>
                        </li> -->
                        <li class="setbtn" >
                            <span class="setbtnicon topiconBg"></span>
                            <ul class="setmess" :style="{'right':routepath == 'componentlist' && upconfig?'2px':'30px'}">
                                <li > 
                                    <button class="passwordicon" @click="uppassword">更改密码</button>
                                </li>
                                <li v-if="routepath == 'componentlist' && upconfig"> 
                                    <button class="upsetmysql" @click="upconfigip">更改数据库配置</button>
                                </li>
                                <li >
                                    <router-link class="exiticon" to="/user" tag="button" >切换账户</router-link>
                                </li>
                                <li v-if="routepath == 'componentlist'">
                                    <button class="abouticon" @click="viewabout">关于</button>
                                </li>
                            </ul>
                        </li>
                       <electionbtn v-if="btn"/>
                  </ul>
              </div>
        </div>
        <router-view />
        <dialogmode/>
        </div>
    </div> 
  </q-layout>
</template>

<script>

import { userwin,uppassword,operatebtn } from 'src/statics/js/public.js'
import { jsonpget } from 'src/statics/js/axios.js'
import electionBtn from 'src/pages/electionBtn.vue'
import dialogmode from 'src/components/dialogmode.vue'
export default {
    name: 'MyLayout',
    data () {
        return {
            topicon:false,
            btn:false,
            uppassword:uppassword,
            
        }
    },
    created() {
        userwin('/')
        this.getconfig()
        this.getabnormals()
    },
    mounted(){
        operatebtn(this)
    },
   methods:{
       viewabout:function(){
           this.$store.state.example.dialogVisible = true
            this.$store.state.example.dialogName = '关于'
       },
       getconfig:function(){
            var json = {
                url:'/dbconfig/getsqlcategory',
            }
            jsonpget(this,json,(res)=>{
                if(!res.success){
                    if(res.msg.length > 0){
                         this.$store.state.example.upconfig = true
                    }else{
                         this.$store.state.example.upconfig = false
                    }
                    this.$store.state.example.getsqlcategory = res.msg
                }else{
                    this.$store.state.example.upconfig = false
                }
            })
        },
        upconfigip(){
            if(this.$store.state.example.getsqlcategory){
                this.$store.state.example.dialogVisible = true
                this.$store.state.example.dialogName = '更改配置服务器'
                this.$store.state.example.operatefun = this.tasklist
            }
        },
        changepwd(){

        },
        changeuser(){

        },
        getabnormals(){
            var json = {
                url:"/task/getabnormals",
            }   
            jsonpget(this,json,(res)=>{
                if(!res.success){
                   this.abnormals = res.msg
                   this.topicon = true
                }else{
                    this.topicon = false
                }
            })
        },
        topiconno(bool){
            if(bool){
                this.$store.state.example.dialogVisible = true
                this.$store.state.example.dialogName = '异常备份详情'
                this.$store.state.example.abnormalsdata = this.abnormals
            }
        }
  },
  components:{
      electionbtn:electionBtn,
      dialogmode:dialogmode
  },
   computed:{ 
        upconfig:{
            get(){
                return this.$store.state.example.upconfig
            },
            set(){
                return this.$store.state.example.upconfig
            }
        },
        routepath:{
            get(){
                return this.$store.state.example.routepath
            },
            set(){
                return this.$store.state.example.routepath
            }
        }
    }
}
</script>

<style>
</style>
