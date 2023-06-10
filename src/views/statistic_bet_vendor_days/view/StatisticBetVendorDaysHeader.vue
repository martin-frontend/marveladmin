<template>
    <div class="header-content">
        <div class="group_1">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                :clearable="false"
                @change="handlerSearch(true)"
            />
            <div>
                <ExportDialog
                    style="margin-left: 8px;"
                    :fiterOption="userList"
                    :proxy="myProxy"
                    :export_file_name="getExcelOutputName"
                    @exportExcel="exportExcel"
                />
            </div>
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
                :showTime="true"
            />
            <SearchSelect
                :title="tableColumns.time_region_hour_interval.name"
                v-model="listQuery.time_region_hour_interval"
                :options="tableColumns.time_region_hour_interval.options"
                :clearable="false"
            />
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                v-model="listQuery.vendor_id"
                :options="tableColumns.vendor_id.options"
                :clearable="false"
            />

            <!-- <SearchInput :title="tableColumns.time_region_hour_interval.name" v-model="listQuery.time_region_hour_interval" /> -->

            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticBetVendorDaysProxy from "../proxy/StatisticBetVendorDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";
import ExportDialog from "@/components/ExportDialog.vue";
@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
        ExportDialog,
    },
})
export default class StatisticBetVendorDaysHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: StatisticBetVendorDaysProxy = this.getProxy(StatisticBetVendorDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    userList = this.myProxy._userList;
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
    get chickExport(): boolean {
        return this.myProxy.tableData.list && this.myProxy.tableData.list.length > 0;
    }
    get getExcelOutputName() {
        let name: string = LangUtil("平台输赢统计");
        return `${name}-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{<=}"]}`;
    }

    exportExcel(val: boolean, pageInfo: any) {
        this.myProxy.tableData.isExportExcel = val;
        if (val) {
            this.myProxy.onQuery_export(pageInfo);
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.group_1 {
    display: flex;
    justify-content: space-between;
}
</style>
