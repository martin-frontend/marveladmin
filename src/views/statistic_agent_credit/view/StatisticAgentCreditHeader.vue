<template>
    <div class="search_style">
        <div class="search_space">
            <!-- 所属平台 -->
            <div class="item_group">
                <div class="cust_title">{{ tableColumns["plat_id"].name }}</div>
                <el-select
                    v-model="listQuery.plat_id"
                    filterable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                >
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
                    :tip="$t('plat_users_bet.defaultTime')"
                    :pickerOptions="myProxy.pickerOptions"
                />
            </div>
            <!-- 币种 -->
            <div class="item_group">
                    <div class="cust_title">{{ tableColumns["coin_name_unique"].name }}</div>
                    <el-select v-model="listQuery.coin_name_unique" filterable class="select"
                        :placeholder="$t('common.pleaseChoose')" >
                        <el-option v-for="(value, key) in tableColumns.coin_name_unique.options[listQuery.plat_id]" :key="key" :label="value"
                            :value="key"></el-option>
                    </el-select>
                </div>
            <!-- 搜索、重置 按钮 -->
            <div>
                <el-button @click="handlerSearch" type="primary" icon="el-icon-search" class="item">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="item">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    @Watch("listQuery.plat_id")
    onWatchPlat(){
        this.listQuery.coin_name_unique = "USDT";
    }

    @Watch("listQuery.coin_name_unique")
    onWatchCoin(){
        this.myProxy.tableData.list = [];
        this.myProxy.onQuery();
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
