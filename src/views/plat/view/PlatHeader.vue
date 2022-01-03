<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns['plat_id'].name" v-model="listQuery.plat_id" />
            <SearchInput :title="tableColumns['plat_name'].name" v-model="listQuery.plat_name" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
                clearable
            />
            <div>
                <el-button @click="handlerSearch" class="header-button" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="header-button">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="group">
            <el-button
                v-if="checkUnique(unique.plat_store)"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
            >
                {{ $t("common.create") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatProxy from "../proxy/PlatProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        SearchRange,
    },
})
export default class PlatHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatProxy = this.getProxy(PlatProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
