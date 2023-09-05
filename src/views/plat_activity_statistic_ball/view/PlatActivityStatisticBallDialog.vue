<template>
    <el-dialog :title="LangUtil('彩球活动用户统计')" :visible.sync="myProxy.dialogData.bShow" width="1200px">
        <div class="header-content">
            <div class="group">
                <SearchSelect
                    :title="tableColumns.plat_id.name"
                    v-model="listQuery.plat_id"
                    :options="tableColumns.plat_id.options"
                    @change="handlerSearch"
                    :disabled="true"
                    :clearable="false"
                />
                <SearchInput :title="tableColumns.activity_id.name" v-model="listQuery.activity_id" :disabled="true" />
                <SearchInput
                    :title="tableColumns.current_cycle.name"
                    v-model="listQuery.current_cycle"
                    :disabled="true"
                />
                <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />

                <div>
                    <el-button @click="handlerSearch" class="header-button" type="primary" icon="el-icon-search">
                        {{ LangUtil("查询") }}
                    </el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh" class="header-button">
                        {{ LangUtil("重置") }}
                    </el-button>
                    <ExportDialog
                        :fiterOption="userList"
                        :proxy="myProxy"
                        :_disabled="myProxy.tableData_ball_user.list && myProxy.tableData_ball_user.list.length > 0"
                        :export_file_name="getExcelOutputName"
                        @exportExcel="exportExcel"
                        style="margin-left: 10px;"
                    />
                </div>
            </div>
        </div>

        <div>
            <el-table
                :data="tableData"
                border
                fit
                highlight-current-row
                style="width: 100%"
                size="mini"
                v-loading="net_status.loading"
                class="drag_table"
                height="500"
            >
                <el-table-column :label="tableColumns.plat_id.name" prop="" align="center">
                    <template slot-scope="{ row }">
                        <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column size="mini" :label="tableColumns.activity_id.name" prop="activity_id" /> -->
                <el-table-column size="mini" :label="tableColumns.user_id.name" prop="user_id" align="center" />
                <el-table-column size="mini" :label="tableColumns.lottery_code.name" prop="lottery_code" align="center" />
                <!-- 总消耗 -->
                <el-table-column size="mini" :label="tableColumns.total_cons.name" prop="total_cons" align="center" />
                <!-- 重置消耗 -->
                <el-table-column size="mini" :label="tableColumns.init_cons.name" prop="init_cons" align="center" />
                <!-- 抽奖消耗 -->
                <el-table-column size="mini" :label="tableColumns.lottery_cons.name" prop="lottery_cons" align="center" />
                <!-- 已抽奖次数 -->
                <el-table-column size="mini" :label="tableColumns.lottery_num.name" prop="lottery_num" align="center" />
                <!-- 总蹭送奖励 -->
                <el-table-column size="mini" :label="tableColumns.total_award.name" prop="total_award" align="center" />

                <el-table-column size="mini" :label="tableColumns.lottery_award.name" prop="lottery_award" align="center" />
                <el-table-column size="mini" :label="tableColumns.rank_award.name" prop="rank_award" align="center" />
                <el-table-column size="mini" :label="tableColumns.award_rank.name" prop="award_rank" align="center" />
            </el-table>

            <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityStatisticBallProxy from "../proxy/PlatActivityStatisticBallProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import ExportDialog from "@/components/ExportDialog.vue";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import Pagination from "@/components/Pagination.vue";
@Component({
    components: {
        SearchSelect,
        SearchInput,
        ExportDialog,
        Pagination,
    },
})
export default class PlatActivityStatisticBallDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityStatisticBallProxy = this.getProxy(PlatActivityStatisticBallProxy);
    // proxy property
    // tableColumns_ball = this.myProxy.tableData.columns;
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    tableData = this.myProxy.tableData_ball_user.list;
    pageInfo = this.myProxy.tableData_ball_user.pageInfo;
    listQuery = this.myProxy.listQuery_ball_user;

    userList = this.myProxy._userList_ball_user;

    LangUtil = LangUtil;
    private textMap = {
        update: "编辑",
        create: "新增",
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {};
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
    handlerSearch() {
        this.myProxy.onQuery_ball_user();
    }
    handlerReset() {
        this.myProxy.resetListQuery_ball_user();
    }
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery_ball_user();
    }
    get getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableColumns.plat_id.options[this.listQuery.plat_id];
        let name = `${LangUtil("彩球玩家统计")}-${plat_name}-${this.listQuery.activity_id}-${
            this.listQuery.current_cycle
        }`;
        return name;
    }
    get convertKeys() {
        return [
            "plat_id",
            "cycle_status",
            "vendor_id",
            "vendor_type",
            "vendor_wallet_type",
            "time_region_hour_interval",
            "status",
            "is_activity_task_water",
        ];
    }
    exportExcel(val: boolean, pageInfo: any) {
        this.myProxy.tableData_ball_user.isExportExcel = val;
        if (val) {
            this.myProxy.onQuery_export_ball_user(pageInfo);
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
