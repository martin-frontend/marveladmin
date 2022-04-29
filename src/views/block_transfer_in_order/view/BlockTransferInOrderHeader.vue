<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                v-model="listQuery.plat_id"
                :options="tableColumns.plat_id.options"
                clearable
            />
            <SearchInput :title="tableColumns['order_no'].name" v-model="listQuery.order_no" />
            <SearchInput :title="tableColumns['token_name'].name" v-model="listQuery.token_name" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
                clearable
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">查询</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">重置</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import BlockTransferInOrderProxy from "../proxy/BlockTransferInOrderProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components:{
        SearchInput,
        SearchSelect
    }
})
export default class BlockTransferInOrderHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: BlockTransferInOrderProxy = this.getProxy(BlockTransferInOrderProxy);
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

    // private handlerCreate() {
    //     this.myProxy.showDialog(DialogStatus.create);
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
