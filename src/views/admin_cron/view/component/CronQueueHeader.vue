<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.cron_id.name"
                :placeholder="LangUtil('请选择')"
                :options="tableColumns.cron_id.options"
                v-model="listQuery.cron_id"
            />
            <SearchInput
                :title="tableColumns.unique.name"
                :placeholder="LangUtil('请输入')"
                v-model="listQuery.unique"
                :width="290"
            />
            <SearchInput
                :title="tableColumns.unique_log_id.name"
                :placeholder="LangUtil('请输入')"
                v-model="listQuery.unique_log_id"
                :width="400"
            />
            <SearchSelect
                :title="tableColumns.status.name"
                :placeholder="LangUtil('请选择')"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
            />
            <SearchDatePicker
                :title="tableColumns.next_run_date.name"
                :startDate.sync="listQuery['next_run_date-{>=}']"
                :endDate.sync="listQuery['next_run_date-{<=}}']"
                :showTime="true"
            />
            <el-button class="header-button" icon="el-icon-search" @click="handlerSearch()" type="primary">{{
                LangUtil("查询")
            }}</el-button>
            <el-button class="header-button" icon="el-icon-refresh" @click="handlerReset()" type="primary">{{
                LangUtil("重置")
            }}</el-button>
        </div>
        <div class="group">
            <el-button @click="handlerCreate" icon="el-icon-circle-plus-outline" type="primary" class="item">{{
                LangUtil("批量更新")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import AdminCronProxy from "../../proxy/AdminCronProxy";
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
        SearchRange,
        SearchDatePicker,
    },
})
export default class AdminCronHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    tableColumns = this.myProxy.cronQueueTableData.columns;
    listQuery = this.myProxy.cronQueueListQuery;

    created() {
        this.myProxy.getCronQueueData();
    }

    get tabsStatus() {
        return this.myProxy.tabsStatus;
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQueryCronQueue();
    }

    handlerReset() {
        this.myProxy.resetCronQueueListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialogCronQueueBatch(DialogStatus.create);
    }

    handlerTabs(value: any) {
        this.myProxy.onTabsChange(value.name);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
