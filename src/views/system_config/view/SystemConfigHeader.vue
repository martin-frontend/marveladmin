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
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" icon="el-icon-refresh" type="primary">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="row">
            <el-button
                v-if="checkUnique(unique.system_config_store)"
                @click="handlerCreate"
                type="primary"
                class="item"
                >{{ $t("common.create") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: SystemConfigProxy = this.getProxy(SystemConfigProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

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
