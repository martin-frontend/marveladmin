<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                :clearable="false"
                @change="handlerSearch"
            />
            <div class="">
                <div class="btn">
                    <ExportDialog
                        :fiterOption="userList"
                        :proxy="myProxy"
                        :export_file_name="getExcelOutputName"
                        @exportExcel="exportExcel"
                        :_excludeKeys="excludeKeys"
                        :_convertKeys="convertKeys"
                    />
                </div>
            </div>
        </div>
        <div class="group">
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <SearchInput :title="tableColumns.activity_id.name" v-model="listQuery.activity_id" />
            <SearchSelect
                :title="tableColumns.settlement_type.name"
                v-model="listQuery.settlement_type"
                :options="tableColumns.settlement_type.options"
            />
            <SearchSelect
                :title="tableColumns.award_type.name"
                v-model="listQuery.award_type"
                :options="tableColumns.award_type.options"
            />
            <SearchDatePicker
                :title="tableColumns.settlement_time_at.name"
                :startDate.sync="listQuery['created_at-{>=}']"
                :endDate.sync="listQuery['created_at-{<=}']"
            />
            <SearchSelect
                :title="tableColumns.award_status.name"
                v-model="listQuery.award_status"
                :options="tableColumns.award_status.options"
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
import PlatActivityAwardProxy from "../proxy/PlatActivityAwardProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import ExportDialog from "@/components/ExportDialog.vue";
@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchDatePicker,
        ExportDialog,
    },
})
export default class PlatActivityAwardHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatActivityAwardProxy = this.getProxy(PlatActivityAwardProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    userList = this.myProxy._userList;
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }
    get getExcelOutputName() {
        let name: string = LangUtil("派奖查询") + "-" + this.tableColumns.plat_id.options[this.listQuery.plat_id];
        return `${name}-${this.listQuery["created_at-{>=}"]}～${this.listQuery["created_at-{<=}"]}`;
    }
    exportExcel(val: boolean, pageInfo: any) {
        this.myProxy.tableData.isExportExcel = val;
        if (val) {
            this.myProxy.onQuery_export(pageInfo);
        }
    }
    get excludeKeys() {
        return ["vendor_product_id"];
    }
    get convertKeys() {
        return ["plat_id", "settlement_type", "award_type", "award_status"];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
