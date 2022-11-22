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
                    LangUtil("导出")
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
                :tip="LangUtil('币商收款通道查询通道ID')"
            />
            <SearchInput :title="LangUtil('操作用户')" v-model="listQuery.updated_by" />
            <SearchRange
                :title="tableColumns.gold.name"
                :minValue.sync="listQuery['gold-{>=}']"
                :maxValue.sync="listQuery['gold-{<=}']"
                :placeholders="[LangUtil('最小金额'), LangUtil('最大金额')]"
            />
            <div>
                <el-button @click="handlerSearch" class="item" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset" class="item" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>

        <div class="autoReload">
            <div class="now_gold">
                {{ LangUtil("账号当持有金币") }}: {{ myProxy.coinWallet }}
                <span>{{ LangUtil("查询汇总") }}</span>
                <span>{{ LangUtil("充值总金额") }}:{{ tableData.total_gold }}</span>
                <span>{{ LangUtil("充值订单数") }}:{{ tableData.total_num }}</span>
                <span>{{ LangUtil("充值成功金额") }}:{{ tableData.success_total_gold }}</span>
                <span>{{ LangUtil("充值成功订单数") }}:{{ tableData.success_total_num }}</span>
                <span>{{ LangUtil("充值人数") }}:{{ tableData.total_user_num }}</span>
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: CoinReceiveRechargeOrderProxy = this.getProxy(CoinReceiveRechargeOrderProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData;
    listQuery = this.myProxy.listQuery;
    reloadData = this.myProxy.reloadData;

    handlerChangePlat() {
        this.myProxy.onQuery();
        this.myProxy.onWallet();
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
