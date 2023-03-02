<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns['user_id'].name" prop="user_id">
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" :class="isShowDetailBtn ? 'user_id' : ''">{{
                        row.user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['username'].name" prop="username" min-width="100px"></el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                min-width="100px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['credit_rate_invited'].name"
                prop="credit_rate_invited"
                min-width="100px"
            >
                <template slot-scope="{ row }">
                    <span>{{ row.credit_rate_invited }}%</span>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['credit_rate'].name" prop="credit_rate" min-width="100px">
                <template slot-scope="{ row }">
                    <span>{{ row.credit_rate }}%</span>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="180px">
                <template slot-scope="{ row }">
                    <el-button type="primary" size="small" @click="handlerUpdate(row, 'credit_rate_invited')">{{
                        LangUtil("编辑")
                    }}</el-button>
                    <el-button type="primary" size="small" @click="handlerShowLog(row)">{{
                        LangUtil("日志")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCreditProxy from "../proxy/TabCreditProxy";
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";
import LangUtil from "@/core/global/LangUtil";
import { getPageSetting, getProxy, page1 } from "@/views/_user_detail/PageSetting";

@Component({
    components: {
        Pagination,
    },
})
export default class TabCreditBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCreditProxy = getProxy(TabCreditProxy);
    // proxy property
    private tableColumns = this.myProxy.tableColumns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerUpdate(data: any, filed: string) {
        Object.assign(this.myProxy.dialogData.form, data);
        this.myProxy.showDialog(filed);
    }

    handlerShowLog(data: any) {
        this.myProxy.logDialogData.form = { ...data };
        this.myProxy.getLogTableColumns();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }

    get isShowDetailBtn() {
        return getPageSetting() == page1;
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
