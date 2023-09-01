<template>
    <div>
        <div class="stastics">
            <div>
                <span class="title">{{ LangUtil("查询汇总") }}</span>
                <div class="item_group">
                    <span class="label">{{ LangUtil("充值总金额") }}:</span>
                    <span class="name">{{ message.total_gold }}</span>
                </div>
                <div class="item_group">
                    <span class="label">{{ LangUtil("充值订单数") }}:</span>
                    <span class="name">{{ message.total_num }}</span>
                </div>
                <div class="item_group">
                    <span class="label">{{ LangUtil("充值成功金额") }}:</span>
                    <span class="name">{{ message.success_total_gold }}</span>
                </div>
                <div class="item_group">
                    <span class="label">{{ LangUtil("充值成功订单数") }}:</span>
                    <span class="name">{{ message.success_total_num }}</span>
                </div>
                <div class="item_group">
                    <span class="label">{{ LangUtil("充值人数") }}:</span>
                    <span class="name">{{ message.total_user_num }}</span>
                </div>
                <div class="item_group">
                    <span class="label">{{ tableColumns["fee"].name }}:</span>
                    <span class="name">{{ message.total_fee }}</span>
                </div>
                <div class="item_group">
                    <span class="label">{{ tableColumns["gift_gold"].name }}:</span>
                    <span class="name">{{ message.total_gift_gold }}</span>
                </div>
            </div>
            <div class="search_style">
                <el-tooltip
                    class="item"
                    effect="dark"
                    :content="LangUtil('列表在第1页的时候，自动刷新才生效')"
                    placement="top"
                >
                    <button class="cust_title">{{ LangUtil("刷新订单") }} <i class="el-icon-question"></i></button>
                </el-tooltip>

                <el-select filterable v-model="myProxy.IntervalObj.default" @change="handlerAutoReload">
                    <el-option v-for="(item, key) of myProxy.IntervalObj.options" :label="item" :value="key" :key="key">
                    </el-option>
                </el-select>
            </div>
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            :header-cell-style="{
                'text-align': 'center',
            }"
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="LangUtil('平台信息')" min-width="150px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].name }}：{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                    <div>{{ tableColumns["channel_id"].name }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" min-width="190px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ tableColumns["user_id"].name }}：{{ row.user_id }}
                    </div>
                    <div>{{ tableColumns["nick_name"].name }}：{{ row.nick_name }}</div>
                    <div>
                        {{ tableColumns["user_remark"].name }}：<span class="user_remark">{{ row.user_remark }}</span>
                    </div>
                    <div>{{ LangUtil("账号创建时间") }}：{{ row.user_created_at }}</div>
                </template>
            </el-table-column>
            
            <el-table-column :label="tableColumns.user_tag.name" min-width="200px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div style="text-align: left;">
                        <el-tag
                            class="custom-tag"
                            v-for="(tag, index) of row.user_tag"
                            :key="index"
                            style="margin: 3px;"
                            :type="tagColor(index)"
                        >
                            {{ tableColumns.user_tag.options[listQuery.plat_id][Number(tag)] }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="order_no" :label="tableColumns['order_no'].name" align="center" width="110px">
            </el-table-column>
            <el-table-column
                prop="third_order_no"
                :label="tableColumns['third_order_no'].name"
                align="center"
                width="130px"
            >
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns['status'].name" width="75px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["status"].options[row.status] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="is_first_recharge" :label="tableColumns['is_first_recharge'].name" width="75px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["is_first_recharge"].options[row.is_first_recharge] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column
                prop="coin_name_unique"
                :label="tableColumns['coin_name_unique'].name"
                min-width="100px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div align="left">{{ tableColumns["coin_name_unique"].name }}：{{ row.coin_name_unique }}</div>
                    <div align="left">
                        {{ tableColumns["block_network_id"].name }}：{{
                            tableColumns["block_network_id"].options[row.block_network_id]
                        }}
                    </div>
                    <div align="left">{{ tableColumns["gold_scale"].name }}：{{ row.gold_scale }}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="paymethod_id"
                :label="tableColumns['paymethod_id'].name"
                min-width="180px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>
                            {{ tableColumns["vendor_id"].name }}：
                            {{ tableColumns["vendor_id"].options[row.vendor_id] }}
                        </p>
                        <p>
                            {{ tableColumns["paymethod_id"].name }}：
                            {{ tableColumns["paymethod_id"].options[row.paymethod_id] }}
                        </p>
                        <p>
                            {{ tableColumns["third_id"].name }}：
                            {{ row.third_id }}
                        </p>
                        <p>
                            {{ tableColumns["third_name"].name }}：
                            {{ row.third_name }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="extends" :label="LangUtil('用户充值信息')" min-width="180px" align="center">
                <template slot-scope="{ row }">
                    <div align="left" v-if="row.paymethod_id == 9 && row.extends.length != 0">
                        <p v-for="(value, key) of row.extends" :key="key">{{ key }}：{{ value }}</p>
                    </div>
                    <div v-else>
                        -
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="gold" :label="tableColumns['gold'].name" align="center" min-width="140px">
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="
                            LangUtil('订单金额: 用户申请订单所输入的金额;  回调金额: 第三方充值确认的用户付款金额数量')
                        "
                        placement="top"
                    >
                        <div>
                            <span>{{ tableColumns["gold"].name }}</span>
                            <i class="el-icon-question"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns["gold"].name }}： {{ row.gold }}</p>
                        <p>{{ tableColumns["callback_gold"].name }}： {{ row.callback_gold }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="callback_gold" min-width="160px" align="center">
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="
                            LangUtil(
                                '到账金额: 用户充值到游戏中实际到账金额;  到账金币: 用户充值后所到账的是实际金币(包含赠送金币);  赔送金额: 使用该充值方式所额外获得金币;'
                            )
                        "
                        placement="top"
                    >
                        <div>
                            <span>{{ tableColumns["actual_gold"].name }}</span>
                            <i class="el-icon-question"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns["actual_gold"].name }}： {{ row.actual_gold }}</p>
                        <p>{{ tableColumns["total_gold"].name }}： {{ row.total_gold }}</p>
                        <p>{{ tableColumns["gift_gold"].name }}： {{ row.gift_gold }}</p>
                        <p>{{ tableColumns["fee"].name }}： {{ row.fee }}</p>
                        <p>{{ tableColumns["fee_rate"].name }}： {{ (row.fee_rate * 100) >> 0 }}%</p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('订单时间')" align="left" width="150px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["created_at"].name }}：<br />{{ row.created_at }}</p>
                    <p>
                        {{ tableColumns["paytime"].name }}：<br /><span v-if="row.status === 0">-</span
                        ><span v-else>{{ row.paytime }}</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="remark" :label="tableColumns['remark'].name" align="center" min-width="100px">
                <template slot-scope="{ row }">
                    <div class="remark">
                        <div>
                            <p>{{ row.remark }}</p>
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="handerEditRemark(row)"
                            ></el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="address" :label="LangUtil('操作')" width="100px" align="center">
                <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.status === 0 && checkUnique(unique.recharge_orders_complete)"
                        @click="makeUpClickHandler(scope.row)"
                        type="primary"
                        size="small"
                        >{{ LangUtil("补单") }}</el-button
                    >
                    <span v-else>--</span>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeOrdersProxy from "../proxy/RechargeOrdersProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import mediator from "@/views/recharge_orders/mediator/TableListMediator";

