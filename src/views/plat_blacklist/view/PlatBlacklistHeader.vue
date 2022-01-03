<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                @change="handlerSearch"
                :clearable="false"
            />
        </div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.black_type.name"
                v-model="listQuery.black_type"
                :options="tableColumns.black_type.options"
                @change="handlerSearch"
            />
            <SearchInput :title="tableColumns.black_content.name" v-model="listQuery.black_content" />
            <el-button class="header-button" icon="el-icon-search" @click="handlerSearch()" type="primary">{{
                $t("common.search")
            }}</el-button>
        </div>
        <div class="group">
            <el-button
                icon="el-icon-circle-plus-outline"
                class="header-button"
                type="primary"
                @click="handlerCreate()"
                v-if="checkUnique(unique.plat_blacklist_store)"
                >{{ $t("common.create") }}</el-button
            >
            <el-button
                icon="el-icon-remove-outline"
                class="header-button"
                type="danger"
                @click="handlerDeleteBatch()"
                v-if="checkUnique(unique.plats_blacklist_delete_batch)"
                >{{ $t("plat_blacklist.batchRemove") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatBlacklistProxy from "../proxy/PlatBlacklistProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
    },
})
export default class PlatBlacklistHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatBlacklistProxy = this.getProxy(PlatBlacklistProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerDeleteBatch() {
        this.myProxy.onDeleteBatch();
    }

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
