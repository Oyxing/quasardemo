<template>
  <div id="q-app">
    <div id="top-no"></div>
    <div id="left-no"></div>
    <div id="right-no"></div>
    <div id="bottom-no"></div>
    <router-view />
  </div>
</template>

<script>
import { uuidverify } from 'src/statics/js/public.js'
import { thisget } from 'src/statics/js/index.js'
import { jsonpget } from 'src/statics/js/axios.js'
export default {
  name: 'App',
  data(){
    return{
      drag:false
    }
  },
  updated() {
    uuidverify(this)
    thisget(this)
  },
  mounted() {

  },
  created(){
    uuidverify(this)
    this.getversion()
  },
  methods:{
    getversion(){
      var json = {
          url:"/ver"
      }
      jsonpget(this,json,(res)=>{
         this.$store.state.example.version = res.msg
      })
    }
  }
}
</script>

<style>
</style>
