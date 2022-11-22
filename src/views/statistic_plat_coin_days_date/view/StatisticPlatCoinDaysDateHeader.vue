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
                <el-button class="header-button" @click="heandlerExport()" type="primary">{{
                    LangUtil("导出")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticPlatCoinDaysDateProxy from "../proxy/StatisticPlatCoinDaysDateProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class StatisticPlatCoinDaysDateHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticPlatCoinDaysDateProxy = this.getProxy(StatisticPlatCoinDaysDateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }
    heandlerExport() {
        this.myProxy.onExportExcel();
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
