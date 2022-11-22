<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :clearable="false"
            :options="tableColumns.plat_id.options"
        />
        <el-button @click="handlerSearch" type="primary" class="item" icon="el-icon-search">{{
            LangUtil("查询")
        }}</el-button>
        <el-button @click="handlerRefresh" type="primary" class="item">{{ LangUtil("刷新") }}</el-button>
        <el-row>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate">{{
                LangUtil("新增")
            }}</el-button>
        </el-row>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatsModuleShareProxy = this.getProxy(PlatsModuleShareProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerRefresh() {
        this.myProxy.onQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
