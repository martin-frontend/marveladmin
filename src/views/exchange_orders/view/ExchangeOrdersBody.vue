<template>
    <div>
        <div class="table_right">
            <div class="interval search_style">
                <div class="auto-review" v-show="showButton">
                    <el-button type="warning" v-if="isVerify" @click="handlerAutoCheck">{{
                        $t("exchange_orders.underReview")
                    }}</el-button>
                    <el-button v-else type="success" @click="handlerAutoCheck">{{
                        $t("exchange_orders.autoReview")
                    }}</el-button>
                </div>
                <SearchSelect
                    :title="$t('recharge_orders.refreshOrder')"
                    :tip="$t('common.autoRefreshTip')"
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
                <title>{{ $t("common.tableInfoTitle") }}</title>
                <div class="item-group">
                    <span class="label">{{ $t("exchange_orders.tableInfoTotalGold") }}</span>
                    <span class="name">{{ message.total_gold }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ $t("exchange_orders.tableInfoTotalNum") }}</span>
                    <span class="name">{{ message.total_num }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ $t("exchange_orders.tableInfoSuccessTotalGold") }}</span>
                    <span class="name">{{ message.success_total_gold }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ $t("exchange_orders.tableInfoSuccessTotalNum") }}</span>
                    <span class="name">{{ message.success_total_num }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ $t("exchange_orders.tableInfoTotalUserNum") }}</span>
                    <span class="name">{{ message.total_user_num }}</span>
                </div>
                <div class="item-group">
                    <span class="label">{{ $t("exchange_orders.tableInfoSuccessFee") }}</span>
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
        >
            <el-table-column :label="$t('common.platMsg')" align="left" min-width="160px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].name }}：{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                    <div>{{ tableColumns["channel_id"].name }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.userMsg')" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ tableColumns["user_id"].name }}：{{ row.user_id }}
                    </div>
                    <div>{{ tableColumns["username"].name }}：{{ row.username }}</div>
                    <div>{{ tableColumns["nick_name"].name }}：{{ row.nick_name }}</div>
                    <div>
                        {{ tableColumns["user_remark"].name }}：<span class="user_remark">{{ row.user_remark }}</span>
                    </div>
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
            <el-table-column :label="$t('common.exchangeMsg')" min-width="160px" align="center">
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

                        <div>
                            {{ tableColumns["coin_name_unique"].name }}：{{ row.coin_name_unique }}
                        </div>
                        <div>
                            {{ tableColumns["block_network_id"].name }}：{{
                                tableColumns["block_network_id"].options[row.block_network_id]
                            }}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="payment_method" :label="tableColumns['payment_method'].name" min-width="180px" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div>
                            {{ tableColumns["receive_payment_type"].name }}：{{
                                tableColumns["receive_payment_type"].options[row.receive_payment_type]
                            }}
                        </div>
                        <span v-html="getAccessInfo(row)"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.orderMsg')" align="left" min-width="160px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["gold"].name }}：{{ row.gold }}</div>
                    <div>{{ tableColumns["fee_rate"].name }}：{{ row.fee_rate }}</div>
                    <div>{{ tableColumns["fee"].name }}：{{ row.fee }}</div>
                    <div>{{ tableColumns["money"].name }}：{{ row.money }}</div>
                    <div>{{ tableColumns["currency_type"].options[row.currency_type] }}：{{ row.currency_num }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.orderTime')" align="left" min-width="150px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["created_at"].name }}：<br />{{ row.created_at }}</p>
                    <p>{{ tableColumns["updated_at"].name }}：<br />{{ row.updated_at }}</p>
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
            <el-table-column :label="$t('common.operating')" class-name="status-col" :width="width">
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
                        <div>
                            <el-button class="item" size="small" @click="handleEdit({ type: '5', row })">{{
                                ctrlStr[5]
                            }}</el-button>
                        </div>
                        <!--平台币商代付 -->
                        <div>
                            <el-button class="item" type="primary" size="small" @click="handleDispatch(row)">{{
                                $t(`exchange_orders.coin_user_pay`)
                            }}</el-button>
                        </div>
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
import { Dialog } from "element-ui";

@Component({
    components: {
        Pagination,
        SearchSelect,
    },
})
export default class ExchangeOrdersBody extends AbstractView {
    constructor() {
        super(mediator);
    }
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    private autoProxy: ExchangeAutoCheckProxy = this.getProxy(ExchangeAutoCheckProxy);

    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    private ctrlStr: any = this.myProxy.ctrlStr;

    get width() {
        let _w: string = "150px";
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
        if (data.receive_payment_type == 3) {
            infoStr += options["address"] + "：";
            //不懂这里为什么options中定义的是address，在列表中要取account字段
            infoStr += data.payment_method["account"] + "<br>";
            console.log("");
            return infoStr;
        }
        if (options) {
            const keys = Object.keys(options);
            for (const key of keys) {
                infoStr += options[key] + "：";
                infoStr += data.payment_method[key] + "<br>";
            }
        }
        return infoStr;
    }

    private handlerQuery() {
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
        // 如果在自动刷新状态 回到第一页继续
        if (this.myProxy.IntervalObj.default != "0") {
            this.myProxy.autoReload();
        }
    }

    private handleEdit({ type, row }: any) {
        if (type == "5") {
            this.myProxy.showChangeDialog(row);
            return false;
        }

        let confirmStr: any =
            type === "4"
                ? this.$t("exchange_orders.confirmStr1")
                : this.$t("exchange_orders.confirmStr2", { "0": this.ctrlStr[type] });
        let confitmContent: any = {
            prompt: this.$t("common.prompt"),
            confirm: this.$t("common.determine"),
            cancel: this.$t("common.cancel"),
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

    //关闭| 退回金币 /关闭| 不退回金币 //冲正
    private handleEditRemark({ type, row }: any) {
        this.myProxy.remarkDialogData.status = DialogStatus.create;
        Object.assign(this.myProxy.remarkDialogData.form, {
            id: row.id,
            remark: "",
            type: type,
            desc: this.ctrlStr[type],
        });
        this.myProxy.showRemarkDialog();
    }
    /**编辑备注 */
    private handerEditRemark(row: any) {
        this.myProxy.remarkDialogData.status = DialogStatus.update;
        Object.assign(this.myProxy.remarkDialogData.form, {
            id: row.id,
            remark: row.remark,
            type: "",
            desc: "",
        });
        this.myProxy.showRemarkDialog();
    }
    // 自动刷新
    private handlerAutoReload(o: any) {
        this.myProxy.IntervalObj.default = o;
        this.myProxy.autoReload();
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.dispatchEvent("showUserDetail", user_id);
    }

    // 自动审核
    private handlerAutoCheck() {
        this.myProxy.listQuery.plat_id === "0" ? "" : this.myProxy.listQuery.plat_id;
        this.autoProxy.autoCheckDialog.form.plat_id = this.myProxy.listQuery.plat_id;
        this.autoProxy.onShowAutoCheckDialog();
    }

    //派发
    private handleDispatch(row: any) {
        this.myProxy.dispatchDialogData.form.type = 1;
        this.myProxy.dispatchDialogData.form.id = row.id;
        this.myProxy.dispatchDialogData.form.plat_id = row.plat_id;
        this.myProxy.showDispatchDialog();
    }
    //取消派发
    private handleDispatchCancel(id: string) {
        this.myProxy.dispatchDialogData.form.id = id;
        this.myProxy.onDispatchCancel();
    }

    destroyed() {
        super.destroyed();
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
