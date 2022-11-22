<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            :clearable="false"
        />

        <div class="group">
            <SearchDatePicker
                :title="tableColumns.trade_time.name"
                :startDate.sync="listQuery['trade_time-{>=}']"
                :endDate.sync="listQuery['trade_time-{<=}']"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="tableColumns.plat_swap_pair_id.name"
                v-model="listQuery.plat_swap_pair_id"
                :options="tableColumns.plat_swap_pair_id.options[listQuery.plat_id]"
                clearable
            />
        </div>
        <div class="group">
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    <!-- 查询 -->
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    <!-- 重置 -->
                    {{ LangUtil("重置") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatSwapOrdersProxy = this.getProxy(PlatSwapOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
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
