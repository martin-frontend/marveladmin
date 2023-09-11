<template>
    <el-dialog width="1000px" :title="LangUtil('上下分统计')" :visible.sync="myProxy.statisticDialog.bShow">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column
                prop="coin_name_unique"
                :label="tableColumns['coin_name_unique'].name"
                width="130px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div>{{ converCoinName(row.coin_name_unique) }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="gold_scale" :label="tableColumns['gold_scale'].name" align="center">
            </el-table-column>
            <el-table-column prop="type" :label="tableColumns['type'].name" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["type"].options[row.type] }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="vendor_id" :label="tableColumns['vendor_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["vendor_id"].options[row.vendor_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="vendor_name"
                :label="LangUtil('厂商名称')"
                width="130px"
                align="center"
            ></el-table-column>
            <el-table-column prop="vendor_name_unique" :label="LangUtil('厂商唯一标识')" align="center">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersVendorGoldLogProxy from "@/views/plat_users_vendor_gold_log/proxy/PlatUsersVendorGoldLogProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUsersVendorGoldLogStatisticDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersVendorGoldLogProxy = this.getProxy(PlatUsersVendorGoldLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.statisticDialog.list;
    form = this.myProxy.statusDialog.form;

    handleCancel() {
        this.myProxy.statusDialog.bShow = false;
    }

    converCoinName(coinKey: any) {
        return this.tableColumns.coin_name_unique.options[this.myProxy.listQuery.plat_id][coinKey];
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
