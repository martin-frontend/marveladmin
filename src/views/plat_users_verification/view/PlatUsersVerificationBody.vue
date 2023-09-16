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
            <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" width="130px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["plat_id"].options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="user_id" :label="tableColumns['user_id'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="country" :label="tableColumns['country'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="province" :label="tableColumns['province'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="city" :label="tableColumns['city'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="post_code" :label="tableColumns['post_code'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="address" :label="tableColumns['address'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column
                prop="verification_name"
                :label="tableColumns['verification_name'].name"
                width="150px"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="mobile" :label="tableColumns['mobile'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="email" :label="tableColumns['email'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column prop="created_at" :label="tableColumns['created_at'].name" width="150px" align="center">
            </el-table-column>
            <el-table-column
                prop="verification_time"
                :label="tableColumns['verification_time'].name"
                width="150px"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="remark" :label="tableColumns['remark'].name" align="center" min-width="100px">
                <template slot-scope="{ row }">
                    <div class="remark">
                        <div>
                            <p>{{ row.remark }}</p>
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="handerEditRemark(row)"
                            ></el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="status" :label="tableColumns['status'].name" width="150px" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["status"].options[row.status] }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show)"
                        >{{ LangUtil("通过") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete)"
                        >{{ LangUtil("拒绝") }}</el-button
                    >
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
import PlatUsersVerificationProxy from "../proxy/PlatUsersVerificationProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersVerificationBody extends AbstractView {
    //权限标识
    private unique = unique;
    checkUnique = checkUnique;
    LangUtil = LangUtil;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersVerificationProxy = this.getProxy(PlatUsersVerificationProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showTip(data, true);
    }

    handlerDelete(row: any) {
        this.myProxy.isDandlerDelete.status = true;
        this.myProxy.isDandlerDelete.data = row;
        this.handerEditRemark(row);
        // this.myProxy.showTip(row, false);
    }
    /**编辑备注 */
    handerEditRemark(row: any) {
        this.myProxy.remarkDialogData.status = DialogStatus.update;
        Object.assign(this.myProxy.remarkDialogData.form, {
            id: row.id,
            remark: row.remark,
            type: "",
            desc: "",
        });
        this.myProxy.showRemarkDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
