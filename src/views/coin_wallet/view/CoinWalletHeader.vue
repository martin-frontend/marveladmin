<template>
    <div class="search_style">
        <div class="item_group">
            <div class="cust_title">{{ tableColumns.plat_id.name }}</div>
            <el-select
                v-model="listQuery.plat_id"
                filterable
                class="select"
                :placeholder="LangUtil('请选择')"
                @change="onChangePlat"
            >
                <el-option
                    v-for="(value, key) in tableColumns.plat_id.options"
                    :key="key"
                    :label="value"
                    :value="key"
                ></el-option>
            </el-select>
        </div>

        <div class="search_space">
            <div class="item_group">
                <div class="cust_title">{{ tableColumns.admin_user_id.name }}</div>
                <el-input
                    v-model="listQuery.admin_user_id"
                    filterable
                    class="select"
                    clearable
                    :placeholder="LangUtil('请输入')"
                >
                </el-input>
            </div>
            <div class="item_group">
                <div class="cust_title">{{ tableColumns.admin_username.name }}</div>
                <el-input
                    v-model="listQuery.admin_username"
                    filterable
                    class="select"
                    clearable
                    :placeholder="LangUtil('请输入')"
                >
                </el-input>
            </div>
            <SearchSelect
                :title="tableColumns.type.name"
                v-model="listQuery.type"
                :options="tableColumns.type.options"
            />
            <div class="item_group">
                <el-button @click="handlerSearch()" class="item" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" class="item" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CoinWalletProxy from "../proxy/CoinWalletProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class CoinWalletHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;

    onChangePlat(plat_id: string) {
        this.listQuery.plat_id = plat_id;
        this.myProxy.onQuery();
    }
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerCreate() {
        this.myProxy.showDialog(DialogStatus.create);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
