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
                :label="tableColumns['created_date'].name"
                prop="created_date"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" min-width="160px" align="center">
                <template slot-scope="{ row, $index }">
                    <div>{{ $index == 0 ? row.plat_id : tableColumns["plat_id"].options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['channel_id'].name"
                prop="channel_id"
                min-width="100px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['deliver_use'].name"
                prop="deliver_use"
                min-width="100px"
                align="center"
            >
                <template slot-scope="{ row, $index }">
                    <div>
                        <p>{{ row.deliver_use }}</p>
                        <el-button v-if="$index > 0" type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['recharge'].name"
                prop="recharge"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['exchange'].name"
                prop="exchange"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['recharge_diff_exchange'].name"
                prop="recharge_diff_exchange"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['recharge_count'].name"
                prop="recharge_count"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['recharge_user'].name"
                prop="recharge_user"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['new_register_device'].name"
                prop="new_register_device"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['device_cost'].name"
                prop="device_cost"
                min-width="100px"
                align="center"
            >
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['device_cost'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["device_cost"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['new_register'].name"
                prop="new_register"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['register_cost'].name"
                prop="register_cost"
                min-width="100px"
                align="center"
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
            <el-table-column
                :label="tableColumns['rech_amt'].name"
                prop="rech_amt"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['new_reg_first_rech_count'].name"
                prop="new_reg_first_rech_count"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['register_recharge_rate'].name"
                prop="register_recharge_rate"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['register_pay_cost'].name"
                prop="register_pay_cost"
                min-width="100px"
                align="center"
            >
                <template slot="header">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="tableColumns['register_pay_cost'].tips"
                        placement="top"
                    >
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["register_pay_cost"].name }}</span>
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
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class StatisticPlatDaysDeliverBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
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
::v-deep .el-table__body .el-table__row:first-child {
    background-color: #f6f7fa;
    td:nth-child(1),
    td:nth-child(2) {
        border-right: 0;
    }
    // td:nth-child(3) {
    //     text-align: left;
    // }
}
</style>
