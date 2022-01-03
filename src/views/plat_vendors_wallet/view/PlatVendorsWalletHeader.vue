<template>
    <div class="header-content">
        <div class="group">
            <SearchSelect
                :title="tableColumns.plat_id.name"
                :options="tableColumns.plat_id.options"
                v-model="listQuery.plat_id"
                @change="handlerSearch"
                :clearable="false"
            />
        </div>
        <div class="group">
            <SearchSelect
                :title="tableColumns.vendor_id.name"
                :options="tableColumns.vendor_id.options"
                v-model="listQuery.vendor_id"
            />
            <div>
                <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <div class="public_wallet_info">
            <p>{{ platInfo.plat_name }}</p>
            <p>{{ $t("plat_vendors_wallet.publicWallet") }}</p>
            <p>{{ platInfo.gold }}</p>
        </div>
        <el-row>
            <el-button
                type="primary"
                class="wallet_btn"
                icon="el-icon-circle-plus-outline"
                @click="handlerCreate"
                v-if="checkUnique(unique.plat_vendors_wallet_store)"
                >{{ $t("plat_vendors_wallet.createVenderWallet") }}</el-button
            >
            <el-button
                type="primary"
                class="wallet_btn"
                @click="onPublicLog"
                v-if="checkUnique(unique.plat_wallet_log)"
                >{{ $t("plat_vendors_wallet.publicWalletLog") }}</el-button
            >
            <el-button type="primary" @click="publicWallet(1)" v-if="checkUnique(unique.plat_wallet_add_points)">{{
                $t("plat_vendors_wallet.publicWalletTop")
            }}</el-button>
            <el-button type="primary" @click="publicWallet(2)" v-if="checkUnique(unique.plat_wallet_minus_points)">{{
                $t("plat_vendors_wallet.publicWalletBottom")
            }}</el-button>
        </el-row>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    get platInfo() {
        return this.myProxy.tableData.platInfo;
    }

    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerReset() {
        this.myProxy.resetListQuery();
    }

    // 新增厂商钱包
    private handlerCreate() {
        this.myProxy.onCreateWallet();
    }

    // 公共钱包记录查询
    private onPublicLog() {
        this.myProxy.publicDialogData.isPublicCtrl = true;
        this.myProxy.onPublicLog();
    }

    //公共钱包上/下分
    private publicWallet(type: any) {
        this.myProxy.resetDialogForm();
        this.myProxy.publicDialogData.wallet.form.type = type;
        this.myProxy.publicDialogData.wallet.form.plat_id = this.listQuery.plat_id;
        this.myProxy.showPublicWalletDialog();
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
