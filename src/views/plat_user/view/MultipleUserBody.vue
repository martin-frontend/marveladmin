<template>
    <div>
        <el-table
            @sort-change="tableSortChange"
            :data="mutipleUserDialogData"
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
            <el-table-column :label="tableColumns.admin_added_batch.name" min-width="80px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.admin_added_batch }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('所属平台')" prop="user_id" min-width="150px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('所属渠道')" min-width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户ID')" min-width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-tooltip placement="top">
                        <div slot="content">
                            <span v-for="(item, index) in accountText(row)" :key="index">
                                <span>{{ item }}</span>
                                <span>  ,  </span>
                                <span v-if="index % 3 == 2" > <br/></span> 
                            </span>
                        </div>
                        <div>
                            <template v-for="(item, index) in accountText(row)">
                                <p v-if="index < 3" :key="index">{{ item }}</p>
                            </template>
                            <p v-if="accountText(row).length > 3">...</p>
                        </div>
                    </el-tooltip>

                    <!-- <span >{{ row.user_id }}</span> -->
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.user_count.name" min-width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.user_count }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['status'].name" min-width="60px" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-switch disabled v-model="row.status" :active-value="1" :inactive-value="98"> </el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.created_at.name" min-width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.created_at }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.created_by.name" min-width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.created_by }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.remark.name" min-width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>{{ row.remark }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="LangUtil('操作')"
                min-width="100px"
                class-name="status-col"
                v-if="checkUnique(unique.plat_user_update_admin_added_user)"
            >
                <template slot-scope="{ row }">
                    <el-button class="item op-btn" size="mini" type="info1" @click="handlerEditInfo(row)">
                        {{ LangUtil("详情") }}
                    </el-button>
                    <!-- <el-button size="mini" type="danger" @click="handlerDelete(row.admin_added_batch)">{{
                        LangUtil("撤销")
                    }}</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUserProxy from "../proxy/PlatUserProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import { MessageBox } from "element-ui";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class MultipleUserBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    mutipleUserDialogData = this.myProxy.mutipleUserDialogData.list;
    pageInfo = this.myProxy.mutipleUserDialogData.pageInfo;
    listQuery = this.myProxy.listQuery_mutiple;

    handlerQuery() {
        this.myProxy.onQuery();
    }

    accountText(row: any) {
        return (row.user_id + "").split(",");
    }
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQueryForAddMultipleUserTable();
    }

    get width() {
        let _w: string = "100px";
        if (Cookies.get("language") === "vi") {
            _w = "170px";
        }
        return _w;
    }

    // 排序
    tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
        } else {
            order_by = {
                [column.prop]: "ASC",
            };
        }
        this.listQuery.page_count = 1;
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.onQuery();
    }
    // 状态切换
    // handleToggle(user_id: number, status: number, is_credit_user: number) {
    //     if (status == 98 && is_credit_user == 1) {
    //         MessageBox.confirm(LangUtil("您是否禁用此帐号，如果禁用，该用户所有下级都禁用"), LangUtil("提示"), {
    //             confirmButtonText: LangUtil("确定"),
    //             cancelButtonText: LangUtil("取消"),
    //             type: "warning",
    //             center: true,
    //         })
    //             .then(() => {
    //                 this.myProxy.onToggleStatus(user_id, status);
    //             })
    //             .catch(() => {
    //                 this.myProxy.onQuery();
    //             });
    //     } else {
    //         this.myProxy.onToggleStatus(user_id, status);
    //     }
    // }

    handlerEditInfo(data: any) {
        // this.myProxy.showCreditUserDialog();
        this.myProxy.showAddMultipleUserDialog(DialogStatus.update, data);
    }

    handlerDelete(batchId: any) {
        this.myProxy.onDelete_multiple(batchId);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.blueText {
    color: rgb(79, 121, 246);
}
</style>
