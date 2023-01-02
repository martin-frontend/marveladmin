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
        >
            <el-table-column
                :label="tableColumns['user_id'].name"
                prop="user_id"
                class-name="status-col"
                min-width="120px"
            >
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['agent_real_name'].name"
                prop="agent_real_name"
                class-name="status-col"
                min-width="120px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['remark'].name"
                prop="remark"
                class-name="status-col"
                min-width="280px"
            >
                <template slot-scope="{ row }">
                    <div v-if="editRemarkUserId == row.user_id">
                        <el-input v-model="remarkValue" style="width: 100px; margin-right: 10px"></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editRemarkUserId = ''">{{
                            LangUtil("取消")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditRemark(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </div>
                    <div class="flex" v-else>
                        <span style="margin-right: auto;margin-left: auto">{{ row.remark }}</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            style="height: 30px; margin-left: 5px"
                            @click="
                                editRemarkUserId = row.user_id;
                                remarkValue = row.remark;
                            "
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row, false)">{{
                        LangUtil("员工编辑")
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['customer_user_id'].name"
                prop="customer_user_id"
                class-name="status-col"
                min-width="120px"
            >
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.customer_user_id)" class="user_id">{{
                        row.customer_user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['customer_find_at'].name"
                prop="customer_find_at"
                class-name="status-col"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['customer_user_source'].name"
                prop="customer_user_source"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['customer_recharge_times'].name"
                prop="customer_recharge_times"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['customer_created_at'].name"
                prop="customer_created_at"
                class-name="status-col"
                min-width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['customer_remark'].name"
                prop="customer_remark"
                class-name="status-col"
                min-width="280px"
            >
                <template slot-scope="{ row }">
                    <div v-if="editCustomerRemarkUserId == row.customer_user_id">
                        <el-input v-model="customerRemarkValue" style="width: 100px; margin-right: 10px"></el-input>
                        <el-button class="item" type="warning" size="mini" @click="editCustomerRemarkUserId = ''">{{
                            LangUtil("取消")
                        }}</el-button>
                        <el-button class="item" type="success" size="mini" @click="onEditCustomerRemark(row)">{{
                            LangUtil("确定")
                        }}</el-button>
                    </div>
                    <div class="flex" v-else>
                        <span style="margin-right: auto;margin-left: auto">{{ row.customer_remark }}</span>
                        <el-button
                            class="item"
                            type="primary"
                            size="mini"
                            style="height: 30px; margin-left: 5px"
                            @click="
                                editCustomerRemarkUserId = row.customer_user_id;
                                customerRemarkValue = row.customer_remark;
                            "
                            >{{ LangUtil("编辑") }}</el-button
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row, true)">{{
                        LangUtil("客户编辑")
                    }}</el-button>
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
import PlatAgentManageProxy from "../proxy/PlatAgentManageProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatAgentManageBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentManageProxy = this.getProxy(PlatAgentManageProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    dialogData = this.myProxy.dialogData;
    editRemarkUserId = "";
    editCustomerRemarkUserId = "";
    remarkValue = "";
    customerRemarkValue = "";
    agentRealNameValue = "";

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any, isCustomer: boolean) {
        this.dialogData.isCustomer = isCustomer;
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    onEditRemark(row: any) {
        this.dialogData.formSource = { ...row };
        this.dialogData.form = { ...row };
        this.dialogData.form.remark = this.remarkValue;
        this.dialogData.isCustomer = false;
        this.editRemarkUserId = "";
        this.myProxy.onUpdate();
    }

    onEditCustomerRemark(row: any) {
        this.dialogData.formSource = { ...row };
        this.dialogData.form = { ...row };
        this.dialogData.form.customer_remark = this.customerRemarkValue;
        this.dialogData.isCustomer = true;
        this.editCustomerRemarkUserId = "";
        // row.customer_remark = this.customerRemarkValue;
        this.myProxy.onUpdate();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.flex {
    display: flex;
    align-items: center;
}
</style>
