<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.address.name" v-model="listQuery.address" />
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
import BlockRechargeAddressProxy from "../proxy/BlockRechargeAddressProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        SearchInput,
    },
})
export default class BlockRechargeAddressHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: BlockRechargeAddressProxy = this.getProxy(BlockRechargeAddressProxy);
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
