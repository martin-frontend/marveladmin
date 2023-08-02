<template>
    <div class="header-content">
        <div class="group space_between">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="
                    changePlat();
                    handlerSearch();
                "
                :clearable="false"
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
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                :options="tableColumns.coin_name_unique_options"
                v-model="listQuery.coin_name_unique"
            />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" :width="340" />
            <SearchInput :title="tableColumns.created_by.name" v-model="listQuery.created_by" />
            <div>
                <el-button @click="handlerSearch()" class="item" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" class="item" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
        <div class="statistics">{{ LangUtil("查询汇总") }}</div>
        <div class="statistics" v-for="(value, key) in myProxy.tableData.total_coin_sum" :key="key">
            {{ key }}
            <span>{{ LangUtil("充值总金额") }}:{{ value.total_gold }}</span>
            <span>{{ LangUtil("充值订单数") }}:{{ value.total_num }}</span>
            <span>{{ LangUtil("充值成功金额") }}:{{ value.success_total_gold }}</span>
            <span>{{ LangUtil("充值成功订单数") }}:{{ value.success_total_num }}</span>
            <span>{{ LangUtil("充值人数") }}:{{ value.total_user_num }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VipReplenishRechargeOrderProxy from "../proxy/VipReplenishRechargeOrderProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
    },
})
export default class VipReplenishRechargeOrderHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: VipReplenishRechargeOrderProxy = this.getProxy(VipReplenishRechargeOrderProxy);
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

    exportExcel() {
        this.myProxy.onQueryAll();
    }

    //更换平台切换对应渠道
    changePlat() {
        this.listQuery.coin_name_unique = "";
        this.tableColumns.coin_name_unique_options = this.tableColumns.coin_name_unique.options[this.listQuery.plat_id];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.space_between {
    justify-content: space-between;
}
.statistics {
    margin-bottom: 16px;
    span {
        margin-left: 20px;
        :nth-child(1) {
            margin-left: 0;
        }
    }
}
</style>
