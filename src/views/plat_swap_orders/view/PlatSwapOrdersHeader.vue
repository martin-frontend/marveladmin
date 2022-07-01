<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            clearable
        />

        <div class="group">
            <SearchDatePicker
                :title="tableColumns.trade_time.name"
                :startDate.sync="listQuery['trade_time-{>=}']"
                :endDate.sync="listQuery['trade_time-{<=}']"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <!-- <SearchSelect
                :title="tableColumns.plat_swap_pair_id.name"
                v-model="listQuery.plat_swap_pair_id"
                :options="tableColumns.plat_swap_pair_id.options"
                clearable
            /> -->
        </div>
        <div class="group">
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">查询</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatSwapOrdersProxy from "../proxy/PlatSwapOrdersProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchSelect,
        SearchDatePicker,
        SearchInput,
    },
})
export default class PlatSwapOrdersHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatSwapOrdersProxy = this.getProxy(PlatSwapOrdersProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    // get swapPairId() {
    //     let option = [];

    //     return option;
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
