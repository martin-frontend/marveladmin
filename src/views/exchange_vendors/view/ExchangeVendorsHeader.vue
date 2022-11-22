<template>
    <div>
        <el-button
            v-if="checkUnique(unique.exchange_vendors_store)"
            class="item"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="handlerCreate"
            >{{ LangUtil("新增") }}</el-button
        >
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import ExchangeVendorsProxy from "../proxy/ExchangeVendorsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class ExchangeVendorsHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: ExchangeVendorsProxy = this.getProxy(ExchangeVendorsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
