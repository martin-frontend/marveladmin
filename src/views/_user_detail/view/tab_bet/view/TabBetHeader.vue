<template>
    <div class="header-content">
        <div class="group">
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
             <SearchInput
                :title="tableColumns.vendor_product_name.name"
                v-model="listQuery.vendor_product_name"
            />
            <SearchInput
                :title="tableColumns.ori_product_id.name"
                v-model="listQuery.ori_product_id"
            />
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
                <el-radio-group v-model="myProxy.tableData.winLoss" @change="onWinLossChange">
                    <el-radio :label="0">{{ $t("plat_users_bet.loss") }}</el-radio>
                    <el-radio :label="1">{{ $t("plat_users_bet.win") }}</el-radio>
                </el-radio-group>
            </SearchRange>
            <SearchDatePicker
                :title="tableColumns.bet_at.name"
                :startDate.sync="listQuery['bet_at-{>=}']"
                :endDate.sync="listQuery['bet_at-{<=}']"
                :showTime="true"
            />
            <SearchDatePicker
                :title="tableColumns.settlement_at.name"
                :startDate.sync="listQuery['settlement_at-{>=}']"
                :endDate.sync="listQuery['settlement_at-{<=}']"
                :showTime="true"
            />
        </div>
        <div>
            <el-button class="header-button" @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                $t("common.search")
            }}</el-button>
            <el-button class="header-button" @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                $t("common.reset")
            }}</el-button>
        </div>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabBetProxy from "../proxy/TabBetProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchInput from "@/components/SearchInput.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchRange,
        SearchInput,
    },
})
export default class TabBetHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: TabBetProxy = getProxy(TabBetProxy);
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private onWinLossChange(value: any) {
        if (value === 1) {
            this.listQuery["win_gold-{>=}"] = "0";
            this.listQuery["win_gold-{<}"] = "";
        } else {
            this.listQuery["win_gold-{>=}"] = "";
            this.listQuery["win_gold-{<}"] = "0";
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
