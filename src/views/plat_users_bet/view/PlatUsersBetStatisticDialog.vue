<template>
    <el-dialog width="1000px" :title="LangUtil('投注统计')" :visible.sync="myProxy.statisticDialog.bShow">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column prop="vendor_id" :label="tableColumns['vendor_id'].name" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["vendor_id"].options[row.vendor_id] }}</div>
                </template>
            </el-table-column>
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
            <el-table-column prop="bet_gold_coin" :label="tableColumns['bet_gold_coin'].name" align="center">
            </el-table-column>
            <el-table-column prop="win_gold_coin" :label="tableColumns['win_gold_coin'].name" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.win_gold_coin" :isShowDollar="false" />
                </template>
            </el-table-column>
            <el-table-column prop="vendor_name" :label="LangUtil('厂商名称')" align="center"> </el-table-column>
            <el-table-column prop="vendor_name_unique" :label="LangUtil('厂商唯一标识')" align="center">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersBetProxy from "@/views/plat_users_bet/proxy/PlatUsersBetProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
@Component({
    components: {
        WinLossDisplay,
    },
})
export default class PlatUsersBetDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.statisticDialog.list;
    form = this.myProxy.dialogData.form;

    converCoinName(coinKey: any) {
        return this.myProxy.converCoinName(coinKey);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
