<template>
    <el-dialog :title="LangUtil('排行榜玩家')" :visible.sync="myProxy.dialogData.bShow" width="1000px">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns.rank.name" prop="rank" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.user_id.name" prop="user_id" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.username.name" prop="username" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.nick_name.name" prop="nick_name" align="center"> </el-table-column>
            <el-table-column
                :label="
                    tableColumns.reach_data.name + '(' + rankTableColumns.rank_type.options[activity.rank_type] + ')'
                "
                prop="reach_data"
                align="center"
                min-width="160px"
            >
                <template slot-scope="{ row }">
                    <span v-if="typeof row.reach_data == 'object'">
                        <p v-for="(value, key) of row.reach_data" :key="key" style="text-align: left;">
                            {{ key }} : {{ value }}
                        </p>
                    </span>
                    <span v-else>
                        {{ row.reach_data }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                :label="
                    tableColumns.reach_num.name + '(' + rankTableColumns.rank_type.options[activity.rank_type] + ')'
                "
                prop="reach_num"
                align="center"
                min-width="160px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.rank_award.name" prop="rank_award" align="center">
                <template slot-scope="{ row }">
                    <p v-for="(value, key) of row.rank_award" :key="key" style="text-align: left;">
                        {{ key }} : {{ value }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.process_status.name" prop="process_status" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.process_status.options[row.process_status] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.award_status.name" prop="award_status" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.award_status.options[row.award_status] }}</div>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityRankProxy from "../proxy/PlatActivityRankProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import Pagination from "@/components/Pagination.vue";
@Component({
    components: {
        Pagination,
    },
})
export default class PlatActivityRankDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityRankProxy = this.getProxy(PlatActivityRankProxy);
    // proxy property
    tableColumns = this.myProxy.userTable.columns;
    rankTableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.userTable.list;
    pageInfo = this.myProxy.userTable.pageInfo;
    activity = this.myProxy.userTable.activity;
    listQuery = this.myProxy.listUserQuery;
    LangUtil = LangUtil;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQueryUser();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
