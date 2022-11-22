<template>
    <div class="header-content">
        <div class="group">
            <SearchInput :title="tableColumns.address.name" v-model="listQuery.address" />
            <SearchSelect
                :title="tableColumns.coin_name_unique.name"
                v-model="listQuery.coin_name_unique"
                :options="tableColumns.coin_name_unique.options"
                :clearable="true"
            />
            <SearchSelect
                :title="tableColumns.block_network_id.name"
                v-model="listQuery.block_network_id"
                :options="tableColumns.block_network_id.options"
                :clearable="true"
            />
            <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                    <!-- 查询 -->
                    {{ $t("common.search") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    <!-- 重置 -->
                    {{ $t("common.reset") }}
                </el-button>
            </div>
        </div>
        <div class="group">
            <div class="summary-text">
                <!-- 账号使用情况 -->
                {{ $t("user_detail.accountUsage") }}
                ：{{ summary.total_used }}/{{ summary.total_record_count }}
                {{ $t("user_detail.accountUSDTAmount") }}：{{ summary.amount }}
            </div>
            <el-button @click="handlerRefrush()" type="primary" icon="el-icon-refresh">
                <!-- 刷新 -->
                {{ $t("common.reset") }}
            </el-button>
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
        SearchSelect,
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
    private summary = this.myProxy.tableData.summary;
    private listQuery = this.myProxy.listQuery;

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    private handlerRefrush() {
        this.myProxy.onQuery();
    }

    // private handlerCreate() {
    //     this.myProxy.showDialog(DialogStatus.create);
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.summary-text {
    margin-top: 10px;
    margin-right: 10px;
}
</style>
