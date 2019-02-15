<template>
    <div class="title_box">
        <div class="usermess">
            <img class="user_icon" :src="avatar" alt="头像">
        </div>
        <div class="nickname"> {{nickname}}</div>
        <div class="boxbtn">
            <el-button class="btn"  @click="operatewin('/componentlist/copy')" type="primary">备份详情 >></el-button>
        </div>
        <div class="listsum">
            <div class="listbox fl" @click="operatewin('/componentlist/secretkey')">
                <div class="list">
                    <i class="iconfont icon-miyao"></i>
                </div>
                <div class="listmess">
                    秘钥对管理
                </div>
            </div>
             <div class="listbox fr" @click="operatewin('/componentlist/task')">
                <div class="list">
                    <i class="iconfont icon-renwu"></i>
                </div>
                <div class="listmess">
                    任务列表
                </div>
            </div>
             <div class="listbox fl" @click="vippay">
                <div class="list">
                    <i class="iconfont icon-dinggou"></i>
                </div>
                <div class="listmess">
                    订购
                </div>
            </div>
             <div class="listbox fr" @click="operatewin('/evenmore',true)">
                <div class="list">
                    <i class="iconfont icon-gengduo"></i>
                </div>
                <div class="listmess">
                    更多
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
import { vippay,getCookies,operatewin } from 'src/statics/js/public.js'

export default {
  name: 'PageIndex',
  data(){
      return {
        nickname:'',
        level: 0,
        avatar:"statics/img/head_default.png",
        vippay:vippay,
        operatewin:operatewin
      }
  },
  created(){
        getCookies("userdata",(data)=>{
            var datavalue = data.value
            if(this.$store.state.example.buildPC){
                if(datavalue.avatar){
                    this.avatar = datavalue.avatar
                }
                this.level = datavalue.level
            }else{
                var newvalue = JSON.parse(datavalue)
                if(newvalue.avatar){
                    this.avatar = newvalue.avatar
                }
                this.level = newvalue.level
            }
        })
        getCookies('nickname',(data)=>{
            this.nickname = data.value
        })
  },
  mounted(){
    var box = document.getElementById("box")
    box.className = "skinbg"
  }
}
</script>
