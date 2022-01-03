<template>
    <div class="header-content">
        <div class="header-group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                :clearable="false"
                @change="handlerSearch"
            />
            <div>
                <el-button class="header-button" @click="exportExcel" type="primary" icon="el-icon-download">{{
                    $t("statistic_plat_days.export")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>}']"
                :endDate.sync="listQuery['created_at-{<}']"
                :showTime="true"
            />
            <SearchDatePicker
                :title="tableColumns.updated_at.name"
                :startDate.sync="listQuery['updated_at-{>}']"
                :endDate.sync="listQuery['updated_at-{<}']"
                :showTime="true"
            />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchSelect
                :title="tableColumns.coin_user_id.name"
                v-model="listQuery.coin_user_id"
                :options="tableColumns.coin_user_id.options[listQuery.plat_id]"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">查询</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">重置</el-button>
            </div>
        </div>
        <div class="autoReload">
            <div class="statistics">
                <span>{{ $t("common.tableInfoTitle") }}</span>
                <span>{{ $t("exchange_orders.tableInfoTotalGold") }}:{{ tableData.total_gold }}</span>
                <span>{{ $t("exchange_orders.tableInfoTotalNum") }}:{{ tableData.total_num }}</span>
                <span>{{ $t("exchange_orders.tableInfoSuccessTotalGold") }}:{{ tableData.success_total_gold }}</span>
                <span>{{ $t("exchange_orders.tableInfoSuccessTotalNum") }}:{{ tableData.success_total_num }}</span>
            </div>
            <SearchSelect
                :title="$t('common.autoRefresh')"
                v-model="reloadData.autoTime"
                :options="reloadData.options"
                @change="handlerAutoReload"
                :placeholder="$t('common.notAutoRefresh')"
                :tip="$t('common.autoRefreshTip')"
            />
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CoinExchangeOrdersProxy from "../proxy/CoinExchangeOrdersProxy";
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
export default class CoinExchangeOrdersHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CoinExchangeOrdersProxy = this.getProxy(CoinExchangeOrdersProxy);
    // proxy property
    private tableData = this.myProxy.tableData;
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    private reloadData = this.myProxy.reloadData;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerAutoReload() {
        this.myProxy.autoReload();
    }

    private exportExcel() {
        this.myProxy.onQueryAll();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.header-group {
    display: flex;
    justify-content: space-between;
}
.autoReload {
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    .statistics {
        margin-top: 16px;
    }
    ::v-deep .el-select {
        width: 100%;
    }
    ::v-deep .content {
        width: 300px;
        ::v-deep .el-select {
            width: 100%;
        }
    }
    span {
        margin-left: 16px;
    }
}
</style>
