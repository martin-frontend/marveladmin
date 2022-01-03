<template>
    <div class="recharge_channel_component search_style">
        <span class="cust_title">{{ tableColumns.plat_id.name }}</span>
        <el-select
            filterable
            v-model="listQuery.plat_id"
            :placeholder="$t('common.pleaseChoose')"
            @change="handlerSearch"
        >
            <el-option v-for="(item, key) of tableColumns.plat_id.options" :label="item" :value="key" :key="key">
            </el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import RechargeChannelsPaymethodsProxy from "../proxy/RechargeChannelsPaymethodsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class RechargeChannelsPaymethodsHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: RechargeChannelsPaymethodsProxy = this.getProxy(RechargeChannelsPaymethodsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
