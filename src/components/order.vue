<template>
    <div class="pagecomp">
        <div class="pagecompheard">   
            订购特权说明
        </div>
        <div class="showmess" >
            <div class="orderexplain">
                请选择适当的云备份空间,以确保业务良好。本产品由中光电信提供云备份空间。
            </div>
            <div class="vipdivst">
                <div class="tableheadmess divstmess">
                    <div class="vip-table-ident leftradius"></div> 
                    <div class="vip-table-item">自动备份</div> 
                    <div class="vip-table-item">空间(GB)</div> 
                    <div class="vip-table-item">备份数据库</div> 
                    <div class="vip-table-item">价格</div> 
                </div> 
                <div class="userlistmess divstmess">
                    <div class="vip-table-ident">普通用户</div> 
                    <div class="vip-table-item vip-table-dui">√</div> 
                    <div class="vip-table-item">5</div> 
                    <div class="vip-table-item">无限制</div> 
                    <div class="vip-table-item vip-table-money">0</div> 
                </div> 
                <div class="vipmess divstmess">
                    <div class="vip-table-ident"><span class="vip-icon"></span>VIP1</div> 
                    <div class="vip-table-item vip-table-dui">√</div> 
                    <div class="vip-table-item">50</div> 
                    <div class="vip-table-item">无限制</div> 
                    <div class="vip-table-item vip-table-money">78<span>元/年</span></div> 
                </div> 
                <div class="vipmess divstmess">
                    <div class="vip-table-ident"><span class="vip-icon"></span>VIP2</div> 
                    <div class="vip-table-item vip-table-dui">√</div> 
                    <div class="vip-table-item">500</div> 
                    <div class="vip-table-item">无限制</div> 
                    <div class="vip-table-item vip-table-money">580<span>元/年</span></div> 
                </div> 
                <div class="vipmess divstmess">
                    <div class="vip-table-ident rightradius"><span class="vip-icon"></span>VIP3</div> 
                    <div class="vip-table-item vip-table-dui">√</div> 
                    <div class="vip-table-item">1024</div> 
                    <div class="vip-table-item">无限制</div> 
                    <div class="vip-table-item vip-table-money">980<span>元/年</span></div> 
                </div>
            </div>
             <el-button class="orderbtn" type="warning" circle @click="vippay">
                 <i class="iconfont icon-dinggou"></i>
                 点击跳转订购页面</el-button>
        </div>
    </div>
</template>
<script>
import { vippay } from 'src/statics/js/public.js'
export default {
    data() {
        return {
            vippay:vippay
        }
    },
}
</script>
<style scoped>
.orderexplain{
    margin-top: 20px;
    font-size: 14px;
}
.orderbtn{
    width: 190px;
    height: 40px;
    margin-top: 16px;
    background: #ffa200;
}
</style>
