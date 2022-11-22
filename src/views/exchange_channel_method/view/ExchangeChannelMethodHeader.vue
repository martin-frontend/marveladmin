<template>
    <div class="search_style">
        <div class="cust_title">{{ tableColumns.plat_id.name }}</div>
        <el-select
            v-model="listQuery.plat_id"
            filterable
            class="select"
            :placeholder="LangUtil('请选择')"
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
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class ExchangeChannelMethodHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    onChangePlat(plat_id: string) {
        this.listQuery.plat_id = plat_id;
        this.myProxy.onQuery();
    }
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
