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
            <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
            <SearchDatePicker
                :title="tableColumns['bet_at'].name"
                :startDate.sync="listQuery['bet_at-{>=}']"
                :endDate.sync="listQuery['bet_at-{<=}']"
                :showTime="true"
                :tip="LangUtil('（北京时间）')"
            />
            <SearchDatePicker
                :title="tableColumns['settlement_at'].name"
                :startDate.sync="listQuery['settlement_at-{>=}']"
                :endDate.sync="listQuery['settlement_at-{<=}']"
                :showTime="true"
                :tip="LangUtil('（北京时间）')"
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
            <SearchInput :title="tableColumns.agent_user_id.name" v-model="listQuery.agent_user_id" />
            <SearchInput :title="tableColumns.vendor_order_no.name" v-model="listQuery.vendor_order_no" />
            <SearchInput :title="tableColumns.vendor_product_name.name" v-model="listQuery.vendor_product_name" />
            <SearchInput :title="tableColumns.ori_product_id.name" v-model="listQuery.ori_product_id" />
            <SearchSelect
                :title="tableColumns.settlement_status.name"
                v-model="listQuery.settlement_status"
                :options="tableColumns.settlement_status.options"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
            />
            <SearchSelect
                :title="tableColumns.is_credit_user.name"
                v-model="listQuery.is_credit_user"
                :options="tableColumns.is_credit_user.options"
            />
            <SearchSelect
                :title="tableColumns.resettlement_status.name"
                v-model="listQuery.resettlement_status"
                :options="tableColumns.resettlement_status.options"
            />
            <SearchRange
                :title="tableColumns.win_gold.name"
                min="-9999999"
                max="9999999"
                :minValue.sync="listQuery['win_gold-{>=}']"
                :maxValue.sync="listQuery['win_gold-{<}']"
                :placeholders="[LangUtil('最小金额'), LangUtil('最大金额')]"
            >
                <el-radio-group v-model="winLoss" @change="onWinLossChange">
                    <el-radio :label="0">{{ LangUtil("输") }}</el-radio>
                    <el-radio :label="1">{{ LangUtil("赢") }}</el-radio>
                </el-radio-group>
            </SearchRange>
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchSelect
                :title="tableColumns.sports_type.name"
                v-model="listQuery.sports_type"
                :options="tableColumns.sports_type.options"
            />
            <div>
                <el-button
                    @click="handlerSearch()"
                    type="primary"
                    icon="el-icon-search"
                    :disabled="!myProxy.exportData.isSearch"
                >
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="exportExcel()" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
                <el-button @click="heandlerStatistic()" type="primary">{{ LangUtil("统计") }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

    winLoss: string = "";
    onWinLossChange(value: any) {
        this.listQuery["win_gold-{>=}"] = value ? 0 : "";
        this.listQuery["win_gold-{<}"] = value ? "" : 0;
    }

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    heandlerStatistic() {
        this.myProxy.admin_plat_users_bet_vendors();
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
