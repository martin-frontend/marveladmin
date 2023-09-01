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
            :header-cell-style="{
                'text-align': 'center',
            }"
            :row-class-name="rowClassName"
        >
            <el-table-column
                :label="tableColumns.created_date.name"
                align="center"
                prop="created_date"
                min-width="150px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" align="center" prop="plat_id" min-width="150px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.channel_id.name" align="center" prop="channel_id" min-width="150px">
                <template slot-scope="{ row }"> {{ channelName(row) }} </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.deliver_name.name"
                align="center"
                prop="deliver_name"
                min-width="150px"
            >
                <template slot-scope="{ row }">
                    <div>
                        <p>{{ row.channel_id != 0 ? row.deliver_name : "/" }}</p>
                        <el-button
                            v-if="row.channel_id != 0"
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            @click="handleEdit(row)"
                        ></el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.recharge.name" align="center" prop="recharge" min-width="150px">
            </el-table-column>
            <el-table-column :label="tableColumns.exchange.name" align="center" prop="exchange" min-width="150px">
            </el-table-column>
            <el-table-column :label="tableColumns.win_loss.name" align="center" prop="win_loss" min-width="150px">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_loss" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.channel_profit.name"
                align="center"
                prop="channel_profit"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['channel_profit'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["channel_profit"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.channel_profit" />
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.deliver_use.name" align="center" prop="deliver_use" min-width="150px">
            </el-table-column>
            <el-table-column :label="tableColumns.dau.name" align="center" prop="dau" min-width="150px">
            </el-table-column>
            <el-table-column
                :label="tableColumns.recharge_user.name"
                align="center"
                prop="recharge_user"
                min-width="150px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_register.name"
                align="center"
                prop="new_register"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['new_register'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_register"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_reg_first_rech_count.name"
                align="center"
                prop="new_reg_first_rech_count"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_reg_first_rech_count'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_reg_first_rech_count"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_reg_rech_total.name"
                align="center"
                prop="new_reg_rech_total"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_reg_rech_total'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_reg_rech_total"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.exch_amt.name" align="center" prop="exch_amt" min-width="150px">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['exch_amt'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["exch_amt"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_user_arpu.name"
                align="center"
                prop="new_user_arpu"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_user_arpu'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_user_arpu"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.new_user_arppu.name"
                align="center"
                prop="new_user_arppu"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['new_user_arppu'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["new_user_arppu"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.d_exch_amt_per_user.name"
                align="center"
                prop="d_exch_amt_per_user"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['d_exch_amt_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["d_exch_amt_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.d_user_cont_per_user.name"
                align="center"
                prop="d_user_cont_per_user"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['d_user_cont_per_user'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["d_user_cont_per_user"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.register_cost.name"
                align="center"
                prop="register_cost"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['register_cost'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["register_cost"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
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
// import StatisticPlatDaysDeliverChannelProxy from "../proxy/StatisticPlatDaysDeliverChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class StatisticPlatDaysDeliverChannelByChannelTable extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.$parent.$parent.$parent.myProxy; // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
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
    rowClassName({ row, rowIndex }): string {
        // 在这里判断是否应用 'highlight-row' 类名
        // 假设符合条件的行具有 isHighlighted 属性
        if (row.channel_id == 0 || row.channel_id == "0") {
            // if (row.channel_id == 30037001 || row.channel_id == "30037001") {
            return "highlight-row";
        }
        return "";
    }
    channelName(row: any): string {
        if (row.channel_id == 0 || row.channel_id == "0") {
            return LangUtil("全部渠道");
        }
        return row.channel_id;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .highlight-row {
    background-color: #f6f7fa !important;
}
</style>
