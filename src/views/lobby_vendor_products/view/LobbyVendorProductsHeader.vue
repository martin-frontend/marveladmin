<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
        />
        <el-button @click="handlerSync()" class="header-button" type="primary" icon="el-icon-help">{{
            LangUtil("同步游戏")
        }}</el-button>
        <div class="group">
            <SearchInput
                :title="tableColumns.lobby_vendor_product_id.name"
                v-model="listQuery.lobby_vendor_product_id"
            />
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                v-model="listQuery.vendor_id"
                :options="tableColumns.vendor_id.options"
                clearable
            />
            <SearchInput :title="tableColumns.vendor_product_name.name" v-model="listQuery.vendor_product_name" />
            <SearchSelect
                :title="tableColumns.vendor_type.name"
                v-model="listQuery.vendor_type"
                :options="tableColumns.vendor_type.options"
                clearable
            />
            <SearchSelect
                :title="tableColumns.languages.name"
                v-model="listQuery.languages"
                :options="tableColumns.languages.options"
                clearable
            />
            <SearchSelect
                :title="tableColumns.vendor_languages.name"
                v-model="listQuery.vendor_languages"
                :options="tableColumns.vendor_languages.options"
                clearable
            />
            <SearchInput :title="tableColumns.ori_product_id.name" v-model="listQuery.ori_product_id" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
                clearable
            />
            <div>
                <el-button @click="handlerSearch()" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" class="header-button" type="primary" icon="el-icon-search">{{
                    LangUtil("重置")
                }}</el-button>
                <ExportDialog
                    :fiterOption="userList"
                    :proxy="myProxy"
                    :export_file_name="getExcelOutputName"
                    @exportExcel="exportExcel"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import LobbyVendorProductsProxy from "../proxy/LobbyVendorProductsProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import ExportDialog from "@/components/ExportDialog.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        ExportDialog,
    },
})
export default class VendorProductHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: LobbyVendorProductsProxy = this.getProxy(LobbyVendorProductsProxy);
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
    handlerSync() {
        this.myProxy.onSync();
    }

    get getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableColumns.plat_id.options[this.listQuery.plat_id];
        let name = `${LangUtil("大厅厂商产品")}-${plat_name}`;
        return name;
    }

    exportExcel(val: boolean, pageInfo: any) {
        this.myProxy.tableData.isExportExcel = val;
        if (val) {
            this.myProxy.onQuery_export(pageInfo);
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
