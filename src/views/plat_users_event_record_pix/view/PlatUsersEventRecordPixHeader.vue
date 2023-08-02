<template>
    <div class="header-content">
        <div class="test">
            <SearchSelect
                :title="LangUtil('选择时区')"
                :options="myProxy.timezoneOption"
                v-model="myProxy.curTimeZone"
                :clearable="false"
            />
        </div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="
                    changePlat();
                    handlerSearch();
                "
                :clearable="false"
            />
            <SearchSelect
                :title="tableColumns.channel_id.name"
                :options="tableColumns.channel_id_options"
                v-model="listQuery.channel_id"
            />
            <!-- <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="tableColumns.event_type.name"
                :options="tableColumns.event_type.options"
                v-model="listQuery.event_type"
            /> -->
            <SearchDatePicker
                :title="tableColumns.event_time.name"
                :startDate.sync="listQuery['event_time-{>=}']"
                :endDate.sync="listQuery['event_time-{<=}']"
                :showTime="true"
            />
        </div>
        <div>
            <el-button @click="handlerSearch" type="primary" icon="el-icon-search">
                {{ LangUtil("查询") }}
            </el-button>
            <el-button @click="handlerReset" type="primary" icon="el-icon-refresh">
                {{ LangUtil("重置") }}
            </el-button>
            <ExportDialog
                style="margin-left: 10px;"
                :fiterOption="userList"
                :proxy="myProxy"
                :export_file_name="getExcelOutputName"
                @exportExcel="exportExcel"
            />
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUsersEventRecordPixProxy from "../proxy/PlatUsersEventRecordPixProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";
import ExportDialog from "@/components/ExportDialog.vue";
@Component({
    components: {
        SearchSelect,
        SearchInput,
        ExportDialog,
        SearchDatePicker,
    },
})
export default class PlatUsersEventRecordPixHeader extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUsersEventRecordPixProxy = this.getProxy(PlatUsersEventRecordPixProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    userList = this.myProxy._userList;
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    changePlat() {
        this.listQuery.channel_id = "";
        this.tableColumns.channel_id_options = this.tableColumns.channel_id.options[this.listQuery.plat_id];
        const channel_id_keys = Object.keys(this.tableColumns.channel_id_options);
        channel_id_keys.forEach((key: any) => {
            this.tableColumns.channel_id_options[key] = key;
        });
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
        let name = `${LangUtil("PIX统计")}-${plat_name}-${this.listQuery["event_time-{>=}"]}-${
            this.listQuery["event_time-{<=}"]
        }`;
        return name;
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
.test {
    .content {
        display: inline-table;
        width: 600px;
        margin-right: 10px;
        margin-bottom: 10px;
        ::v-deep .el-select {
            width: 100%;
        }
    }
}
</style>
