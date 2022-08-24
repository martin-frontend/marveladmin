<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :clearable="false"
            :options="tableColumns.plat_id.options"
        />
        <el-button @click="handlerSearch" type="primary" class="item" icon="el-icon-search">{{
            $t("common.search")
        }}</el-button>
        <el-button @click="handlerRefresh" type="primary" class="item">{{
            $t("coin_receive_payment_channel.refresh")
        }}</el-button>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import PlatsModuleShareProxy from "../proxy/PlatsModuleShareProxy";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatsModuleShareHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatsModuleShareProxy = this.getProxy(PlatsModuleShareProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerRefresh() {
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
