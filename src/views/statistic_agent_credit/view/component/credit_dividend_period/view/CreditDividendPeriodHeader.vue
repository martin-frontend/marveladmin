<template>
    <div class="header-content">
        <SearchSelect
            :options="statisticTableColumns.plat_id.options"
            v-model="listQuery.plat_id"
            :title="statisticTableColumns.plat_id.name"
            :clearable="false"
            :disabled="true"
        />
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('选择时间')"
                :startDate.sync="listQuery['start_time-{>=}']"
                :endDate.sync="listQuery['end_time-{<=}']"
                :showTime="true"
                :pickerOptions="myProxy.pickerOptions"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="handlerCreate()" type="primary" icon="el-icon-circle-plus-outline">{{
                    LangUtil("新增")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CreditDividendPeriodProxy from "../proxy/CreditDividendPeriodProxy";
import StatisticAgentCreditProxy from "@/views/statistic_agent_credit/proxy/StatisticAgentCreditProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchDatePicker,
        SearchSelect,
    },
})
export default class CreditDividendPeriodHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CreditDividendPeriodProxy = this.getProxy(CreditDividendPeriodProxy);
    private statisticProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private statisticTableColumns = this.statisticProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

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
</style>
