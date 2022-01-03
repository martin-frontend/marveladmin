<template>
    <div class="header-content">
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
                :showTime="true"
            />
            <SearchSelect
                :options="tableColumns['vendor_id'].options"
                v-model="listQuery.vendor_id"
                :title="tableColumns['vendor_id'].name"
                @change="listQuery.vendor_product_id = ''"
            />
            <SearchSelect
                :options="myProxy.gameOptions"
                v-model="listQuery.vendor_product_id"
                :title="tableColumns['vendor_product_id'].name"
                :placeholder="$t('common.pleaseChoose')"
            />
            <SearchSelect
                :options="tableColumns['vendor_type'].options"
                v-model="listQuery.vendor_type"
                :title="tableColumns['vendor_type'].name"
            />
            <SearchSelect
                :clearable="false"
                :width="315"
                :options="tableColumns['time_region_hour_interval'].options"
                v-model="listQuery.time_region_hour_interval"
                :title="tableColumns['time_region_hour_interval'].name"
            />
            <div>
                <el-button @click="handlerSearch()" class="header-button" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <el-radio-group v-model="listQuery.time_type">
            <el-radio v-for="(value, key) in tableColumns['time_type'].options" :key="key" :label="key">
                {{ value }}
            </el-radio>
        </el-radio-group>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import StatisticBetPlatDaysProxy from "../../../proxy/StatisticBetPlatDaysProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import GlobalVar from "@/core/global/GlobalVar";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchDatePicker,
        SearchSelect,
    },
})
export default class StatisticGameHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: StatisticBetPlatDaysProxy = this.getProxy(StatisticBetPlatDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    @Watch("listQuery.time_type")
    onWatchTimeType() {
        this.myProxy.onQuery();
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }
    private handlerReset() {
        this.myProxy.resetListQuery();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
