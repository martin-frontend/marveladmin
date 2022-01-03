<template>
    <div class="row">
        <div class="config-item" v-if="myProxy.backWaterData.showBackWater">
            <el-form label-width="18px" :inline="false" style="marginTop: 22px" v-loading="net_status.loading">
                <el-form-item style="marginBottom: 10px">
                    <el-row>
                        <el-input
                            style="width: 200px"
                            v-for="(value, key) in myProxy.backWaterData.vendor_type_options"
                            :key="key"
                            class="input"
                            type="number"
                            step="0.0001"
                            v-model="myProxy.backWaterData.backWaterConfig[key].backwater_rate"
                            oninput="if(value.length>6)value=value.slice(0,6)"
                            :disabled="!myProxy.backWaterData.isEdit"
                        >
                            <template slot="prepend">{{ value }}</template>
                        </el-input>
                    </el-row>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBackwaterProxy from "../proxy/PlatBackwaterProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatBackwaterBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBackwaterProxy = this.getProxy(PlatBackwaterProxy);
    // proxy property
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page:number){
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.config-item {
    border: 1px solid #ddd;
    margin-top: 10px;
}
</style>
