<template>
    <div class="search_style">
        <div class="search_space">
            <!-- 所属平台 -->
            <div class="item_group">
                <div class="cust_title">{{ tableColumns["plat_id"].name }}</div>
                <el-select v-model="listQuery.plat_id" filterable class="select" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </div>
            <!-- 结算时间 -->
            <div class="item_group">
                <SearchDatePicker
                    :title="tableColumns.searchtime.name"
                    :startDate.sync="listQuery.start_date"
                    :endDate.sync="listQuery.end_date"
                    :showTime="true"
                    :tip="LangUtil('（北京时间）')"
                    :pickerOptions="myProxy.pickerOptions"
                />
            </div>
            <!-- 币种 -->
            <div class="item_group">
                <div class="cust_title">{{ tableColumns["coin_name_unique"].name }}</div>
                <el-select
                    v-model="listQuery.coin_name_unique"
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.coin_name_unique.options[listQuery.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </div>
            <!-- 搜索、重置 按钮 -->
            <div>
                <el-button @click="handlerSearch" type="primary" icon="el-icon-search" class="item">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="item">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import StatisticAgentCreditProxy from "../proxy/StatisticAgentCreditProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchDatePicker,
    },
})
export default class StatisticAgentCreditHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    @Watch("listQuery.plat_id")
    onWatchPlat() {
        this.listQuery.coin_name_unique = "USDT";
    }

    @Watch("listQuery.coin_name_unique")
    onWatchCoin() {
        this.myProxy.tableData.list = [];
        this.myProxy.onQuery();
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
