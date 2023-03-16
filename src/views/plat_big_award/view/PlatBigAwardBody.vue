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
            <el-table-column class-name="status-col" :label="tableColumns.plat_id.name" prop="plat_id" min-width="70px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.award_uri.name"
                prop="award_url"
                min-width="120px"
            >
                <template slot-scope="{ row }">
                    <img :src="row.award_url" class="pic" />
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.withdraw_uri.name"
                prop="withdraw_url"
                min-width="120px"
            >
                <template slot-scope="{ row }">
                    <img :src="row.withdraw_url" class="pic" />
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.vendor_id.name" prop="vendor_id" min-width="70px">
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_id.options[row.vendor_id] }}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.game_id.name" prop="game_id" min-width="70px">
                <template slot-scope="{ row }">
                    {{ tableColumns.game_id.options[row.vendor_id][row.game_id] }}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.user_id.name" prop="user_id" min-width="70px">
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.username.name"
                prop="username"
                min-width="70px"
            >
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.award_time.name"
                prop="award_time"
                min-width="120px"
            >
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
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
import PlatBigAwardProxy from "../proxy/PlatBigAwardProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatBigAwardBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBigAwardProxy = this.getProxy(PlatBigAwardProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.pic {
    max-width: 130px;
    max-height: 130px;
}
</style>
