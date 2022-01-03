<template>
    <div class="header-content">
        <div class="group space_between">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
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
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" :width="340" />
            <SearchInput :title="tableColumns.created_by.name" v-model="listQuery.created_by" />
            <div>
                <el-button @click="handlerSearch()" class="item" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" class="item" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>

                <span>{{ $t("common.tableInfoTitle") }}</span>
                <span>{{ $t("recharge_orders.tableInfoTotalGold") }}:{{ tableData.total_gold }}</span>
                <span>{{ $t("recharge_orders.tableInfoTotalNum") }}:{{ tableData.total_num }}</span>
                <span>{{ $t("recharge_orders.tableInfoSuccessTotalGold") }}:{{ tableData.success_total_gold }}</span>
                <span>{{ $t("recharge_orders.tableInfoSuccessTotalNum") }}:{{ tableData.success_total_num }}</span>
                <span>{{ $t("recharge_orders.tableInfoTotalUserNum") }}:{{ tableData.total_user_num }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VipReceiveRechargeOrderProxy from "../proxy/VipReceiveRechargeOrderProxy";
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
export default class VipReceiveRechargeOrderHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: VipReceiveRechargeOrderProxy = this.getProxy(VipReceiveRechargeOrderProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private exportExcel() {
        this.myProxy.onQueryAll();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.space_between {
    justify-content: space-between;
}
span {
    margin-left: 20px;
}
</style>
