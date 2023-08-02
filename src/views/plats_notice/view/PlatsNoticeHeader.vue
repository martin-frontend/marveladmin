<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :clearable="false"
            :options="tableColumns.plat_id.options"
            @change="handlerSearch"
        />
        <div class="group">
            <SearchSelect
                :title="tableColumns.type_position.name"
                v-model="listQuery.type_position"
                :options="tableColumns.type_position.options"
            />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchInput :title="tableColumns.category.name" v-model="listQuery.category" />
            <div>
                <el-button @click="handlerSearch" type="primary" icon="el-icon-search">
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh">
                    {{ LangUtil("重置") }}
                </el-button>
            </div>
        </div>
        <el-button
            v-if="checkUnique(unique.plats_notice_store)"
            @click="handlerCreate"
            icon="el-icon-circle-plus-outline"
            type="primary"
            class="item"
        >
            {{ LangUtil("新增") }}
        </el-button>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatsNoticeProxy from "../proxy/PlatsNoticeProxy";
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
export default class PlatsNoticeHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
