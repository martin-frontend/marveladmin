<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns['vendor_id'].name" prop="type">
                <template slot-scope="{ row }">
                    <span>{{ tableColumns["vendor_id"].options[row.vendor_id] }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['user_status'].name" prop="user_status">
                <template slot-scope="{ row }">
                    <span>{{ tableColumns["user_status"].options[row.user_status] }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['coin_name_unique'].name" prop="coin_name_unique"></el-table-column>
            <el-table-column
                :label="tableColumns['updated_at'].name"
                min-width="155px"
                prop="updated_at"
            ></el-table-column>
            <el-table-column prop="date" :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button type="primary" @click="handlerBalance(row)" size="small">{{
                        LangUtil("厂商余额")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabPlatVendorUserMediator from "../mediator/TabPlatVendorUserMediator";
import TabPlatVendorUserProxy from "../proxy/TabPlatVendorUserProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class TabPlatVendorUser extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabPlatVendorUserProxy = getProxy(TabPlatVendorUserProxy);
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    constructor() {
        super(TabPlatVendorUserMediator);
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.admin_plat_vendor_user_index();
    }

    handlerBalance(row: any) {
        this.myProxy.admin_plat_vendor_user_money(row);
        this.myProxy.coin_name_unique = row.coin_name_unique;
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
