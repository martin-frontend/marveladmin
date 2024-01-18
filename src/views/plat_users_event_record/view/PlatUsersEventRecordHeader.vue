<template>
    <div class="header-content">
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
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="tableColumns.event_type.name"
                :options="tableColumns.event_type.options"
                v-model="listQuery.event_type"
            />
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
            <el-button @click="exportExcel" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                {{ LangUtil("导出") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUsersEventRecordProxy from "../proxy/PlatUsersEventRecordProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchDatePicker,
    },
})
export default class PlatUsersEventRecordHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUsersEventRecordProxy = this.getProxy(PlatUsersEventRecordProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

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

    handlerReset() {
        this.myProxy.resetListQuery();
        this.resetChannelOptions();
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

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
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
