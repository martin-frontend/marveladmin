<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :options="tableColumns['plat_id'].options"
                v-model="listQuery.plat_id"
                :title="tableColumns['plat_id'].name"
                @change="handlerSearch"
                :clearable="false"
            />
            <div>
                <el-button class="header-button" @click="exportExcel" type="primary" icon="el-icon-download">{{
                    $t("statistic_plat_days.export")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticBetPlatDaysProxy from "../proxy/StatisticBetPlatDaysProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class StatisticBetPlatDaysHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: StatisticBetPlatDaysProxy = this.getProxy(StatisticBetPlatDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch(plat_id: string) {
        this.listQuery.page_count = 1;
        this.listQuery.plat_id = plat_id;
        this.myProxy.platListQuery.page_count = 1;
        this.myProxy.platListQuery.plat_id = plat_id;
        this.myProxy.onQuery();
    }

    private exportExcel() {
        this.myProxy.onQueryAll();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.group {
    display: flex;
    justify-content: space-between;
}
</style>
