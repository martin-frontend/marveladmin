<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
                v-if="isShowColumn"
                prop="date"
                :label="LangUtil('平台信息')"
                min-width="170"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</p>
                        <p>{{ LangUtil("渠道") }}：{{ row.channel_id }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" :label="LangUtil('用户信息')" min-width="200" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>
                            ID：<span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                        </p>
                        <p v-if="!isCoinUser">{{ LangUtil("昵称") }}：{{ row.nick_name }}</p>
                        <p>{{ tableColumns.real_name.name }}: {{ row.real_name }}</p>
                        <p>{{ LangUtil("支付凭证") }}：{{ row.user_recharge_certificate }}</p>
                        <p>{{ LangUtil("订单号") }}：{{ row.order_no }}</p>
                        <p v-if="isShowRemark">
                            {{ tableColumns.user_remark.name }}：<span style="color: red">{{ row.user_remark }}</span>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('收款账号')" min-width="200" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div v-if="row.type === 1">
                            <p>{{ LangUtil("收款通道ID") }}：{{ row.payment_channel_id }}</p>
                            <p>{{ LangUtil("收款人姓名") }}：{{ row.receive_name }}</p>
                            <p>{{ LangUtil("所属银行") }}:{{ row.payment_method.bank }}</p>
                            <p>{{ LangUtil("开户行支行") }}：{{ row.payment_method.account_bank }}</p>
                            <p>{{ LangUtil("银行卡") }}：{{ row.payment_method.account }}</p>
                        </div>
                        <div v-else-if="row.type === 2">
                            <p>{{ LangUtil("收款通道ID") }}：{{ row.payment_channel_id }}</p>
                            <p>{{ LangUtil("收款人姓名") }}：{{ row.receive_name }}</p>
                            <p>{{ LangUtil("支付宝账号") }}：{{ row.payment_method.account }}</p>
                        </div>
                        <div v-else-if="row.type === 3">
                            <p>{{ LangUtil("收款通道ID") }}：{{ row.payment_channel_id }}</p>
                            <p>{{ LangUtil("收款人姓名") }}：{{ row.receive_name }}</p>
                            <p>{{ LangUtil("微信账号") }}：{{ row.payment_method.account }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('订单状态')" align="center" min-width="150px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.status.options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('支付方式')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="gold"
                :label="LangUtil('订单金额')"
                align="center"
                min-width="80px"
            ></el-table-column>
            <el-table-column :label="LangUtil('玩家付款金额')" align="center" min-width="100px">
                <template slot-scope="{ row }">
                    <div v-if="row.status === 1">
                        {{ row.actual_gold }}
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作用户')" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    <div v-if="row.status !== 3" align="left">
                        <p>ID：{{ row.updated_id }}</p>
                        <p>{{ LangUtil("账号") }}：{{ row.updated_by }}</p>
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('订单时间')" align="center" min-width="150px">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ LangUtil("创建时间") }}：</p>
                        <p>{{ row.created_at }}</p>
                        <p>{{ LangUtil("完成时间") }}：</p>
                        <p>{{ row.pay_time }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" align="center" min-width="160px">
                <template slot-scope="{ row }">
                    <div align="center" v-if="row.status == 3 || row.status == 0">
                        <el-button class="opt-btn" size="mini" type="primary" @click="handlerCheckOrder(row)">{{
                            LangUtil("确定玩家已付款")
                        }}</el-button>
                        <el-button
                            class="opt-btn"
                            size="mini"
                            type="primary"
                            @click="handlerClearOrder(row)"
                            v-if="checkUnique(unique.coin_receive_recharge_order_close)"
                            >{{ LangUtil("取消订单") }}</el-button
                        >
                    </div>
                    <div align="center" v-if="row.status == 2">
                        <el-button class="opt-btn" size="mini" type="primary" @click="handlerCheckOrder(row)">{{
                            LangUtil("确定玩家已付款")
                        }}</el-button>
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinReceiveRechargeOrderProxy = this.getProxy(CoinReceiveRechargeOrderProxy);
    SelfModel: SelfModel = this.getProxy(SelfModel);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    get isShowColumn() {
        //@ts-ignore
        return this.SelfModel.userInfo.type == UserType.COIN ? false : true;
    }

    // 是否为币商账号
    get isCoinUser() {
        return (
            this.SelfModel.userInfo.type == UserType.COIN || this.SelfModel.userInfo.type == UserType.COINUSEREXCHANGE
        );
    }

    // 是否为币商代收
    get isShowRemark() {
        return this.SelfModel.userInfo.type == UserType.COIN ? false : true;
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerCheckOrder(data: any) {
        this.myProxy.showDialog(data);
    }

    handlerClearOrder(data: any) {
        this.myProxy.onOrderClose(data);
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
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
