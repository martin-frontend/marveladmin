<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                v-if="isShowColumn"
                prop="date"
                :label="$t('common.platMsg')"
                min-width="170"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ $t("common.plat") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</p>
                        <p>{{ $t("common.channelId") }}：{{ row.channel_id }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" :label="$t('common.userMsg')" min-width="200" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>
                            ID：<span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                        </p>
                        <p v-if="!isCoinUser">{{ $t("common.nickName") }}：{{ row.nick_name }}</p>
                        <p>
                            {{ $t("coin_receive_recharge_order.rechargeCertificate") }}：{{
                                row.user_recharge_certificate
                            }}
                        </p>
                        <p>{{ $t("coin_receive_recharge_order.orderNo") }}：{{ row.order_no }}</p>
                        <p v-if="isShowRemark">
                            {{ tableColumns.user_remark.name }}：<span style="color: red">{{ row.user_remark }}</span>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.receivingAccount')" min-width="200" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div v-if="row.type === 1">
                            <p>{{ $t("common.paymentChannelId") }}：{{ row.payment_channel_id }}</p>
                            <p>{{ $t("common.receiveName") }}：{{ row.receive_name }}</p>
                            <p>{{ $t("common.bank") }}:{{ row.payment_method.bank }}</p>
                            <p>{{ $t("common.branch") }}：{{ row.payment_method.account_bank }}</p>
                            <p>{{ $t("coin_receive_payment_channel.tabsText1") }}：{{ row.payment_method.account }}</p>
                        </div>
                        <div v-else-if="row.type === 2">
                            <p>{{ $t("common.paymentChannelId") }}：{{ row.payment_channel_id }}</p>
                            <p>{{ $t("common.receiveName") }}：{{ row.receive_name }}</p>
                            <p>{{ $t("common.alipayNumber") }}：{{ row.payment_method.account }}</p>
                        </div>
                        <div v-else-if="row.type === 3">
                            <p>{{ $t("common.paymentChannelId") }}：{{ row.payment_channel_id }}</p>
                            <p>{{ $t("common.receiveName") }}：{{ row.receive_name }}</p>
                            <p>{{ $t("common.weChatAccount") }}：{{ row.payment_method.account }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.orderStatus')" align="center" min-width="150px">
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
            <el-table-column
                prop="gold"
                :label="$t('common.orderAmount')"
                align="center"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="$t('vip_receive_recharge_order.playerPaymentAmount')"
                align="center"
                min-width="100px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.status === 1">
                        {{ row.actual_gold }}
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operationUser')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div v-if="row.status !== 3" align="left">
                        <p>ID：{{ row.updated_id }}</p>
                        <p>{{ $t("common.account") }}：{{ row.updated_by }}</p>
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.orderTime')" align="center" min-width="150px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ $t("common.createdDate") }}：</p>
                        <p>{{ row.created_at }}</p>
                        <p>{{ $t("common.PayTime") }}：</p>
                        <p>{{ row.pay_time }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" align="center" min-width="160px">
                <template slot-scope="{ row }">
                    <div align="center" v-if="row.status == 3 || row.status == 0">
                        <el-button class="opt-btn" size="mini" type="primary" @click="handlerCheckOrder(row)">{{
                            $t("coin_receive_recharge_order.playerHasPayment")
                        }}</el-button>
                        <el-button
                            class="opt-btn"
                            size="mini"
                            type="primary"
                            @click="handlerClearOrder(row)"
                            v-if="checkUnique(unique.coin_receive_recharge_order_close)"
                            >{{ $t("coin_receive_recharge_order.cancelOrder") }}</el-button
                        >
                    </div>
                    <div align="center" v-if="row.status == 2">
                        <el-button class="opt-btn" size="mini" type="primary" @click="handlerCheckOrder(row)">{{
                            $t("coin_receive_recharge_order.playerHasPayment")
                        }}</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import CoinReceiveRechargeOrderProxy from "../proxy/CoinReceiveRechargeOrderProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import SelfModel from "@/core/model/SelfModel";
import { UserType } from "@/core/enum/UserType";

@Component({
    components: {
        Pagination,
    },
})
export default class CoinReceiveRechargeOrderBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CoinReceiveRechargeOrderProxy = this.getProxy(CoinReceiveRechargeOrderProxy);
    private SelfModel: SelfModel = this.getProxy(SelfModel);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    get isShowColumn() {
        //@ts-ignore
        return this.SelfModel.userInfo.type == UserType.COIN ? false : true;
    }

    // 是否为币商账号
    get isCoinUser(){
        return this.SelfModel.userInfo.type == UserType.COIN || this.SelfModel.userInfo.type == UserType.COINUSEREXCHANGE;
    }

    // 是否为币商代收
    get isShowRemark() {
        return this.SelfModel.userInfo.type == UserType.COIN ? false : true;
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handlerCheckOrder(data: any) {
        this.myProxy.showDialog(data);
    }

    private handlerClearOrder(data: any) {
        this.myProxy.onOrderClose(data);
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.opt-btn {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
