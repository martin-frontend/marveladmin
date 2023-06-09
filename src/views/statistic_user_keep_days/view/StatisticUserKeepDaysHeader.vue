<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            :clearable="false"
            @change="handlerSearch"
        />
        <div class="group">
            <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
                <ExportDialog
                    style="margin-left: 8px;"
                    :fiterOption="userList"
                    :proxy="myProxy"
                    :export_file_name="getExcelOutputName"
                    @exportExcel="exportExcel"
                   
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticUserKeepDaysProxy from "../proxy/StatisticUserKeepDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import SearchInput from "@/components/SearchInput.vue";
import ExportDialog from "@/components/ExportDialog.vue";
@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
        ExportDialog,
    },
})
export default class StatisticUserKeepDaysHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticUserKeepDaysProxy = this.getProxy(StatisticUserKeepDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    userList = this.myProxy._userList;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }
    get getExcelOutputName() {
        let name: string = this.tableColumns.type.options[this.myProxy.tableData.activeName];
        return `${name}-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{>=}"]}`;
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
</style>
