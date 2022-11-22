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
            <el-table-column prop="id" :label="tableColumns.id.name" width="110" align="center"> </el-table-column>
            <el-table-column prop="plat_id" :label="tableColumns.plat_id.name" width="110" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="type" :label="tableColumns.type.name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.receive_name.name" align="center" width="100Px">
                <template slot-scope="{ row }">
                    <div>
                        {{ row.receive_name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('收款信息')" width="240" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <div v-if="row.type === 1">
                            <p>{{ LangUtil("所属银行") }}：{{ row.payment_method.bank_ch }}</p>
                            <p>{{ LangUtil("开户行支行") }}：{{ row.payment_method.account_bank }}</p>
                            <p>{{ LangUtil("银行卡") }}：{{ row.payment_method.account }}</p>
                        </div>
                        <div v-if="row.type === 2">
                            <p>{{ LangUtil("支付宝账号") }}：{{ row.payment_method.account }}</p>
                        </div>
                        <div v-if="row.type === 3">
                            <p>{{ LangUtil("微信账号") }}：{{ row.payment_method.account }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('收款额度')" width="200" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns.total_limit_gold.name }}：{{ row.total_limit_gold }}</p>
                        <p>
                            {{ tableColumns.total_gold.name }}：<span :class="styleLimit(row)">{{
                                row.total_gold
                            }}</span>
                        </p>
                        <p>{{ tableColumns.day_limit_gold.name }}：{{ row.day_limit_gold }}</p>
                        <p>
                            {{ tableColumns.day_gold.name }}：<span :class="styleDayGold(row)">{{ row.day_gold }}</span>
                        </p>
                        <p>{{ tableColumns.total_receive_times.name }}：{{ row.total_receive_times }}</p>
                        <p>{{ tableColumns.day_receive_times.name }}：{{ row.day_receive_times }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('展示信息')" width="200" align="center">
                <template slot-scope="{ row }">
                    <div align="left">
                        <p>{{ tableColumns.title.name }}：{{ row.title }}</p>
                        <p>{{ tableColumns.min_gold.name }}：{{ row.min_gold }}</p>
                        <p>{{ tableColumns.notice.name }}：{{ row.notice }}</p>
                        <p>{{ LangUtil("充值金额") }}：{{ goldListFormat(row.fixed_gold_list) }}</p>
                        <p>{{ LangUtil("金额随机") }}：{{ tableColumns.gold_random.options[row.gold_random] }}</p>
                        <p>
                            {{ tableColumns.is_fixed_gold.name }}：{{
                                tableColumns.is_fixed_gold.options[row.is_fixed_gold]
                            }}
                        </p>
                        <p>{{ tableColumns.max_gold.name }}：{{ row.max_gold }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('二维码')" align="center" width="120px">
                <template slot-scope="{ row }">
                    <div v-if="row.type !== 1">
                        <div v-if="row.qr_code_url">
                            <img :src="row.qr_code_url" alt="qrCode" width="100px" />
                        </div>
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['coin_wallet_ids'].name" align="center" width="120px">
                <template slot-scope="{ row }">
                    <div v-if="row.coin_wallet_ids.length > 0">
                        <div v-for="item of row.coin_wallet_ids" :key="item">
                            {{ tableColumns["coin_wallet_ids"].options[row.plat_id][item] }}
                        </div>
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" width="110" align="center">
                <template slot-scope="{ row }">
                    <div>
                        <el-switch
                            v-model="row.status"
                            :active-value="1"
                            :inactive-value="98"
                            @change="handleUpdate(row)"
                            :disabled="!checkUnique(unique.coin_receive_payment_channel_update)"
                        >
                        </el-switch>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="190px" align="center">
                <template slot-scope="{ row }">
                    <div class="btn_group">
                        <el-button
                            size="mini"
                            @click="handleUpdate(row, 2)"
                            v-if="checkUnique(unique.coin_receive_payment_channel_update)"
                            >{{ LangUtil("置顶") }}</el-button
                        >
                        <el-button
                            size="mini"
                            @click="handleUpdate(row, 1)"
                            v-if="checkUnique(unique.coin_receive_payment_channel_update)"
                            >{{ LangUtil("置底") }}</el-button
                        >
                        <el-button
                            size="mini"
                            icon="el-icon-top"
                            @click="handleUpdate(row, 3)"
                            v-if="checkUnique(unique.coin_receive_payment_channel_update)"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-bottom"
                            @click="handleUpdate(row, 4)"
                            v-if="checkUnique(unique.coin_receive_payment_channel_update)"
                        ></el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(row)"
                            v-if="checkUnique(unique.coin_receive_payment_channel_update)"
                            >{{ LangUtil("设置") }}</el-button
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
import CoinReceivePaymentChannelProxy from "../proxy/CoinReceivePaymentChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { objectRemoveNull } from "@/core/global/Functions";

@Component({
    components: {
        Pagination,
    },
})
export default class CoinReceivePaymentChannelBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinReceivePaymentChannelProxy = this.getProxy(CoinReceivePaymentChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    handleUpdate(row: any, opt: any = null) {
        const obj: any = {
            opt: opt ? opt : null,
            status: opt ? null : row.status,
            id: row.id,
        };
        this.myProxy.tableUpdateData = objectRemoveNull(obj);
        this.myProxy.onUpdate(true);
    }

    // 表格金额样式
    styleLimit(row: any) {
        return row.total_gold >= row.total_limit_gold ? "red" : "";
    }
    styleDayGold(row: any) {
        return row.total_gold >= row.day_gold ? "red" : "";
    }
    // 充值金
    goldListFormat(gold: any) {
        return gold.join("|");
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.add_btn {
    margin-bottom: 6px;
    display: flex;
}
::v-deep table {
    p {
        margin: 0;
    }
    .red {
        color: red;
    }
    .el-button {
        display: block;
        margin: 0 0 6px 0;
        width: 80px;
        text-align: center;
    }
    .btn_group {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
}
</style>
