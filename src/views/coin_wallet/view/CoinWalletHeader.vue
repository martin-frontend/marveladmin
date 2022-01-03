<template>
    <div class="search_style">
        <div class="item_group">
            <div class="cust_title">{{ tableColumns.plat_id.name }}</div>
            <el-select
                v-model="listQuery.plat_id"
                filterable
                class="select"
                :placeholder="$t('common.pleaseChoose')"
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
                    :placeholder="$t('common.pleaseEnter')"
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
                    :placeholder="$t('common.pleaseEnter')"
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
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" class="item" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CoinWalletProxy from "../proxy/CoinWalletProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components:{
        SearchSelect
    }
})
export default class CoinWalletHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;

    private onChangePlat(plat_id: string) {
        this.listQuery.plat_id = plat_id;
        this.myProxy.onQuery();
    }
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
