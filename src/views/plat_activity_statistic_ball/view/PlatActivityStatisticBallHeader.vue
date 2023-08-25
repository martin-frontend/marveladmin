<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
            :width="350"
        />
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('活动时间')"
                :startDate.sync="listQuery['start_time-{<=}']"
                :endDate.sync="listQuery['end_time-{>=}']"
            />
            <SearchInput :title="tableColumns.activity_id.name" v-model="listQuery.activity_id" />

            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
                <ExportDialog
                    :fiterOption="userList"
                    :proxy="myProxy"
                    :_convertKeys="convertKeys"
                    :export_file_name="getExcelOutputName"
                    @exportExcel="exportExcel"
                    style="margin-left: 10px;"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatActivityStatisticBallProxy from "../proxy/PlatActivityStatisticBallProxy";
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
export default class PlatActivityStatisticBallHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatActivityStatisticBallProxy = this.getProxy(PlatActivityStatisticBallProxy);
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
        //@ts-ignore
        const plat_name = this.tableColumns.plat_id.options[this.listQuery.plat_id];
        let name = `${LangUtil("彩球活动统计")}-${plat_name}`;
        return name;
    }
    get convertKeys() {
        return [
            "plat_id",
            "cycle_status",
            "vendor_id",
            "vendor_type",
            "vendor_wallet_type",
            "time_region_hour_interval",
            "status",
            "is_activity_task_water",
        ];
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
