<template>
    <el-dialog :title="LangUtil('充值渠道参数列表')" width="90%" :visible.sync="myProxy.dialogData.bShow">
        <div>
            <div class="title-group">
                <div class="title-item">
                    <span>{{ LangUtil("所属平台") }}</span>
                    <p>{{ channelsColumns.plat_id.options[form["plat_id"]] }}</p>
                </div>
                <div class="title-item">
                    <span>{{ LangUtil("通道厂商") }}</span>
                    <p>{{ channelsColumns.vendor_id.options[form["vendor_id"]] }}</p>
                </div>
                <div class="title-item">
                    <span>{{ LangUtil("渠道名称") }}</span>
                    <p>{{ form["name"] }}</p>
                </div>
            </div>
            <el-button
                @click="onShowAddDialog()"
                type="primary"
                class="create_channel_btn"
                size="small"
                v-if="checkUnique(unique.recharge_channels_paymethods_store)"
                >{{ LangUtil("新增") }}</el-button
            >
            <div class="table">
                <el-table :data="list.list" border style="width: 100%" v-loading="net_status.loading">
                    <el-table-column
                        prop="coin_name_unique"
                        :label="tableColumns['coin_name_unique'].name"
                        align="center"
                    ></el-table-column>

                    <el-table-column
                        prop="block_network_id"
                        :label="tableColumns['block_network_id'].name"
                        align="center"
                    >
                        <template slot-scope="{ row }">
                            <div>
                                {{ tableColumns.block_network_id.options[row.block_network_id] }}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column prop="paymethod_id" :label="tableColumns['paymethod_id'].name" align="center">
                        <template slot-scope="{ row }">
                            <div>
                                {{ tableColumns.paymethod_id.options[row.paymethod_id] }}
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="diy_paytype" :label="tableColumns['diy_paytype'].name" align="center">
                    </el-table-column> -->
                    <!-- <el-table-column prop="title" :label="tableColumns['title'].name" align="center"> </el-table-column> -->
                    <el-table-column prop="subtitle" :label="tableColumns['subtitle'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="notice" :label="tableColumns['notice'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="min_gold" :label="tableColumns['min_gold'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="max_gold" :label="tableColumns['max_gold'].name" align="center">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="fixed_gold_list"
                        :label="tableColumns['fixed_gold_list'].name"
                        align="center"
                    >
                        <template slot-scope="{ row }">
                            <div>
                                {{ row.fixed_gold_list.join() }}
                            </div>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column prop="diy_paytype" :label="tableColumns['diy_paytype'].name" align="center">
                    </el-table-column> -->
                    <el-table-column :label="tableColumns['status'].name" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.status"
                                active-value="1"
                                inactive-value="98"
                                :disabled="!checkUnique(unique.recharge_channels_paymethods_update)"
                                @change="switchChangeHandler(scope.row)"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column :label="LangUtil('操作')" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="primary" size="small">{{
                                LangUtil("编辑")
                            }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="LangUtil('排序')" class-name="status-col" width="320px">
                        <template slot-scope="{ row, $index }">
                            <div v-if="checkUnique(unique.plat_activity_order)">
                                <el-button size="mini" @click="handlerOrder(row.id, 1)" :disabled="$index == 0">
                                    {{ LangUtil("置顶") }}
                                </el-button>
                                <el-button
                                    size="mini"
                                    @click="handlerOrder(row.id, 2)"
                                    :disabled="$index == list.list.length - 1"
                                >
                                    {{ LangUtil("置底") }}
                                </el-button>
                                <el-button
                                    size="mini"
                                    icon="el-icon-top"
                                    @click="handlerOrder(row.id, 3)"
                                    :disabled="$index == 0"
                                ></el-button>
                                <el-button
                                    size="mini"
                                    icon="el-icon-bottom"
                                    @click="handlerOrder(row.id, 4)"
                                    :disabled="$index == list.list.length - 1"
                                ></el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeChannelsPaymethodsProxy from "@/views/recharge_channels_paymethods/proxy/RechargeChannelsPaymethodsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class RechargeChannelsPaymethodsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargeChannelsPaymethodsProxy = this.getProxy(RechargeChannelsPaymethodsProxy);
    // proxy property
    tableColumns = this.myProxy.dialogTableData.columns;
    channelsColumns = this.myProxy.tableData.columns;
    list = this.myProxy.channelList;
    form = this.myProxy.dialogData.form;
    listQuery = this.myProxy.listQuery;

    switchChangeHandler(row: any) {
        this.myProxy.onUpdateSwitch({ id: row.id, status: row.status });
    }

    // 充值通道编辑
    onShowAddDialog() {
        this.myProxy.showAddDialog(DialogStatus.create);
    }

    handleEdit(data: any) {
        this.myProxy.showAddDialog(DialogStatus.update, data);
    }

    handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderDialogData.id = id;
        this.myProxy.tableData.orderDialogData.opt = opt;
        this.myProxy.tableData.orderDialogData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderDialogList();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.title-group {
    .title-item {
        display: flex;
        padding: 6px 0;
        font-weight: bold;
        span {
            margin-right: 16px;
        }
        p {
            margin: 0;
        }
    }
}
.table {
    margin: 16px 0;
}
.create_channel_btn {
    margin-top: 16px;
}

.innerVisible {
    ::v-deep .el-select {
        width: 100%;
    }
    ::v-deep .btn-group {
        display: flex;
        justify-content: flex-end;
    }
    .recharge_amount .item-group {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        ::v-deep .el-input--medium {
            width: 100px;
            display: inline-block;
        }
    }
}
</style>
