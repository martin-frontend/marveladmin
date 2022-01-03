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
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <el-button
                v-if="checkUnique(unique.system_resource_store)"
                @click="handlerCreate()"
                type="primary"
                icon="el-icon-circle-plus-outline"
                >{{ $t("common.create") }}</el-button
            >
            <el-button
                v-if="hasDeleteItems && checkUnique(unique.system_resource_delete)"
                @click="handlerBatchDelete()"
                type="primary"
                icon="el-icon-delete"
                >{{ $t("system_resource.batchDelete") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    get hasDeleteItems() {
        return this.myProxy.imgBatchDialogData.deleteItems.length > 0;
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    private confirmObj: any = {
        str1: this.$t("system_resource.deleteConfirm"),
        prompt: this.$t("common.prompt"),
        determine: this.$t("common.determine"),
        cancel: this.$t("common.cancel"),
    };

    /**批量删除 */
    private handlerBatchDelete() {
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
