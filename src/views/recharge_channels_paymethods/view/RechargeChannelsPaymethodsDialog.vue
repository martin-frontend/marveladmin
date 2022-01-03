<template>
    <el-dialog
        :title="$t('recharge_channels_paymethods.channelList')"
        width="90%"
        :visible.sync="myProxy.dialogData.bShow"
    >
        <div>
            <div class="title-group">
                <div class="title-item">
                    <span>{{ $t("common.belongingPlat") }}</span>
                    <p>{{ form["plat_id"] }}</p>
                </div>
                <div class="title-item">
                    <span>{{ $t("recharge_channels_paymethods.vendorId") }}</span>
                    <p>{{ form["vendor_id"] }}</p>
                </div>
                <div class="title-item">
                    <span>{{ $t("recharge_channels_paymethods.channelName") }}</span>
                    <p>{{ form["name"] }}</p>
                </div>
            </div>
            <el-button
                @click="onShowAddDialog()"
                type="primary"
                class="create_channel_btn"
                size="small"
                v-if="checkUnique(unique.recharge_channels_paymethods_store)"
                >{{ $t("common.create") }}</el-button
            >
            <div class="table">
                <el-table :data="list.list" border style="width: 100%" v-loading="net_status.loading">
                    <el-table-column prop="paymethod_id" :label="tableColumns['paymethod_id'].name" align="center">
                        <template slot-scope="{ row }">
                            <div>
                                {{ tableColumns.paymethod_id.options[row.paymethod_id] }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="diy_paytype" :label="tableColumns['diy_paytype'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="title" :label="tableColumns['title'].name" align="center"> </el-table-column>
                    <el-table-column prop="subtitle" :label="tableColumns['subtitle'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="notice" :label="tableColumns['notice'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="min_gold" :label="tableColumns['min_gold'].name" align="center">
                    </el-table-column>
                    <el-table-column prop="max_gold" :label="tableColumns['max_gold'].name" align="center">
                    </el-table-column>
                    <el-table-column
                        prop="fixed_gold_list"
                        :label="tableColumns['fixed_gold_list'].name"
                        align="center"
                    >
                        <template slot-scope="{ row }">
                            <div>
                                {{ row.fixed_gold_list.join() }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="diy_paytype" :label="tableColumns['diy_paytype'].name" align="center">
                    </el-table-column>
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
                    <el-table-column :label="$t('common.operating')" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.row)" type="primary" size="small">{{
                                $t("common.update")
                            }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeChannelsPaymethodsProxy from "@/views/recharge_channels_paymethods/proxy/RechargeChannelsPaymethodsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class RechargeChannelsPaymethodsDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: RechargeChannelsPaymethodsProxy = this.getProxy(RechargeChannelsPaymethodsProxy);
    // proxy property
    private tableColumns = this.myProxy.dialogTableData.columns;
    private list = this.myProxy.channelList;
    private form = this.myProxy.dialogData.form;

    private switchChangeHandler(row: any) {
        this.myProxy.onUpdateSwitch({ id: row.id, status: row.status });
    }

    // 充值通道编辑
    private onShowAddDialog() {
        this.myProxy.showAddDialog(DialogStatus.create);
    }

    private handleEdit(data: any) {
        this.myProxy.showAddDialog(DialogStatus.update, data);
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
