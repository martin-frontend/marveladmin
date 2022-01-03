<template>
    <div class="header-content">
        <SearchSelect
            :title="tableColumns.plat_id.name"
            v-model="listQuery.plat_id"
            :options="tableColumns.plat_id.options"
            :clearable="false"
            @change="handlerSearch"
        />
        <div class="group">
            <SearchInput :title="tableColumns.receive_name.name" v-model="listQuery.receive_name" />
            <SearchSelect
                :title="tableColumns.status.name"
                v-model="listQuery.status"
                :options="tableColumns.status.options"
            />
            <SearchInput :title="tableColumns.coin_wallet_ids.name" v-model="listQuery.coin_wallet_ids" />
            <div>
                <el-button @click="handlerSearch" class="item" type="primary" icon="el-icon-search">{{
                    $t("common.search")
                }}</el-button>
                <el-button @click="handlerReset" class="item" type="primary" icon="el-icon-refresh">{{
                    $t("common.reset")
                }}</el-button>
            </div>
        </div>
        <!-- tabs -->
        <div>
            <el-tabs v-model="tabsName" @tab-click="typeChange">
                <el-tab-pane :label="$t('coin_receive_payment_channel.tabsText1')" name="1"></el-tab-pane>
                <el-tab-pane :label="$t('coin_receive_payment_channel.tabsText2')" name="2"></el-tab-pane>
                <el-tab-pane :label="$t('coin_receive_payment_channel.tabsText3')" name="3"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="add_btn">
            <el-button
                @click="handlerCreate()"
                class="item"
                type="primary"
                icon="el-icon-circle-plus-outline"
                v-if="checkUnique(unique.coin_receive_payment_channel_store)"
                >{{ $t("common.create") }}</el-button
            >
            <el-button @click="handlerReload()" class="item" icon="el-icon-refresh" type="primary">{{
                $t("coin_receive_payment_channel.refresh")
            }}</el-button>
        </div>
        <!-- table -->
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CoinReceivePaymentChannelProxy from "../proxy/CoinReceivePaymentChannelProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";

@Component({
    components: {
        SearchInput,
        SearchSelect,
    },
})
export default class CoinReceivePaymentChannelHeader extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: CoinReceivePaymentChannelProxy = this.getProxy(CoinReceivePaymentChannelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
    private tabsName = this.myProxy.tabsName;

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

    private handlerReload() {
        this.myProxy.onQuery();
    }

    private typeChange({ name }: any) {
        this.myProxy.onTypeChange(name);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
