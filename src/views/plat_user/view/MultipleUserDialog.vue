<template>
    <div class="content plat_user">
        <el-dialog width="1200px" :title="LangUtil('批量新增用户')" :visible.sync="myProxy.mutipleUserDialogData.bShow">
            <div class="header-content">
                <SearchSelect
                    :title="tableColumns.plat_id.name"
                    v-model="listQuery.plat_id"
                    :options="tableColumns.plat_id.options"
                    @change="handlerSearch"
                    :clearable="false"
                    style="width: 350px"
                />
                <div class="group">
                    <!-- <SearchSelect
                        :title="tableColumns.channel_id.name"
                        :options="tableColumns.channel_id.options[listQuery.plat_id]"
                        v-model="listQuery.channel_id"
                    /> -->
                    <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />

                    <SearchSelect
                        :title="tableColumns.status.name"
                        v-model="listQuery.status"
                        :options="tableColumns.status.options"
                    />
                    <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
                    <SearchInput
                        :title="tableColumns.remark.name"
                        v-model="listQuery.remark"
                        :tip="tableColumns.remark.tips"
                    />
                    <SearchInput :title="tableColumns.admin_added_batch.name" v-model="listQuery.admin_added_batch" />
                    <SearchDatePicker
                        :title="tableColumns.created_at.name"
                        :startDate.sync="listQuery['created_at-{>=}']"
                        :endDate.sync="listQuery['created_at-{<}']"
                        :showTime="true"
                    />
                </div>

                <div class="group">
                    <el-button class="header-button" @click="handlerSearch()" type="primary">{{
                        LangUtil("查询")
                    }}</el-button>
                    <el-button class="header-button" @click="handlerReset()" type="primary">{{
                        LangUtil("重置")
                    }}</el-button>
                    <!-- <el-button
                        class="header-button"
                        @click="handlerExport()"
                        type="primary"
                        icon="el-icon-download"
                        :disabled="list.length == 0"
                    >
                        {{ LangUtil("导出") }}
                    </el-button> -->
                    <ExportDialog
                        :fiterOption="userList"
                        :proxy="myProxy"
                        :export_file_name="getExcelOutputName"
                        @exportExcel="exportExcel"
                        :_excludeKeys="excludeKeys"
                        :_convertKeys="convertKeys"
                    />
                    <el-button
                        v-if="checkUnique(unique.plat_user_store_user_by_admin)"
                        class="header-button"
                        @click="handlerCreate()"
                        type="primary"
                        style="margin-left: 10px;"
                        >{{ LangUtil("新增") }}</el-button
                    >
                </div>
            </div>
            <MultipleUserBody></MultipleUserBody>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import MultipleUserBody from "./MultipleUserBody.vue";
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import PlatUserProxy from "../proxy/PlatUserProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import ExportDialog from "@/components/ExportDialog.vue";
import { dateFormat } from "@/core/global/Functions";
@Component({
    components: {
        MultipleUserBody,
        SearchSelect,
        SearchInput,
        SearchRange,
        SearchDatePicker,
        ExportDialog,
    },
})
export default class PlatUserAddMultipleUserDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery_mutiple;
    list = this.myProxy.tableData.list;

    userList = this.myProxy._userList;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQueryForAddMultipleUserTable();
    }

    handlerReset() {
        this.myProxy.resetListQuery_mutiple();
    }

    handlerCreate() {
        // console.log("handlerCreate mike");
        // this.myProxy.showAddMultipleUserDialog(DialogStatus.create);
        this.myProxy.showAddMultipleUserDialog(DialogStatus.create);
    }

    // handlerExport() {
    //     this.myProxy.showFieldSelectionDialog();
    // }
    get getExcelOutputName() {
        let name: string = LangUtil("批量新增") + "-" + this.tableColumns.plat_id.options[this.listQuery.plat_id];

        return `${name}-${dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss")}`;
    }
    exportExcel(val: boolean, pageInfo: any) {
        this.myProxy.addMutipleUserData.isExportExcel = val;
        if (val) {
            this.myProxy.onQueryForAddMultipleUserTable_export(pageInfo);
        }
    }
    get excludeKeys() {
        return ["vendor_product_id"];
    }
    get convertKeys() {
        return ["plat_id", "status"];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
