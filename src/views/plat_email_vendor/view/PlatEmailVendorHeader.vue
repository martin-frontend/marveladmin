<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            :options="tableColumns.plat_id.options"
            v-model="listQuery.plat_id"
            :clearable="false"
            @change="handlerSearch"
        />
        <div class="group">
            <el-button
                v-if="true"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
                >{{ LangUtil("新增") }}</el-button
            >
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatEmailVendorProxy from "../proxy/PlatEmailVendorProxy";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatEmailVendorHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatEmailVendorProxy = this.getProxy(PlatEmailVendorProxy);
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
