<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
            :clearable="false"
        />
        <div class="group">
            <SearchDatePicker
                :title="tableColumns['bet_at'].name"
                :startDate.sync="listQuery['bet_at-{>=}']"
                :endDate.sync="listQuery['bet_at-{<=}']"
                :showTime="true"
                :tip="$t('plat_users_bet.defaultTime')"
                :pickerOptions="myProxy.pickerOptions"
            />
            <SearchDatePicker
                :title="tableColumns['settlement_at'].name"
                :startDate.sync="listQuery['settlement_at-{>=}']"
                :endDate.sync="listQuery['settlement_at-{<=}']"
                :showTime="true"
                :tip="$t('plat_users_bet.defaultTime')"
                :pickerOptions="myProxy.pickerOptions"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.nick_name.name" v-model="listQuery.nick_name" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                v-model="listQuery.vendor_id"
                :options="tableColumns.vendor_id.options"
            />
            <SearchSelect
                :title="tableColumns.vendor_type.name"
                v-model="listQuery.vendor_type"
                :options="tableColumns.vendor_type.options"
            />
             <SearchInput :title="tableColumns.vendor_product_name.name" v-model="listQuery.vendor_product_name" />
            <SearchInput :title="tableColumns.ori_product_id.name" v-model="listQuery.ori_product_id" />
            <SearchSelect
                :title="tableColumns.settlement_status.name"
                v-model="listQuery.settlement_status"
                :options="tableColumns.settlement_status.options"
            />
            <SearchRange
                :title="tableColumns.win_gold.name"
                min="-9999999"
                max="9999999"
                :minValue.sync="listQuery['win_gold-{>=}']"
                :maxValue.sync="listQuery['win_gold-{<}']"
                :placeholders="[$t('common.minMoney'), $t('common.maxMoney')]"
            >
                <el-radio-group v-model="winLoss" @change="onWinLossChange">
                    <el-radio :label="0">{{ $t("plat_users_bet.loss") }}</el-radio>
                    <el-radio :label="1">{{ $t("plat_users_bet.win") }}</el-radio>
                </el-radio-group>
            </SearchRange>
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatUsersBetProxy from "../proxy/PlatUsersBetProxy";
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
        SearchRange,
    },
})
export default class PlatUsersBetHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private winLoss: string = "";
    private onWinLossChange(value: any) {
        this.listQuery["win_gold-{>=}"] = value ? 0 : "";
        this.listQuery["win_gold-{<}"] = value ? "" : 0;
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
.bj {
    white-space: nowrap;
    align-self: center;
}
</style>