@Component({
    components: {
        Pagination,
    },
})
export default class RechargeOrdersBody extends AbstractView {
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
    myProxy: RechargeOrdersProxy = this.getProxy(RechargeOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    get message() {
        return this.myProxy.tableData.message;
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

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
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
        this.myProxy.showRemarkDialog();
    }
    // 自动刷新
    handlerAutoReload(o: any) {
        this.myProxy.IntervalObj.default = o;
        this.myProxy.autoReload();
    }

    // 补单
    makeUpClickHandler(row: any) {
        // this.$confirm(`是否对订单号 "${row.order_no}"，进行补单`, "提示", {
        this.$confirm(this.LangUtil(`是否对订单号 "{0}"，进行补单`, row.order_no), this.LangUtil("提示"), {
            confirmButtonText: this.LangUtil("确定"),
            cancelButtonText: this.LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.showDialog(DialogStatus.update, row);
            })
            .catch(() => {});
    }
    // 打开用户详情
    showUserDetail(user_id: number) {
        this.dispatchEvent("showUserDetail", user_id);
    }

    destroyed() {
        super.destroyed();
    }

    tagColor(i: number) {
        switch (i % 3) {
            case 0:
                return "danger";
            case 1:
                return "primary";
            case 2:
                return "success";
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.stastics {
    display: flex;
    flex-wrap: wrap;
    line-height: 36px;
    margin: 16px 0;
    justify-content: space-between;
    > div {
        display: flex;
        .title {
            margin-right: 16px;
            white-space: nowrap;
        }
        .item_group {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-right: 16px;
            .label {
                white-space: nowrap;
            }
        }
    }
    .search_style {
        margin: 0;
        height: 36px;
        .cust_title {
            margin: 0;
        }
        ::v-deep .el-input--medium {
            width: 150px;
        }
    }
}
.custom-tag {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 165px;
}
</style>
