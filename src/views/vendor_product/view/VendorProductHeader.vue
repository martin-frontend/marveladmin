<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.currency_type.name"
                v-model="listQuery.currency_type"
                :options="tableColumns.currency_type.options"
                clearable
                @change="onGetVendorId"
            />
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                v-model="listQuery.vendor_id"
                :options="vendorIdOptions"
                clearable
            />
            <SearchInput :title="tableColumns.vendor_product_name.name" v-model="listQuery.vendor_product_name" />
            <SearchInput :title="tableColumns.ori_product_id.name" v-model="listQuery.ori_product_id" />
            <SearchSelect
                :title="tableColumns.vendor_type.name"
                v-model="listQuery.vendor_type"
                :options="tableColumns.vendor_type.options"
                clearable
            />
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
                <input
                    v-show="false"
                    ref="excel-upload-input"
                    class="excel-upload-input"
                    type="file"
                    accept=".xlsx, .xls"
                    @change="handleClick"
                />
                <el-button type="primary" @click="onImportUser">
                    {{ LangUtil("导入") }}
                </el-button>
                <el-button @click="exportExcel" type="primary" icon="el-icon-download" :disabled="list.length == 0">
                    {{ LangUtil("导出") }}
                </el-button>
            </div>
        </div>
        <div class="group">
            <el-button
                v-if="checkUnique(unique.vendor_product_store)"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
            >
                {{ LangUtil("新增") }}
            </el-button>
            <el-button
                v-if="hasSelectedItems && checkUnique(unique.vendor_product_delete)"
                class="item"
                @click="handleBatchDelete()"
                type="primary"
                icon="el-icon-delete"
                >{{ LangUtil("批量删除") }}</el-button
            >
            <el-button
                v-if="hasSelectedItems"
                class="item"
                @click="handleBatchDownload()"
                type="primary"
                icon="el-icon-download"
                >{{ LangUtil("批量下载") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VendorProductProxy from "../proxy/VendorProductProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import { readerData } from "@/core/global/Excel";
import { removeRepeatStr } from "@/core/global/Functions";
import { BaseInfo } from "@/components/vo/commonVo";
import { BatchStatus } from "../proxy/IVendorProductProxy";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class VendorProductHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    list = this.myProxy.tableData.list;

    get vendorIdOptions() {
        return this.myProxy.vendorIdOptions;
    }

    get hasSelectedItems() {
        return this.myProxy.imgBatchDialogData.selectedItems.length > 0;
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

    onGetVendorId() {
        this.myProxy.getVendorId();
    }

    // 汇入用户excel
    onImportUser() {
        (this.$refs["excel-upload-input"] as any).click();
    }

    // excel 导入
    async handleClick(e: any) {
        const files = e.target.files;
        const rawFile = files[0];
        if (!rawFile) return;
        (this.$refs["excel-upload-input"] as any).value = null;
        const excel: any = await readerData(rawFile);
        this.myProxy.languageImport(excel.results);
    }

    exportExcel() {
        this.myProxy.showFieldSelectionDialog();
    }

    confirmObj: any = {
        str1: this.LangUtil("是否删除勾选内容?"),
        str2: this.LangUtil("是否下载当前查询产品图标?"),
        prompt: this.LangUtil("提示"),
        determine: this.LangUtil("确定"),
        cancel: this.LangUtil("取消"),
    };

    /**批量删除 */
    handleBatchDelete() {
        this.$confirm(this.confirmObj.str1, this.confirmObj.prompt, {
            confirmButtonText: this.confirmObj.determine,
            cancelButtonText: this.confirmObj.cancel,
            type: "warning",
        })
            .then(() => {
                this.myProxy.showBatchDialog(BatchStatus.BatchDelete);
            })
            .catch(() => {});
    }

    /**批量下载 */
    handleBatchDownload() {
        this.$confirm(this.confirmObj.str2, this.confirmObj.prompt, {
            confirmButtonText: this.confirmObj.determine,
            cancelButtonText: this.confirmObj.cancel,
            type: "warning",
        })
            .then(() => {
                this.myProxy.showBatchDialog(BatchStatus.Download);
            })
            .catch(() => {});
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
