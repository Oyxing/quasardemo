
<template>
    <div style="display: inline;">
        <li id="minimized">
            <button class="minimizedicon topiconBg" @click="minwin"></button>
        </li>
        <li id="closewin">
            <button class="closewinicon topiconBg" @click="hidewin"></button>
        </li>
    </div>
</template>

<script>
import { hidewin,minwin } from 'src/statics/js/public.js'

export default {
    methods:{
        minwin(){
            minwin()
        },
        hidewin(){
            hidewin()
        }
    }
}
</script>

<style>

</style>

