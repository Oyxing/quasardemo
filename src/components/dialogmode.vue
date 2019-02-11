<template>
    <div>
        <addtask/>
        <configip/>
        <abnormals/>
        <copedetails/>
        <createabout/>
    </div>
</template>

<script>
import addtask from 'src/components/dialog/addtask.vue'
import configip from 'src/components/dialog/configip.vue'
import abnormals from 'src/components/dialog/abnormals.vue'
import copedetails from 'src/components/dialog/copedetails.vue'
import createabout from 'src/components/dialog/createabout.vue'
export default {
    components:{
        addtask:addtask,
        configip:configip,
        abnormals:abnormals,
        copedetails:copedetails,
        createabout:createabout
    }
}
</script>

<style>

</style>
