<template>
    <div class="header-content">
        <div class="group space_between">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
                :width="350"
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
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<}']"
                :showTime="true"
            />
            <SearchDatePicker
                :title="tableColumns.pay_time.name"
                :startDate.sync="listQuery['pay_time-{>=}']"
                :endDate.sync="listQuery['pay_time-{<}']"
                :showTime="true"
            />
        </div>
        <div class="group">
            <SearchInput
                :title="tableColumns.user_recharge_certificate.name"
                v-model="listQuery.user_recharge_certificate"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
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
            <SearchInput
                :title="tableColumns.payment_channel_id.name"
                v-model="listQuery.payment_channel_id"
                :tip="$t('coin_receive_recharge_order.channelIdTip')"
            />
            <SearchInput :title="$t('common.operationUser')" v-model="listQuery.updated_by" />
            <SearchRange
                :title="tableColumns.gold.name"
                :minValue.sync="listQuery['gold-{>=}']"
                :maxValue.sync="listQuery['gold-{<=}']"
                :placeholders="[$t('common.minMoney'), $t('common.maxMoney')]"
            />
            <div>
                <el-button @click="handlerSearch" class="item" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset" class="item" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>

        <div class="autoReload">
            <div class="now_gold">
                {{ $t("coin_receive_recharge_order.accountHaveMoney") }}: {{ myProxy.coinWallet }}
                <span>{{ $t("common.tableInfoTitle") }}</span>
                <span>{{ $t("recharge_orders.tableInfoTotalGold") }}:{{ tableData.total_gold }}</span>
                <span>{{ $t("recharge_orders.tableInfoTotalNum") }}:{{ tableData.total_num }}</span>
                <span>{{ $t("recharge_orders.tableInfoSuccessTotalGold") }}:{{ tableData.success_total_gold }}</span>
                <span>{{ $t("recharge_orders.tableInfoSuccessTotalNum") }}:{{ tableData.success_total_num }}</span>
                <span>{{ $t("recharge_orders.tableInfoTotalUserNum") }}:{{ tableData.total_user_num }}</span>
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
import CoinReceiveRechargeOrderProxy from "../proxy/CoinReceiveRechargeOrderProxy";
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
export default class CoinReceiveRechargeOrderHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CoinReceiveRechargeOrderProxy = this.getProxy(CoinReceiveRechargeOrderProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData;
    private listQuery = this.myProxy.listQuery;
    private reloadData = this.myProxy.reloadData;

    private handlerChangePlat() {
        this.myProxy.onQuery();
        this.myProxy.onWallet();
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
.autoReload {
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    .now_gold {
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
}
.space_between {
    justify-content: space-between;
}
span {
    margin-left: 20px;
}
</style>
