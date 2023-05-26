<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :options="tableColumns['plat_id'].options"
                v-model="listQuery.plat_id"
                :title="tableColumns['plat_id'].name"
                @change="handlerSearch"
                :clearable="false"
            />
            <div>
                <el-button
                    class="header-button"
                    @click="exportExcel"
                    :disabled="!chickExport"
                    type="primary"
                    icon="el-icon-download"
                    >{{ LangUtil("导出") }}</el-button
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticBetPlatDaysProxy from "../proxy/StatisticBetPlatDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class StatisticBetPlatDaysHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticBetPlatDaysProxy = this.getProxy(StatisticBetPlatDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch(plat_id: string) {
        this.listQuery.page_count = 1;
        this.listQuery.plat_id = plat_id;
        this.myProxy.platListQuery.page_count = 1;
        this.myProxy.platListQuery.plat_id = plat_id;
        this.myProxy.onQuery();
    }

    exportExcel() {
        this.myProxy.openDialogFieldSelection();
        //this.myProxy.onQueryAll();
    }
    get chickExport(): boolean {
        return this.myProxy.tableData.list && this.myProxy.tableData.list.length > 1;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.group {
    display: flex;
    justify-content: space-between;
}
</style>
