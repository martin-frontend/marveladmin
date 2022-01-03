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
            <el-table-column
                :label="tableColumns['updated_at'].name"
                min-width="155px"
                prop="updated_at"
            ></el-table-column>
            <el-table-column prop="date" :label="$t('common.operating')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button  type="primary" @click="handlerBalance(row)" size="small">{{
                        $t("user_detail.vendorBalance")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
    </div>
</template>

<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabPlatVendorUserProxy = getProxy(TabPlatVendorUserProxy);
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    constructor() {
        super(TabPlatVendorUserMediator);
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.admin_plat_vendor_user_index();
    }

    private handlerBalance(row:any){
        this.myProxy.admin_plat_vendor_user_money(row);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
