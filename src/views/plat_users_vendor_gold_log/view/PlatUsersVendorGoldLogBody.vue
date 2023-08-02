<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" width="130px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["plat_id"].options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="vendor_id" :label="tableColumns['vendor_id'].name" width="130px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["vendor_id"].options[row.vendor_id] }}
                    </div>
                </template>
            </el-table-column>
            <!-- 
            <el-table-column prop="vendor_order_no" :label="tableColumns['vendor_order_no'].name" width="150px" align="center">

            </el-table-column>
            <el-table-column prop="order_no" :label="tableColumns['order_no'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="order_at" :label="tableColumns['order_at'].name" width="150px" align="center">
            </el-table-column> -->

            <el-table-column :label="LangUtil('订单')" width="300px" align="left">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["order_at"].name }}:{{ row.order_at }}</p>
                    <p>{{ tableColumns["vendor_order_no"].name }}:{{ row.vendor_order_no }}</p>
                    <p>{{ tableColumns["order_no"].name }}:{{ row.order_no }}</p>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('用户信息')" min-width="150px" align="center">
                <template slot-scope="{ row }">
                    <div
                        @click="showUserDetail(row.user_id)"
                        style="cursor: pointer; text-decoration: underline"
                        align="left"
                    >
                        {{ tableColumns["user_id"].name }}：{{ row.user_id }}
                    </div>
                    <div align="left">{{ tableColumns["nick_name"].name }}：{{ row.nick_name }}</div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['coin_name_unique'].name" min-width="240px" align="center">
                <template slot-scope="{ row }">
                    <div align="left">{{ tableColumns["coin_name_unique"].name }}：{{ row.coin_name_unique }}</div>
                    <div align="left">{{ tableColumns["scale"].name }}：{{ row.scale }}</div>
                    <div align="left">{{ tableColumns["gold_scale"].name }}：{{ row.gold_scale }}</div>
                    <div align="left">{{ tableColumns["exchange_scale"].name }}：{{ row.exchange_scale }}</div>
                    <div align="left">
                        {{ tableColumns["target_coin_name_unique"].name }}：{{ row.target_coin_name_unique }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="type" :label="tableColumns['type'].name" align="center" width="80">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["type"].options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="gold" :label="tableColumns['gold'].name" align="center" width="120px">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.gold"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                        :isShowAllDecimal="true"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns['status'].name" align="center" width="65">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["status"].options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('备注')" align="center">
                <template slot-scope="{ row }">
                    <div v-if="row.status === 2">
                        {{ JSON.parse(row.response).third_response }}
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" align="center" width="320px">
                <template slot-scope="{ row }">
                    <el-button
                        type="primary"
                        size="small"
                        @click="showStatus(row.vendor_gold_log_id)"
                        v-if="row.wallet_type != 2"
                    >
                        {{ LangUtil("交易状态") }}
                    </el-button>
                    <div v-if="checkUnique(unique.plat_users_vendor_gold_log_update_manual) && row.status === 1">
                        <el-button type="primary" size="small" @click="handlerAutoCheck(row.vendor_gold_log_id)">{{
                            buttonParam.check
                        }}</el-button>
                        <el-button
                            type="primary"
                            size="small"
                            @click="handlerUpdate(row.vendor_gold_log_id, '0', buttonParam.fail)"
                            >{{ buttonParam.fail }}</el-button
                        >
                        <el-button
                            type="primary"
                            size="small"
                            @click="handlerUpdate(row.vendor_gold_log_id, '1', buttonParam.success)"
                            >{{ buttonParam.success }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersVendorGoldLogProxy from "../proxy/PlatUsersVendorGoldLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class PlatUsersVendorGoldLogBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersVendorGoldLogProxy = this.getProxy(PlatUsersVendorGoldLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerUpdate(vendor_gold_log_id: any, status: any, title: string) {
        this.myProxy.confirmData.vendor_gold_log_id = vendor_gold_log_id;
        this.myProxy.confirmData.status = status;
        this.myProxy.confirmData.title = title;
        this.myProxy.onUpdate();
    }

    handlerAutoCheck(vendor_gold_log_id: any) {
        this.myProxy.admin_plat_users_vendor_gold_log_auto_check(vendor_gold_log_id);
    }

    buttonParam = {
        check: this.LangUtil("自动检测"),
        fail: this.LangUtil("设置失败"),
        success: this.LangUtil("设置成功"),
    };

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }

    showStatus(vendor_gold_log_id: any) {
        this.myProxy.admin_plat_users_vendor_gold_log_status(vendor_gold_log_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
