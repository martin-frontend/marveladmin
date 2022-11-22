<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.name.name" v-model="listQuery.name" />
            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
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
        <div class="group">
            <el-button
                v-if="checkUnique(unique.system_resource_store)"
                @click="handlerCreate()"
                type="primary"
                icon="el-icon-circle-plus-outline"
                >{{ LangUtil("新增") }}</el-button
            >
            <el-button
                v-if="hasDeleteItems && checkUnique(unique.system_resource_delete)"
                @click="handlerBatchDelete()"
                type="primary"
                icon="el-icon-delete"
                >{{ LangUtil("批量删除") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import SystemResourceProxy from "../proxy/SystemResourceProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import { BatchStatus } from "../proxy/ISystemResourceProxy";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class SystemResourceHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    get hasDeleteItems() {
        return this.myProxy.imgBatchDialogData.deleteItems.length > 0;
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

    confirmObj: any = {
        str1: this.LangUtil("是否删除该资源?"),
        prompt: this.LangUtil("提示"),
        determine: this.LangUtil("确定"),
        cancel: this.LangUtil("取消"),
    };

    /**批量删除 */
    handlerBatchDelete() {
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
