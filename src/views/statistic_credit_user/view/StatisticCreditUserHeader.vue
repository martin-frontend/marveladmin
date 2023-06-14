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
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.username.name" v-model="listQuery.username" />
            <SearchInput :title="tableColumns.invite_user_id.name" v-model="listQuery.invite_user_id" />
            <SearchInput :title="tableColumns.invite_username.name" v-model="listQuery.invite_username" />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                :options="tableColumns.coin_name_unique_option"
                v-model="listQuery.coin_name_unique"
            />
            <SearchDatePicker
                :title="LangUtil('结算时间')"
                :startDate.sync="listQuery.settlement_date_start"
                :endDate.sync="listQuery.settlement_date_end"
                :tip="LangUtil('（北京时间）')"
                :pickerOptions="myProxy.pickerOptions"
                :showTime="true"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
                <el-button @click="exportExcel" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import StatisticCreditUserProxy from "../proxy/StatisticCreditUserProxy";
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
export default class StatisticCreditUserHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: StatisticCreditUserProxy = this.getProxy(StatisticCreditUserProxy);
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

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    //更换平台切换对应渠道
    changePlat() {
        this.listQuery.coin_name_unique = "";
        this.tableColumns.coin_name_unique_option = this.tableColumns.coin_name_unique.options[this.listQuery.plat_id];
    }

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
