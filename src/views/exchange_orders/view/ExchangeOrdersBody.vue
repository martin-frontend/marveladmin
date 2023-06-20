<template>
    <div>
        <div class="table_right">
            <div class="interval search_style">
                <div class="auto-review" v-show="showButton">
                    <el-button type="warning" v-if="isVerify" @click="handlerAutoCheck">{{
                        LangUtil("审核中...")
                    }}</el-button>
                    <el-button v-else type="success" @click="handlerAutoCheck">{{ LangUtil("自动审核") }}</el-button>
                </div>
                <SearchSelect
                    :title="LangUtil('刷新订单')"
                    :tip="LangUtil('列表在第1页的时候，自动刷新才生效')"
                    v-model="myProxy.IntervalObj.default"
                    :options="myProxy.IntervalObj.options"
                    :clearable="false"
                    :width="120"
                    @change="handlerAutoReload"
                />
            </div>
        </div>
        <div class="table_info">
            <div>
                <title>{{ LangUtil("查询汇总") }}</title>
                <div class="item-group">
                    <span class="label">{{ LangUtil("兑换总金额") }}</span>
                    <span class="name">{{ message.total_gold }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ LangUtil("兑换订单数") }}</span>
                    <span class="name">{{ message.total_num }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ LangUtil("兑换成功金额") }}</span>
                    <span class="name">{{ message.success_total_gold }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ LangUtil("兑换成功订单数") }}</span>
                    <span class="name">{{ message.success_total_num }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ LangUtil("兑换人数") }}</span>
                    <span class="name">{{ message.total_user_num }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ LangUtil("兑换手续费统计") }}</span>
                    <span class="name">{{ message.success_fee }}</span>
                </div>
            </div>
        </div>

        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" class-name="status-col"> </el-table-column>
            <el-table-column :label="LangUtil('平台信息')" align="left" min-width="160px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].name }}：{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                    <div>{{ tableColumns["channel_id"].name }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" align="left" min-width="190px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ tableColumns["user_id"].name }}：{{ row.user_id }}
                    </div>
                    <div>{{ tableColumns["username"].name }}：{{ row.username }}</div>
                    <div>{{ tableColumns["nick_name"].name }}：{{ row.nick_name }}</div>
                    <div>
                        {{ tableColumns["user_remark"].name }}：<span class="user_remark">{{ row.user_remark }}</span>
                    </div>
                    <div>{{ LangUtil("账号创建时间") }}：{{ row.user_created_at }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('接单状态')" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <span v-if="row.accept_admin_user_id == 0">
                        -
                    </span>
                    <span v-else>
                        <div>{{ LangUtil("接单人") }}：{{ row.accept_admin_user_id }}</div>
                        <div>{{ LangUtil("接单人名称") }}：{{ row.accept_admin_username }}</div>
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="order_no" :label="tableColumns['order_no'].name" align="center" min-width="90px">
            </el-table-column>
            <el-table-column
                prop="third_order_no"
                :label="tableColumns['third_order_no'].name"
                align="center"
                width="100px"
            >
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns['status'].name" min-width="90px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["status"].options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('兑换信息')" min-width="160px" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <template v-if="row.is_coin_user_order != 1">
                            <p>
                                {{ tableColumns["exchange_vendors_id"].name }}：{{
                                    tableColumns["exchange_vendors_id"].options[row.exchange_vendors_id]
                                }}
                            </p>
                            <p>
                                {{ tableColumns["exchange_channel"].name }}：{{
                                    tableColumns["exchange_channel"].options[row.exchange_channel]
                                }}
                            </p>
                        </template>
                        <template v-else>
                            <p>{{ tableColumns["coin_user_id"].name }}：{{ row.coin_user_id }}</p>
                            <p>{{ tableColumns["coin_username"].name }}：{{ row.coin_username }}</p>
                        </template>

                        <div>{{ tableColumns["coin_name_unique"].name }}：{{ row.coin_name_unique }}</div>
                        <div>
                            {{ tableColumns["block_network_id"].name }}：{{
                                tableColumns["block_network_id"].options[row.block_network_id]
                            }}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="extends" :label="tableColumns['extends'].name" min-width="180px" align="center">
                <template slot-scope="{ row }">
                    <div align="left" v-if="row.receive_payment_type == 7 && row.payment_method.length != 0">
                        <p v-for="(value, key) of row.payment_method" :key="key">{{ key }}：{{ value }}</p>
                    </div>
                    <div align="left" v-else-if="row.receive_payment_type == 8 && row.payment_method.length != 0">
                        <p v-for="(value, key) of row.payment_method" :key="key">{{ key }}：{{ value }}</p>
                    </div>
                    <div v-else>
                        -
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="payment_method"
                :label="tableColumns['payment_method'].name"
                min-width="180px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div align="left">
                        <div>
                            {{ tableColumns["receive_payment_type"].name }}：{{
                                tableColumns["receive_payment_type"].options[row.receive_payment_type]
                            }}
                        </div>
                        <span v-if="row.receive_payment_type != 8" v-html="getAccessInfo(row)"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('订单信息')" align="left" min-width="160px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["gold"].name }}：{{ row.gold }}</div>
                    <div>{{ tableColumns["fee_rate"].name }}：{{ row.fee_rate }}</div>
                    <div>{{ tableColumns["fee"].name }}：{{ row.fee }}</div>
                    <div>{{ tableColumns["money"].name }}：{{ row.money }}</div>
                    <div>{{ tableColumns["gold_scale"].name }}：{{ row.gold_scale }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('订单时间')" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["created_at"].name }}：<br />{{ row.created_at }}</p>
                    <p>{{ tableColumns["updated_at"].name }}：<br />{{ row.updated_at }}</p>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.total_recharge.name" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <p v-for="(value, key) of row.user_statistic" :key="key">
                        {{ value.coin_name_unique }} : {{ value.total_recharge }}
                    </p>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.total_exchange.name" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <p v-for="(value, key) of row.user_statistic" :key="key">
                        {{ value.coin_name_unique }} : {{ value.total_exchange }}
                    </p>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.total_bet.name" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <p v-for="(value, key) of row.user_statistic" :key="key">
                        {{ value.coin_name_unique }} : {{ value.total_bet }}
                    </p>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.total_win.name" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <p v-for="(value, key) of row.user_statistic" :key="key">
                        {{ value.coin_name_unique }} :
                        <WinLossDisplay :amount="value.total_win" :isShowDollar="false" />
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="remark" :label="tableColumns['remark'].name" align="center" min-width="100px">
                <template slot-scope="{ row }">
                    <div class="remark">
                        <div v-if="row.auto_check_status !== 0">
                            {{ tableColumns.auto_check_status.options[row.auto_check_status] }}
                        </div>
                        <div>
                            <p>{{ row.remark }}</p>
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="handerEditRemark(row)"
                                v-if="checkUnique(unique.exchange_orders_update_remark)"
                            ></el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" :width="width">
                <template slot-scope="{ row }">
                    <!--取消派发 -->
                    <div v-if="row.status === 10 && checkUnique(unique.exchange_orders_dispatch_cancel)">
                        <el-button class="item" type="primary" size="small" @click="handleDispatchCancel(row.id)">{{
                            `取消派发`
                        }}</el-button>
                    </div>
                    <!--已派发 -->
                    <div v-else-if="row.status == 11">
                        {{ row.updated_by }}
                    </div>
                    <div v-else-if="row.status === 1">
                        <!--关闭| 退回金币-->
                        <div v-if="checkUnique(unique.exchange_orders_return)">
                            <el-button
                                class="item"
                                type="primary"
                                size="small"
                                @click="handleEditRemark({ type: '1', row })"
                                >{{ ctrlStr[1] }}</el-button
                            >
                        </div>
                        <!--关闭| 不退回金币-->
                        <div v-if="checkUnique(unique.exchange_orders_close)">
                            <el-button
                                class="item"
                                type="primary"
                                size="small"
                                @click="handleEditRemark({ type: '2', row })"
                                >{{ ctrlStr[2] }}</el-button
                            >
                        </div>
                        <!--审核通过-->
                        <div v-if="checkUnique(unique.exchange_orders_approved)">
                            <el-button
                                class="item"
                                type="danger"
                                size="small"
                                @click="handleEdit({ type: '3', row })"
                                >{{ ctrlStr[3] }}</el-button
                            >
                        </div>
                        <!--平台已完成订单 -->
                        <div v-if="checkUnique(unique.exchange_orders_finish_order)">
                            <el-button
                                class="item"
                                type="primary"
                                size="small"
                                @click="handleEdit({ type: '4', row })"
                                >{{ ctrlStr[4] }}</el-button
                            >
                        </div>
                        <!--更换兑换渠道 -->
                        <div v-if="checkUnique(unique.exchange_orders_update_channel)">
                            <el-button class="item" size="small" @click="handleEdit({ type: '5', row })">{{
                                ctrlStr[5]
                            }}</el-button>
                        </div>
                        <!--平台币商代付 -->
                        <!-- <div>
                            <el-button class="item" type="primary" size="small" @click="handleDispatch(row)">{{
                                LangUtil("平台币商代付")
                            }}</el-button>
                        </div> -->
                    </div>
                    <!-- 冲正-->
                    <div v-else-if="(row.status === 4 || row.status === 9) && checkUnique(unique.exchange_orders_rush)">
                        <el-button
                            class="item"
                            type="primary"
                            size="small"
                            @click="handleEditRemark({ type: '6', row })"
                            >{{ ctrlStr[6] }}</el-button
                        >
                        <p>{{ row.updated_by }}</p>
                    </div>

                    <div
                        v-else-if="
                            row.status === -2 ||
                                ((row.status == 2 || row.status == 3) && row.paying_status_more_than_30_minutes)
                        "
                    >
                        <!--关闭| 退回金币-->
                        <div v-if="checkUnique(unique.exchange_orders_return)">
                            <el-button
                                class="item"
                                type="primary"
                                size="small"
                                @click="handleEdit({ type: '1', row })"
                                >{{ ctrlStr[1] }}</el-button
                            >
                        </div>
                        <!--关闭| 不退回金币-->
                        <div v-if="checkUnique(unique.exchange_orders_close)">
                            <el-button
                                class="item"
                                type="primary"
                                size="small"
                                @click="handleEdit({ type: '2', row })"
                                >{{ ctrlStr[2] }}</el-button
                            >
                        </div>
                    </div>
                    <div v-else-if="row.status == 12">
                        <el-button type="primary" size="small" @click="handleEditRemark({ type: '7', row })">{{
                            ctrlStr[7]
                        }}</el-button>
                        <p>{{ row.updated_by }}</p>
                    </div>
                    <div v-else>
                        {{ row.updated_by }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import ExchangeOrdersProxy from "../proxy/ExchangeOrdersProxy";
import ExchangeAutoCheckProxy from "../proxy/ExchangeAutoCheckProxy";
import { DialogStatus } from "@/core/global/Constant";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import mediator from "@/views/exchange_orders/mediator/TableListMediator";
import SearchSelect from "@/components/SearchSelect.vue";
import Cookies from "js-cookie";
import { Dialog, Message } from "element-ui";
import SelfModel from "@/core/model/SelfModel";
import { UserType } from "@/core/enum/UserType";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
@Component({
    components: {
        Pagination,
        SearchSelect,
        WinLossDisplay,
    },
})
export default class ExchangeOrdersBody extends AbstractView {
    LangUtil = LangUtil;
    constructor() {
        super(mediator);
    }
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    autoProxy: ExchangeAutoCheckProxy = this.getProxy(ExchangeAutoCheckProxy);

    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    ctrlStr: any = this.myProxy.ctrlStr;
    SelfModel: SelfModel = this.getProxy(SelfModel);

    get width() {
        let _w: string = "170px";
        if (Cookies.get("language") === "vi") {
            _w = "250px";
        }
        return _w;
    }

    get message() {
        return this.myProxy.tableData.message;
    }

    get isVerify() {
        return this.autoProxy.autoCheckDialog.form.status == 1 ? true : false;
    }

    get showButton() {
        return parseInt(this.autoProxy.listQuery.plat_id) ? true : false;
    }

    getAccessInfo(data: any) {
        const options: any = this.tableColumns.payment_method.options[data.receive_payment_type];
        let infoStr = "";
        if (options) {
            const keys = Object.keys(options);
            for (const key of keys) {
                infoStr += options[key] + "：";
                infoStr += data.payment_method[key] + "<br>";
            }
        }
        return infoStr;
    }

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
        // 如果在自动刷新状态 回到第一页继续
        if (this.myProxy.IntervalObj.default != "0") {
            this.myProxy.autoReload();
        }
    }

    handleEdit({ type, row }: any) {
        if (row.accept_admin_user_id == 0 && this.SelfModel.userInfo.type == UserType.CHANNEL) {
            Message.warning(LangUtil("尚未接单"));
        } else {
            if (type == "5") {
                this.myProxy.showChangeDialog(row);
                return false;
            }

            let confirmStr: any =
                type === "4" ? this.LangUtil("确定平台已付款给该玩家?") : this.LangUtil("是否{0}", this.ctrlStr[type]);
            let confitmContent: any = {
                prompt: this.LangUtil("提示"),
                confirm: this.LangUtil("确定"),
                cancel: this.LangUtil("取消"),
            };
            this.$confirm(confirmStr, confitmContent.prompt, {
                confirmButtonText: confitmContent.confirm,
                cancelButtonText: confitmContent.cancenl,
                type: "warning",
            })
                .then(() => {
                    this.myProxy.onUpdate({ type, row });
                })
                .catch(() => {});
        }
    }

    //关闭| 退回金币 /关闭| 不退回金币 //冲正
    handleEditRemark({ type, row }: any) {
        if (row.accept_admin_user_id == 0 && this.SelfModel.userInfo.type == UserType.CHANNEL) {
            Message.warning(LangUtil("尚未接单"));
        } else {
            this.myProxy.remarkDialogData.status = DialogStatus.create;
            Object.assign(this.myProxy.remarkDialogData.form, {
                id: row.id,
                remark: "",
                type: type,
                desc: this.ctrlStr[type],
            });
            this.myProxy.showRemarkDialog(row.remark);
        }
    }
    /**编辑备注 */
    handerEditRemark(row: any) {
        this.myProxy.remarkDialogData.status = DialogStatus.update;
        Object.assign(this.myProxy.remarkDialogData.form, {
            id: row.id,
            remark: row.remark,
            type: "",
            desc: "",
        });
        this.myProxy.showRemarkDialog(row.remark);
    }
    // 自动刷新
    handlerAutoReload(o: any) {
        this.myProxy.IntervalObj.default = o;
        this.myProxy.autoReload();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.dispatchEvent("showUserDetail", user_id);
    }

    // 自动审核
    handlerAutoCheck() {
        this.myProxy.listQuery.plat_id === "0" ? "" : this.myProxy.listQuery.plat_id;
        this.autoProxy.autoCheckDialog.form.plat_id = this.myProxy.listQuery.plat_id;
        this.autoProxy.onShowAutoCheckDialog();
    }

    //派发
    handleDispatch(row: any) {
        this.myProxy.dispatchDialogData.form.type = 1;
        this.myProxy.dispatchDialogData.form.id = row.id;
        this.myProxy.dispatchDialogData.form.plat_id = row.plat_id;
        this.myProxy.showDispatchDialog();
    }
    //取消派发
    handleDispatchCancel(id: string) {
        this.myProxy.dispatchDialogData.form.id = id;
        this.myProxy.onDispatchCancel();
    }

    destroyed() {
        super.destroyed();
    }

    handleSelectionChange(row: any) {
        this.myProxy.tableData.multipleSelection = [];
        row.forEach((item: any) => {
            this.myProxy.tableData.multipleSelection.push(item.id);
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.item {
    width: 130px;
}
.remark {
    > div {
        margin: 5px;
    }
}
.table_info {
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    height: 30px;
    > div {
        display: flex;
        title {
            display: inline-block;
            margin-right: 16px;
            font-size: 17px;
        }
        margin-bottom: 6px;
        .item-group {
            margin-right: 16px;
            span {
                margin-right: 10px;
            }
        }
    }
    .mt-2 {
        margin-top: 2px;
    }
}
.table_right {
    position: relative;
    height: 30px;
    .search_style {
        display: flex;
        right: 0;
        position: absolute;
        margin: -14px 0 0 0 !important;
        .auto-review {
            margin-right: 6px;
        }
    }
}
</style>
