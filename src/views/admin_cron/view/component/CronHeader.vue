<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.name.name" v-model="listQuery.name" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
            />
            <SearchInput :title="tableColumns.id.name" v-model="listQuery.id" />
            <SearchInput :title="tableColumns.content.name" v-model="listQuery.content" />
            <el-button class="header-button" icon="el-icon-search" @click="handlerSearch()" type="primary">{{
                LangUtil("查询")
            }}</el-button>
            <el-button class="header-button" icon="el-icon-refresh" @click="handlerReset()" type="primary">{{
                LangUtil("重置")
            }}</el-button>
        </div>
        <div class="group">
            <el-button @click="handlerCreate" icon="el-icon-circle-plus-outline" type="primary" class="item">{{
                LangUtil("新增")
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
    tableColumns = this.myProxy.cronTableData.columns;
    listQuery = this.myProxy.cronListQuery;

    get tabsStatus() {
        return this.myProxy.tabsStatus;
    }

    beforeMount() {
        this.handlerSearch();
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQueryCron();
    }

    handlerReset() {
        this.myProxy.resetCronListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialogCron(DialogStatus.create);
    }

    handlerTabs(value: any) {
        this.myProxy.onTabsChange(value.name);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
