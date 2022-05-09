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
            <el-button class="header-button" icon="el-icon-search" @click="handlerSearch()" type="primary"
                >{{ $t("common.search") }}</el-button
            >
            <el-button class="header-button" icon="el-icon-refresh" @click="handlerReset()" type="primary"
                >{{ $t("common.reset") }}</el-button
            >
        </div>
        <div class="group">
            <el-button @click="handlerCreate" icon="el-icon-circle-plus-outline" type="primary" class="item"
                >{{ $t("common.create") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    private tableColumns = this.myProxy.cronTableData.columns;
    private listQuery = this.myProxy.cronListQuery;

    get tabsStatus() {
        return this.myProxy.tabsStatus;
    }

    beforeMount() {
        this.handlerSearch();
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQueryCron();
    }

    private handlerReset() {
        this.myProxy.resetCronListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialogCron(DialogStatus.create);
    }

    private handlerTabs(value: any) {
        this.myProxy.onTabsChange(value.name);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
