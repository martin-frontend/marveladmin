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
                <el-button
                    class="header-button"
                    @click="exportExcel"
                    type="primary"
                    icon="el-icon-download"
                    :disabled="list.length == 0"
                >
                    {{ LangUtil("导出") }}
                </el-button>
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
                :title="tableColumns.paytime.name"
                :startDate.sync="listQuery['paytime-{>}']"
                :endDate.sync="listQuery['paytime-{<}']"
                :showTime="true"
            />
            <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchSelect
                :title="tableColumns.paymethod_id.name"
                v-model="listQuery.paymethod_id"
                :options="tableColumns.paymethod_id.options"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns.order_no.name" v-model="listQuery.order_no" />
            <SearchInput :title="tableColumns.third_order_no.name" v-model="listQuery.third_order_no" :width="300" />
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                v-model="listQuery.vendor_id"
                :options="tableColumns.vendor_id.options"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options[listQuery.plat_id]"
            />
            <SearchSelect
                :title="tableColumns.block_network_id.name"
                v-model="listQuery.block_network_id"
                :options="tableColumns.block_network_id.options"
            />
            <SearchRange
                :title="tableColumns.gold.name"
                min="0"
                max="9999999"
                :maxValue.sync="listQuery['gold-{<=}']"
                :minValue.sync="listQuery['gold-{>=}']"
                :placeholders="[LangUtil('最小金额'), LangUtil('最大金额')]"
            >
            </SearchRange>
            <SearchSelect
                :title="tableColumns.is_first_recharge.name"
                v-model="listQuery.is_first_recharge"
                :options="tableColumns.is_first_recharge.options"
            />
            <SearchInput :title="tableColumns.invite_user_id.name" v-model="listQuery.invite_user_id" />
            <SearchInput :title="tableColumns.grant_agent_id.name" v-model="listQuery.grant_agent_id" />
            <SearchInput :title="tableColumns.user_remark.name" v-model="listQuery.user_remark" />
            <div>
                <SearchSelect
                    :title="tableColumns.user_tag.name"
                    v-model="listQuery.user_tag"
                    :options="tableColumns.user_tag.options[listQuery.plat_id]"
                    :multiple="true"
                    width="600"
                />
            </div>
            <div>
                <el-button @click="handlerSearch" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh">{{
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
import RechargeOrdersProxy from "../proxy/RechargeOrdersProxy";
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
export default class RechargeOrdersHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: RechargeOrdersProxy = this.getProxy(RechargeOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.space_between {
    justify-content: space-between;
}
</style>
