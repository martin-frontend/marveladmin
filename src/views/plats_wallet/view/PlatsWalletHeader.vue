<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :clearable="false"
            :options="tableColumns.plat_id.options"
            @change="changePlatId"
        />
        <el-row>
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
            />
            <el-button @click="handlerSearch" type="primary" class="item" icon="el-icon-search">{{
                LangUtil("查询")
            }}</el-button>
            <el-button @click="handlerReset" type="primary" class="item">{{ LangUtil("重置") }}</el-button>
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
import PlatsWalletProxy from "../proxy/PlatsWalletProxy";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatsWalletHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatsWalletProxy = this.getProxy(PlatsWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    changePlatId() {
        this.listQuery.page_count = 1;
        this.listQuery.coin_name_unique = "";
        this.myProxy.onQuery();
    }

    handlerRefresh() {
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
