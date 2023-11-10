<template>
    <el-dialog :title="LangUtil('串关详情')" :visible.sync="myProxy.dialogMultiData.bShow" width="1300px">
        <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            :cell-style="{
                'text-align': 'center',
            }"
            :header-cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column :label="LangUtil('订单号')" prop="order" width="190"></el-table-column>
            <el-table-column :label="LangUtil('串单种类')" prop="multi_type"></el-table-column>
            <el-table-column :label="LangUtil('投注赔率')" prop="odds"> </el-table-column>
            <el-table-column :label="LangUtil('盘口玩法')" prop="market_type_text" width="120"></el-table-column>
            <el-table-column :label="LangUtil('投注内容')" prop="content" width="120"> </el-table-column>
            <el-table-column :label="LangUtil('赛果')" prop="win_type"></el-table-column>
            <el-table-column :label="LangUtil('联赛名称')" prop="competition_name" width="170"> </el-table-column>
            <el-table-column :label="LangUtil('比赛队伍')" width="230">
                <template slot-scope="{ row }">
                    <div>{{ row.home_name }}-{{ row.away_name }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('开赛时间')" prop="start_time" width="170"> </el-table-column>
        </el-table>
        <div class="dialog-footer" style="margin-top: 10px">
            <el-button type="danger" size="mini" @click="onClose()">{{ LangUtil("关闭") }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersBetProxy from "@/views/plat_users_bet/proxy/PlatUsersBetProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUsersBetMultiDialog extends AbstractView {
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
    tableData = this.myProxy.dialogMultiData.list;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    onClose() {
        this.myProxy.hideMultiDetailDialog();
    }

    objectSpanMethod({ rowIndex, columnIndex }: any) {
        if (columnIndex === 0 || columnIndex === 1) {
            if (rowIndex % this.tableData.length === 0) {
                return {
                    rowspan: this.tableData.length,
                    colspan: 1,
                };
            } else {
                return {
                    rowspan: 0,
                    colspan: 0,
                };
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
