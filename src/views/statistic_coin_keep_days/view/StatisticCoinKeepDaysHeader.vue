<template>
    <div class="header-content">
        <div>
            <div class="group">
                <SearchSelect
                    :title="tableColumns.plat_id.name"
                    :options="tableColumns.plat_id.options"
                    :clearable="false"
                    v-model="listQuery.plat_id"
                    @change="handlerSearch"
                />
                <!-- <SearchSelect
                    :title="tableColumns.coin_name_unique.name"
                    :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
                    :clearable="false"
                    v-model="listQuery.coin_name_unique"
                    @change="handlerSearch"
                /> -->
            </div>
            <div class="group">
                <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
                <SearchDatePicker
                    :title="tableColumns.created_date.name"
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
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticCoinKeepDaysProxy from "../proxy/StatisticCoinKeepDaysProxy";
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
export default class StatisticCoinKeepDaysHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticCoinKeepDaysProxy = this.getProxy(StatisticCoinKeepDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    userList = this.myProxy._userList;

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
    get getExcelOutputName() {
        let name: string = LangUtil("价值留存统计");
        return `${name}-${this.listQuery.plat_id}-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{>=}"]}`;
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
