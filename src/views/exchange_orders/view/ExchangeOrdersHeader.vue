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
            <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
            <SearchSelect
                :title="tableColumns.receive_payment_type.name"
                v-model="listQuery.receive_payment_type"
                :options="tableColumns.receive_payment_type.options"
            />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchSelect
                :title="tableColumns.exchange_channel.name"
                v-model="listQuery.exchange_channel"
                :options="tableColumns.exchange_channel.options"
            />

            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
            <SearchInput :title="tableColumns.third_order_no.name" v-model="listQuery.third_order_no" :width="300" />
            <SearchSelect
                :title="tableColumns.exchange_vendors_id.name"
                v-model="listQuery.exchange_vendors_id"
                :options="tableColumns.exchange_vendors_id.options"
            />
            <SearchRange
                :title="tableColumns.gold.name"
                min="0"
                max="9999999"
                :maxValue.sync="listQuery['gold-{<=}']"
                :minValue.sync="listQuery['gold-{>=}']"
                :placeholders="[$t('common.minMoney'), $t('common.maxMoney')]"
            />
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
import { Component, Watch } from "vue-property-decorator";
import ExchangeOrdersProxy from "../proxy/ExchangeOrdersProxy";
import ExchangeAutoCheckProxy from "../proxy/ExchangeAutoCheckProxy";
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
export default class ExchangeOrdersHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    private autoProxy: ExchangeAutoCheckProxy = this.getProxy(ExchangeAutoCheckProxy);

    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.autoProxy.listQuery.plat_id = this.listQuery.plat_id;

        this.myProxy.onQuery();
        this.autoProxy.checkVerify();
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
</style>
