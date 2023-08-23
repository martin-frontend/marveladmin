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
            <el-table-column :label="tableColumns.user_id.name" align="center" prop="user_id" min-width="150px">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['user_id'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["user_id"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.group_name.name" align="center" prop="group_name" min-width="150px">
                <template slot-scope="{ row, $index }">
                    <div>
                        <p>{{ row.group_name }}</p>
                        <el-button
                            v-if="$index > 0"
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
            <el-table-column
                :label="tableColumns.nor_exchange.name"
                align="center"
                prop="nor_exchange"
                min-width="150px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.blog_exchange.name"
                align="center"
                prop="blog_exchange"
                min-width="150px"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['blog_exchange'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["blog_exchange"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
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
            </el-table-column>
            <el-table-column :label="tableColumns.dau.name" align="center" prop="dau" min-width="150px">
                <template slot-scope="{ row }">
                    <div>{{ row.dau == null ? "-" : row.dau }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.recharge_user.name"
                align="center"
                prop="recharge_user"
                min-width="150px"
            >
                <template slot-scope="{ row }">
                    <div>{{ row.recharge_user == null ? "-" : row.recharge_user }}</div>
                </template>
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
                <template slot-scope="{ row }">
                    <div>{{ row.new_register == null ? "-" : row.new_register }}</div>
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
                <template slot-scope="{ row }">
                    <div>{{ row.new_reg_first_rech_count == null ? "-" : row.new_reg_first_rech_count }}</div>
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
                <template slot-scope="{ row }">
                    <div>{{ row.new_user_arpu == null ? "-" : row.new_user_arpu }}</div>
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
                <template slot-scope="{ row }">
                    <div>{{ row.new_user_arppu == null ? "-" : row.new_user_arppu }}</div>
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
                <template slot-scope="{ row }">
                    <div>{{ row.d_exch_amt_per_user == null ? "-" : row.d_exch_amt_per_user }}</div>
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
                <template slot-scope="{ row }">
                    <div>{{ row.d_user_cont_per_user == null ? "-" : row.d_user_cont_per_user }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column
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
            </el-table-column> -->
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
export default class StatisticPlatDaysDeliverChannelByGroupTable extends AbstractView {
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-table tr:first-child {
    background-color: #f6f7fa !important;
}
</style>
