<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.name.name" v-model="listQuery.name" />
            <SearchInput :title="tableColumns.key.name" v-model="listQuery.key" />
            <SearchSelect
                :title="tableColumns.category.name"
                v-model="listQuery.category"
                :options="tableColumns.category.options"
            />
            <div>
                <el-button @click="handlerSearch()" icon="el-icon-search" type="primary">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" icon="el-icon-refresh" type="primary">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
        <div class="row">
            <el-button
                v-if="checkUnique(unique.system_config_store)"
                @click="handlerCreate"
                type="primary"
                class="item"
                >{{ LangUtil("新增") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SystemConfigProxy from "../proxy/SystemConfigProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchInput from "@/components/SearchInput.vue";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchInput,
        SearchSelect,
    },
})
export default class SystemConfigHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: SystemConfigProxy = this.getProxy(SystemConfigProxy);
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
