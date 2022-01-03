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
            <el-table-column v-if="isShowColumn" :label="$t('common.platMsg')" align="center" width="180">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns.plat_id.name }}：{{ tableColumns.plat_id.options[row.plat_id] }}</p>
                        <p>{{ tableColumns.channel_id.name }}：{{ row.channel_id }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.userMsg')" width="180" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>
                            {{ tableColumns.user_id.name }}：<span
                                @click="showUserDetail(row.user_id)"
                                class="user_id"
                                >{{ row.user_id }}</span
                            >
                        </p>
                        <p>{{ tableColumns.nick_name.name }}：{{ row.nick_name }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="order_no"
                :label="$t('coin_receive_recharge_order.orderNo')"
                align="center"
                min-width="120px"
            ></el-table-column>
            <el-table-column :label="$t('common.backStageAccount')" align="center" width="180px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns.created_id.name }}：{{ row.created_id }}</p>
                        <p>{{ tableColumns.created_by.name }}：{{ row.created_by }}</p>
                        <p>
                            {{ tableColumns.created_type.name }}：{{
                                tableColumns.created_type.options[row.created_type]
                            }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.orderStatus')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.status.options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.paymentMethod')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="gold" :label="$t('common.orderAmount')" align="center"></el-table-column>
            <el-table-column
                prop="gold"
                :label="$t('vip_receive_recharge_order.playerPaymentAmount')"
                align="center"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                prop="created_at"
                :label="$t('common.createdDate')"
                align="center"
                width="170px"
            ></el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import VipReceiveRechargeOrderProxy from "../proxy/VipReceiveRechargeOrderProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import SelfModel from "@/core/model/SelfModel";

@Component({
    components: {
        Pagination,
    },
})
export default class VipReceiveRechargeOrderBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VipReceiveRechargeOrderProxy = this.getProxy(VipReceiveRechargeOrderProxy);
    private SelfModel: SelfModel = this.getProxy(SelfModel);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    get isShowColumn() {
        //@ts-ignore
        return this.SelfModel._userInfo.type == 32 ? false : true;
    }

    private handlerQuery() {
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
