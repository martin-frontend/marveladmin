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
                    {{ LangUtil("查询") }}
                </el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">
                    <!-- 重置 -->
                    {{ LangUtil("重置") }}
                </el-button>
            </div>
        </div>
        <div class="group">
            <div class="summary-text">
                <!-- 账号使用情况 -->
                {{ LangUtil("账号使用情况") }}
                ：{{ summary.total_used }}/{{ summary.total_record_count }} {{ LangUtil("账号USDT金额") }}：{{
                    summary.amount
                }}
            </div>
            <el-button @click="handlerRefrush()" type="primary" icon="el-icon-refresh">
                <!-- 刷新 -->
                {{ LangUtil("重置") }}
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: BlockRechargeAddressProxy = this.getProxy(BlockRechargeAddressProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    summary = this.myProxy.tableData.summary;
    listQuery = this.myProxy.listQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerRefrush() {
        this.myProxy.onQuery();
    }

    //  handlerCreate() {
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
