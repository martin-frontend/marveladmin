<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="handlerSearch"
            />
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import DashboardProxy from "../proxy/DashboardProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class DashboardHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: DashboardProxy = this.getProxy(DashboardProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
