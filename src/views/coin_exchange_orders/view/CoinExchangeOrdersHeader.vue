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
                    LangUtil("导出")
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
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    <!-- 查询 -->
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    <!-- 重置 -->
                    {{ LangUtil("重置") }}
                </el-button>
            </div>
        </div>
        <div class="autoReload">
            <div class="statistics">
                <span>{{ LangUtil("查询汇总") }}</span>
                <span>{{ LangUtil("兑换总金额") }}:{{ tableData.total_gold }}</span>
                <span>{{ LangUtil("兑换订单数") }}:{{ tableData.total_num }}</span>
                <span>{{ LangUtil("兑换成功金额") }}:{{ tableData.success_total_gold }}</span>
                <span>{{ LangUtil("兑换成功订单数") }}:{{ tableData.success_total_num }}</span>
            </div>
            <SearchSelect
                :title="LangUtil('自动刷新')"
                v-model="reloadData.autoTime"
                :options="reloadData.options"
                @change="handlerAutoReload"
                :placeholder="LangUtil('不自动刷新')"
                :tip="LangUtil('列表在第1页的时候，自动刷新才生效')"
            />
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: CoinExchangeOrdersProxy = this.getProxy(CoinExchangeOrdersProxy);
    // proxy property
    tableData = this.myProxy.tableData;
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    reloadData = this.myProxy.reloadData;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerAutoReload() {
        this.myProxy.autoReload();
    }

    exportExcel() {
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
