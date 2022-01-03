<template>
    <div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.currency_type.name"
                v-model="listQuery.currency_type"
                :options="tableColumns.currency_type.options"
                :clearable="false"
                @change="handlerSearch"
            />
        </div>
        <div class="row">
            <el-button v-if="checkUnique(unique.vendor_store)" class="item" type="primary" icon="el-icon-circle-plus-outline" @click="handlerCreate">{{
                $t("common.create")
            }}</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import VendorProxy from "../proxy/VendorProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class VendorHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: VendorProxy = this.getProxy(VendorProxy);
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerTest() {
        this.myProxy.testDialogData.bShow = true;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
