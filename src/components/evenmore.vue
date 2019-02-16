<template>
    <div class="title_box">
        <div class="eveheader">
            <div class="headerflbox">
                <div class="headerfl">
                    <img class="headerfl_icon" :src="avatar" alt="头像">
                </div>       
                <div class="headermsg">
                    <span>{{nickname}}</span>
                    <span>{{timestampToTime(Date.parse(new Date())/1000).split(" ")[0]}}</span>
                </div> 
            </div>
            <div class="backup" style="margin-top:80px">
                <router-link to="/" tag="a" ><i class="iconfont icon-ffanhui"></i></router-link>
            </div>
        </div>
        <div class="evencentre">
             所有功能
        </div>
        <div class="evenlistsum">
            <div class="listbox" @click="operatewin('/componentlist/secretkey')">
                <div class="list ">
                    <i class="iconfont icon-miyao"></i>
                </div>
                <div class="listmess">
                    秘钥对管理
                </div>
            </div>
             <div class="listbox" @click="operatewin('/componentlist/task')">
                <div class="list ">
                    <i class="iconfont icon-renwu"></i>
                </div>
                <div class="listmess">
                    任务列表
                </div>
            </div>
             <div class="listbox" @click="vippay">
                <div class="list ">
                    <i class="iconfont icon-dinggou"></i>
                </div>
                <div class="listmess">
                    订购
                </div>
            </div>
             <div class="listbox" @click="operatewin('/componentlist/copy')">
                <div class="list ">
                    <i class="iconfont icon-rongzaibeifen"></i>
                </div>
                <div class="listmess">
                    备份详情
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.headerflbox{
    width:80%;
    height: 55px;
    float: left;
    margin-top: 71px;
    display: flex;
    color: #fff;
}
.headerfl{
    width: 55px;
    height: 55px;
    border-radius:50%;
    margin-left: 20px;
}
.headerfl_icon{
    width: 100%;
    height: 100%;
  	display:inline-block;
    vertical-align:middle;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    overflow: hidden;
    border: 5px solid rgba(255, 255, 255, 0.21);
}
.headermsg {
    margin-left: 10px;
}
.headermsg span{
  	display:inline-block;
    width: 100%;
    margin-bottom: 5px;
}
.headermsg span:nth-child(1){
    font-size: 20px;
}
.headermsg span:nth-child(2){
    font-size: 12px;
}

.evencentre{
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin-top: 50px;
    margin-bottom: 34px;
    font-weight: bold;
    color: #7aa6ff;
}
.evenlistsum{
    text-align: center;
    line-height: 54px;
    width: 90%;
    margin-left: 5%;
    color: #7aa6ff;
}
.evenlistsum .listbox{
    float: left;
    cursor: pointer;
    width: 84px;
    height: 84px;
    margin: 0px 12px 30px 12px;
}
.evenlistsum .iconfont{
    font-size: 23px;
}
.evenlistsum .listbox .listmess{
    color: #878787;
    font-size: 13px;
    text-align: center;
}
.evenlistsum .listbox .list{
    width: 52px;
    height: 52px;
    margin: 0 auto;
    border-radius: 50%;
    border: 1px solid #7aa6ff;
}

.evenlistsum .listbox:hover .list{
    background: #7aa6ff;
    color: #fff;
}
.evenlistsum .listbox:hover .listmess{
    color: #7aa6ff;
}
</style>
<script>
import { vippay,getCookies,operatewin,timestampToTime } from 'src/statics/js/public.js'

export default {
  name: 'PageIndex',
  data(){
      return {
        nickname:'',
        level: 0,
        avatar:"statics/img/head_default.png",
        vippay:vippay,
        operatewin:operatewin,
        timestampToTime:timestampToTime
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
    if(box){
        box.className = ""
    }
  }
}
</script>
