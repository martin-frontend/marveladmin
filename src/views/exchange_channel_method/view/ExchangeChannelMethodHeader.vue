<template>
    <div class="search_style">
        <div class="cust_title">{{ tableColumns.plat_id.name }}</div>
        <el-select
            v-model="listQuery.plat_id"
            filterable
            class="select"
            :placeholder="$t('common.pleaseChoose')"
            @change="onChangePlat"
        >
            <el-option
                v-for="(value, key) in tableColumns.plat_id.options"
                :key="key"
                :label="value"
                :value="key"
            ></el-option>
        </el-select>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class ExchangeChannelMethodHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private onChangePlat(plat_id: string) {
        this.listQuery.plat_id = plat_id;
        this.myProxy.onQuery();
    }
    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
