<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="
                    changePlat();
                    handlerSearch();
                "
                :clearable="false"
            />
            <SearchDatePicker
                :title="LangUtil('结算时间')"
                :startDate.sync="listQuery.settlement_date_start"
                :endDate.sync="listQuery.settlement_date_end"
                :tip="LangUtil('（北京时间）')"
                :pickerOptions="myProxy.pickerOptions"
            />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                :options="tableColumns.coin_name_unique_option"
                v-model="listQuery.coin_name_unique"
            />
            <SearchInput :title="tableColumns.bind_depth.name" v-model="listQuery.bind_depth" />
        </div>
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.binded_at.name"
                :startDate.sync="listQuery.binded_start"
                :endDate.sync="listQuery.binded_end"
                :showTime="true"
            />
            <SearchSelect
                :title="tableColumns.channel_id.name"
                :options="tableColumns.channel_id_options"
                v-model="listQuery.channel_id"
            />
            <SearchInput :title="tableColumns.nick_name.name" v-model="listQuery.nick_name" />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.invite_user_id.name" v-model="listQuery.invite_user_id" />
            <SearchRange
                :title="tableColumns.promotion_floor.name"
                :minValue.sync="listQuery['min_promotion_floor']"
                :maxValue.sync="listQuery['max_promotion_floor']"
                :placeholders="[LangUtil('最小金额'), LangUtil('最大金额')]"
            />
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns.agent_user_id.name" v-model="listQuery.agent_user_id" />
            <SearchInput :title="tableColumns.user_remark.name" v-model="listQuery.user_remark" />
            <SearchInput :title="tableColumns.remark.name" v-model="listQuery.remark" />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
                <el-button @click="exportExcel" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatAgentManageBindProxy from "../proxy/PlatAgentManageBindProxy";
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
        SearchRange,
    },
})
export default class PlatAgentManageBindHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatAgentManageBindProxy = this.getProxy(PlatAgentManageBindProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    //更换平台切换对应渠道
    changePlat() {
        this.listQuery.channel_id = "";
        this.tableColumns.channel_id_options = this.tableColumns.channel_id.options[this.listQuery.plat_id];
        const channel_id_keys = Object.keys(this.tableColumns.channel_id_options);
        channel_id_keys.forEach((key: any) => {
            this.tableColumns.channel_id_options[key] = key;
        });
        this.tableColumns.coin_name_unique_option = this.tableColumns.coin_name_unique.options[this.listQuery.plat_id];
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
</style>
