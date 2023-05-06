<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="
                    changePlat();
                    handlerSearch();
                "
                :clearable="false"
            />
        </div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                :options="tableColumns.vendor_id_options"
                v-model="listQuery.vendor_id"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    LangUtil("查询")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    LangUtil("重置")
                }}</el-button>
            </div>
        </div>
        <div class="public_wallet_info">
            <p>{{ platInfo.plat_name }}</p>
            <p>{{ LangUtil("公共钱包") }}</p>
            <p>{{ platInfo.gold }}</p>
        </div>
        <el-row>
            <el-button
                type="primary"
                class="wallet_btn"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
                v-if="checkUnique(unique.plat_vendors_wallet_store)"
                >{{ LangUtil("新增厂商钱包") }}</el-button
            >
            <el-button
                type="primary"
                class="wallet_btn"
                @click="onPublicLog"
                v-if="checkUnique(unique.plat_wallet_log)"
                >{{ LangUtil("公共钱包记录查询") }}</el-button
            >
            <el-button type="primary" @click="publicWallet(1)" v-if="checkUnique(unique.plat_wallet_add_points)">{{
                LangUtil("公共钱包上分")
            }}</el-button>
            <el-button type="primary" @click="publicWallet(2)" v-if="checkUnique(unique.plat_wallet_minus_points)">{{
                LangUtil("公共钱包下分")
            }}</el-button>
        </el-row>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatVendorsWalletProxy from "../proxy/PlatVendorsWalletProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";

@Component({
    components: {
        SearchSelect,
    },
})
export default class PlatVendorsWalletHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    listQuery = this.myProxy.listQuery;
    get platInfo() {
        return this.myProxy.tableData.platInfo;
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    // 新增厂商钱包
    handlerCreate() {
        this.myProxy.onCreateWallet();
    }

    // 公共钱包记录查询
    onPublicLog() {
        this.myProxy.publicDialogData.isPublicCtrl = true;
        this.myProxy.onPublicLog();
    }

    //公共钱包上/下分
    publicWallet(type: any) {
        this.myProxy.resetDialogForm();
        this.myProxy.publicDialogData.wallet.form.type = type;
        this.myProxy.publicDialogData.wallet.form.plat_id = this.listQuery.plat_id;
        this.myProxy.showPublicWalletDialog();
    }

    //更换平台切换对应厂商
    changePlat() {
        //@ts-ignore
        this.tableColumns.vendor_id_options = this.tableColumns.vendor_id.options[this.listQuery.plat_id];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.header-content {
    position: relative;
    .public_wallet_info {
        position: absolute;
        top: 0;
        right: 0;
        text-align: right;
        p {
            margin: 6px;
            font-size: 14px;
            &:nth-child(2) {
                font-size: 20px;
            }
            &:nth-child(3) {
                font-size: 36px;
                color: green;
            }
        }
    }
}
</style>
