<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="LangUtil('平台')"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                :clearable="false"
                @change="
                    changePlat();
                    handlerSearch();
                "
            />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_date.name"
                :startDate.sync="listQuery['created_date-{>=}']"
                :endDate.sync="listQuery['created_date-{<=}']"
                :showTime="true"
            />
            <SearchInput :title="tableColumns.directly_user_id.name" v-model="listQuery.directly_user_id" />
            <SearchInput :title="tableColumns.team_user_id.name" v-model="listQuery.team_user_id" />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="LangUtil('币种')"
                :options="tableColumns.coin_name_unique_option"
                v-model="listQuery.coin_name_unique"
                :clearable="false"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticPlatFundsFlowProxy from "../proxy/StatisticPlatFundsFlowProxy";
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
export default class StatisticPlatFundsFlowHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticPlatFundsFlowProxy = this.getProxy(StatisticPlatFundsFlowProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    //更换平台切换对应渠道
    changePlat() {
        //@ts-ignore
        this.tableColumns.coin_name_unique_option = this.tableColumns.coin_name_unique.options[this.listQuery.plat_id];
        //设定选取币种第一个
        const coin_name_unique_options_keys = Object.keys(this.tableColumns.coin_name_unique_option);
        this.listQuery.coin_name_unique = coin_name_unique_options_keys[0];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
