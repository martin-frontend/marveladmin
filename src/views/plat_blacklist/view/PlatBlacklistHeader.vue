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
                LangUtil("查询")
            }}</el-button>
        </div>
        <div class="group">
            <el-button
                icon="el-icon-circle-plus-outline"
                class="header-button"
                type="primary"
                @click="handlerCreate()"
                v-if="checkUnique(unique.plat_blacklist_store)"
                >{{ LangUtil("新增") }}</el-button
            >
            <el-button
                icon="el-icon-remove-outline"
                class="header-button"
                type="danger"
                @click="handlerDeleteBatch()"
                v-if="checkUnique(unique.plats_blacklist_delete_batch)"
                >{{ LangUtil("批量移除") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatBlacklistProxy = this.getProxy(PlatBlacklistProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerDeleteBatch() {
        this.myProxy.onDeleteBatch();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
