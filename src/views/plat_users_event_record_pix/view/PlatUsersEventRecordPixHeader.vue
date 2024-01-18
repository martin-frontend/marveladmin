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
            <div class="content">
                <span class="title">
                    {{ tableColumns.channel_id.name }}
                </span>
                <el-select
                    style="margin-top: 0px"
                    v-model="listQuery.channel_id"
                    clearable
                    filterable
                    v-el-select-loadmore="loadMore"
                    :filter-method="filterMethod"
                    @blur.capture.native="onBlurChannel"
                    @change="onChangeChannel"
                >
                    <el-option v-for="(item, key) in myProxy.options" :key="key" :label="item.key" :value="item.key">
                    </el-option>
                </el-select>
            </div>
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

    getPageList() {
        this.myProxy.getPageList();
    }

    loadMore() {
        this.getPageList();
    }

    filterMethod(val: any) {
        this.myProxy.data = val
            ? this.myProxy.allChannelData.filter(item => item.key.indexOf(val) > -1)
            : this.myProxy.allChannelData;
        this.getPageList();
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    changePlat() {
        this.listQuery.channel_id = "";
        this.myProxy.tableData.columns.channel_id_options = this.myProxy.tableData.columns.channel_id.options[
            this.listQuery.plat_id
        ];
        const channel_id_keys = Object.keys(this.tableColumns.channel_id_options);
        this.myProxy.pageNo = 0;
        this.myProxy.data = [];
        channel_id_keys.forEach((key: any) => {
            this.myProxy.data.push({ key: key });
        });
        this.myProxy.allChannelData = this.myProxy.data;
        this.getPageList();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
        this.resetChannelOptions();
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

    onBlurChannel(e: any) {
        if (e.target.value) {
            if (this.myProxy.options.length == 0) {
                this.resetChannelOptions();
            }
        }
    }

    onChangeChannel() {
        if (this.listQuery.channel_id == "") {
            this.resetChannelOptions();
        }
    }

    resetChannelOptions() {
        this.myProxy.pageNo = 0;
        this.myProxy.data = this.myProxy.allChannelData;
        this.getPageList();
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
.title {
    min-width: 97px;
    text-align: center;
    border-radius: 4px 0 0px 4px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    font-size: 14px;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}
.content {
    display: inline-table;
    // width: 280px;
    margin-right: 10px;
    margin-bottom: 10px;
    .el-select {
        width: 100%;
    }
    ::v-deep .el-input__inner {
        width: 100%;
        border-radius: 0px 4px 4px 0px;
    }
}
</style>
