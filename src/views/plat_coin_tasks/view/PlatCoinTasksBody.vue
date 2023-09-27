<template>
    <div>
        <el-collapse v-if="myProxy.tableData.summary.length > 0" class="custom-collapse">
            <el-collapse-item>
                <template slot="title">
                    <div>{{ LangUtil("汇总") }}</div>
                </template>
                <template v-for="(item, index) in myProxy.tableData.summary">
                    <div class="statistics" :key="index">
                        {{ item.task_coin_name_unique }}
                        <span> {{ LangUtil("任务数量") }}: {{ item.task_coin_amount }} </span>
                        <span> {{ LangUtil("当前数量") }}: {{ item.transfer_amount }} </span>
                    </div>
                </template>
            </el-collapse-item>
        </el-collapse>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column prop="plat_id" :label="tableColumns.plat_id.name" align="center" min-width="140px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] || row.plat_id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['user_id'].name" align="center" prop="user_id" min-width="110px">
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">{{
                        row.user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.nick_name.name"
                align="center"
                prop="nick_name"
                min-width="100px"
            ></el-table-column>
            <el-table-column prop="type" :label="tableColumns.type.name" align="center" min-width="60px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] || row.type }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.activity_id.name" align="center" prop="activity_id" min-width="160px">
                <template slot-scope="{ row }">
                    <div>
                        {{ row.activity_id }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.activity_name.name"
                align="center"
                prop="activity_name"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.start_time.name"
                align="center"
                prop="start_time"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.end_time.name"
                align="center"
                prop="end_time"
                min-width="150px"
            ></el-table-column>
            <el-table-column :label="LangUtil('任务进度($)')" align="center" min-width="180px">
                <template slot-scope="{ row }">
                    {{ row[`water`] }} /
                    {{ row[`water_need`] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('流水折扣')" align="center" min-width="180px">
                <template slot-scope="{ row }">
                    <template v-for="i of [2, 4, 8, 16, 32, 64, 128]">
                        <div :key="i" class="text-left" v-if="row.task_config[`task_water_rate_${i}`] > 0">
                            {{ tableColumns[`water_${i}`].name }}
                            {{ row.task_config[`task_water_rate_${i}`] }}%
                        </div>
                    </template>
                    <template v-for="(name, key) of newJsonToObject(row.task_config.task_water_vendor)">
                        <div :key="key" class="text-left">
                            {{ tableColumns.vendor_ids.options[listQuery.plat_id][key] }}
                            {{ name }}%
                        </div>
                    </template>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.task_coin_name_unique.name"
                align="center"
                prop="task_coin_name_unique"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.task_coin_amount.name"
                align="center"
                prop="task_coin_amount"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns.current_coin_amount.name" align="center" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.transfer_amount }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.transfer_amount_rate.name"
                align="center"
                prop="transfer_amount_rate"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns.status.name" align="center" prop="status" width="90px">
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerCancel(row.id)"
                        v-if="row.status == 1 || row.status == 2"
                    >
                        {{ LangUtil("撤销") }}
                    </el-button>
                    <span v-else> - </span>
                    <!-- <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button> -->
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
import PlatCoinTasksProxy from "../proxy/PlatCoinTasksProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { jsonToObject } from "@/core/global/Functions";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatCoinTasksBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatCoinTasksProxy = this.getProxy(PlatCoinTasksProxy);
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

    showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }

    handlerCancel(id: any) {
        this.$confirm(this.LangUtil("当前任务是否撤销？"), this.LangUtil("提示"), {
            confirmButtonText: this.LangUtil("确定"),
            cancelButtonText: this.LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onCancel(id);
            })
            .catch(() => {});
    }

    newJsonToObject(j: any) {
        if (typeof j == "string") {
            return jsonToObject(j);
        }
        return j;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.statistics {
    margin-bottom: 16px;
    span {
        margin-left: 20px;
        :nth-child(1) {
            margin-left: 0;
        }
    }
}
::v-deep .custom-collapse {
    margin-bottom: 10px;
    border: 0;
    .el-collapse-item__header {
        border: 0;
        color: #000;
        font-size: 16px;
    }
    .el-collapse-item__arrow {
        margin: 0 0 0 8px;
    }
    .statistics {
        color: #000;
        font-size: 16px;
    }
    .el-collapse-item__wrap {
        border: 0;
    }
}
</style>
